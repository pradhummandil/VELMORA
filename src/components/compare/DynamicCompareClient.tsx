"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { apiClient } from "@/utils/api";

const formatPriceINR = (val?: number | null): string => {
  if (!val || isNaN(val) || val <= 0) return "Price on Request";
  if (val >= 10000000) {
    const cr = val / 10000000;
    return `₹${cr.toFixed(2).replace(/\.00$/, "")} Cr`;
  } else if (val >= 100000) {
    const lakh = val / 100000;
    return `₹${lakh.toFixed(2).replace(/\.00$/, "")} Lakh`;
  }
  return `₹${Math.round(val).toLocaleString("en-IN")}`;
};

export const DynamicCompareClient: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [propertyIds, setPropertyIds] = useState<number[]>([]);
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Read initial IDs from URL params or localStorage
  useEffect(() => {
    let ids: number[] = [];
    const urlIds = searchParams.get("ids");
    if (urlIds) {
      ids = urlIds
        .split(",")
        .map((s) => Number(s.trim()))
        .filter((n) => !isNaN(n) && n > 0);
    } else if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("velmora_compare_ids");
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed)) {
            ids = parsed.map(Number).filter((n) => !isNaN(n) && n > 0);
          }
        }
      } catch {}
    }

    const uniqueIds = Array.from(new Set(ids)).slice(0, 4);
    setPropertyIds(uniqueIds);
  }, [searchParams]);

  // Fetch properties from backend
  useEffect(() => {
    let isMounted = true;
    if (propertyIds.length === 0) {
      setProperties([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    apiClient
      .compareProperties(propertyIds)
      .then((res) => {
        if (isMounted && res.data?.properties) {
          setProperties(res.data.properties);
        }
      })
      .catch((err) => {
        console.error("Comparison fetch error:", err);
        toast.error("Unable to load property comparison data.");
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [propertyIds]);

  const handleRemove = (idToRemove: number) => {
    const updated = propertyIds.filter((id) => id !== idToRemove);
    setPropertyIds(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem("velmora_compare_ids", JSON.stringify(updated));
    }
    if (updated.length > 0) {
      router.push(`/compare?ids=${updated.join(",")}`);
    } else {
      router.push("/compare");
    }
    toast.info("Property removed from comparison.");
  };

  const handleClearAll = () => {
    setPropertyIds([]);
    setProperties([]);
    if (typeof window !== "undefined") {
      localStorage.removeItem("velmora_compare_ids");
    }
    router.push("/compare");
    toast.info("Comparison cleared.");
  };

  const handleShare = () => {
    if (typeof window !== "undefined") {
      const shareUrl = `${window.location.origin}/compare?ids=${propertyIds.join(",")}`;
      navigator.clipboard.writeText(shareUrl);
      toast.success("Comparison link copied to clipboard!");
    }
  };

  if (loading) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center bg-pink-two pt-150 pb-150">
        <div className="text-center">
          <div className="spinner-border text-warning mb-3" role="status"></div>
          <div className="text-muted fs-15">Loading property comparison analytics...</div>
        </div>
      </div>
    );
  }

  if (properties.length === 0) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center bg-pink-two pt-150 pb-150">
        <div className="container">
          <div className="bg-white border-20 p-5 shadow-sm text-center mx-auto" style={{ maxWidth: "560px" }}>
            <div className="rounded-circle bg-light d-inline-flex p-3 mb-3 text-warning">
              <i className="bi bi-arrow-left-right fs-1"></i>
            </div>
            <h2 className="fw-700 color-dark fs-28 mb-2">No Residences in Comparison</h2>
            <p className="text-muted fs-15 mb-4">
              Select up to 4 luxury properties from our discovery map or residence pages to analyze pricing benchmarks, spatial layouts, and living metrics side by side.
            </p>
            <Link href="/listing_01" className="btn-two sm">
              Explore Luxury Residences
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="compare-section bg-pink-two pt-130 xl-pt-100 pb-120">
      <div className="container container-large">
        {/* Breadcrumb */}
        <div className="mb-30">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb m-0 fs-14">
              <li className="breadcrumb-item">
                <Link href="/" className="text-muted text-decoration-none">
                  Home
                </Link>
              </li>
              <li className="breadcrumb-item active text-dark fw-500" aria-current="page">
                Property Comparison Matrix ({properties.length} of 4)
              </li>
            </ol>
          </nav>
        </div>

        {/* Top Control Bar */}
        <div className="d-flex align-items-center justify-content-between mb-4 flex-wrap gap-2">
          <div>
            <span className="badge bg-warning text-dark fs-12 px-3 py-1 text-uppercase mb-2 fw-600">
              Decision Intelligence
            </span>
            <h1 className="fw-700 color-dark fs-32 mb-1">Residence Comparison Matrix</h1>
            <p className="text-muted fs-14 mb-0">
              Direct side-by-side valuation, layout specifications, regulatory trust, and living infrastructure indices.
            </p>
          </div>

          <div className="d-flex gap-2">
            <button
              type="button"
              onClick={handleShare}
              className="btn btn-outline-dark rounded-pill px-3 py-2 fs-13"
            >
              <i className="bi bi-share me-1"></i> Share Comparison
            </button>
            <button
              type="button"
              onClick={handleClearAll}
              className="btn btn-outline-danger rounded-pill px-3 py-2 fs-13"
            >
              <i className="bi bi-trash me-1"></i> Clear All
            </button>
          </div>
        </div>

        {/* COMPARISON MATRIX TABLE */}
        <div className="bg-white border-20 p-4 shadow-sm overflow-hidden mb-40">
          <div className="table-responsive">
            <table className="table table-bordered align-middle mb-0" style={{ minWidth: "800px" }}>
              {/* Table Head: Property Cards */}
              <thead className="table-light">
                <tr>
                  <th scope="col" style={{ width: "220px" }} className="p-3 text-muted fs-13">
                    Attribute
                  </th>
                  {properties.map((p) => {
                    const thumbImg = (p.images && p.images[0]) || "/assets/images/listing/img_01.jpg";

                    return (
                      <th key={p.id} scope="col" className="p-3 text-center position-relative">
                        <button
                          type="button"
                          onClick={() => handleRemove(p.id)}
                          className="btn-close position-absolute top-0 end-0 m-2 fs-12"
                          title="Remove property"
                        ></button>

                        <div className="position-relative mx-auto rounded-3 overflow-hidden mb-2" style={{ height: "130px", width: "100%" }}>
                          <Image
                            src={thumbImg}
                            alt={p.title}
                            fill
                            sizes="250px"
                            className="object-fit-cover"
                          />
                        </div>

                        {p.decisionBadge && (
                          <div className="mb-2">
                            <span className="badge bg-warning text-dark fs-12 px-3 py-1 fw-700">
                              {p.decisionBadge}
                            </span>
                          </div>
                        )}

                        <h3 className="fw-600 color-dark fs-15 text-truncate mb-1">{p.title}</h3>
                        <div className="text-muted fs-12 text-truncate mb-2">
                          <i className="bi bi-geo-alt me-1"></i>
                          {p.locality || p.city}
                        </div>
                        <div className="fw-700 text-warning fs-18 mb-2">{formatPriceINR(p.price)}</div>

                        <Link href={`/properties/${p.id}`} className="btn btn-dark btn-sm rounded-pill px-3 fs-12">
                          View Residence
                        </Link>
                      </th>
                    );
                  })}
                </tr>
              </thead>

              {/* Table Body: Decision Attributes */}
              <tbody>
                {/* 1. Valuation Rate */}
                <tr>
                  <td className="fw-600 color-dark fs-13 bg-light">Rate (₹/sq.ft)</td>
                  {properties.map((p) => (
                    <td key={p.id} className="text-center fw-600 text-warning fs-15">
                      {p.pricePerSqft ? `₹${p.pricePerSqft.toLocaleString("en-IN")}` : "Data unavailable"}
                    </td>
                  ))}
                </tr>

                {/* 2. Bedroom Configuration */}
                <tr>
                  <td className="fw-600 color-dark fs-13 bg-light">Bedrooms (BHK)</td>
                  {properties.map((p) => (
                    <td key={p.id} className="text-center fs-14">
                      {p.bedrooms ? `${p.bedrooms} BHK` : "Data unavailable"}
                    </td>
                  ))}
                </tr>

                {/* 3. Bathrooms */}
                <tr>
                  <td className="fw-600 color-dark fs-13 bg-light">Bathrooms</td>
                  {properties.map((p) => (
                    <td key={p.id} className="text-center fs-14">
                      {p.bathrooms || "Data unavailable"}
                    </td>
                  ))}
                </tr>

                {/* 4. Carpet Area */}
                <tr>
                  <td className="fw-600 color-dark fs-13 bg-light">Carpet Area</td>
                  {properties.map((p) => (
                    <td key={p.id} className="text-center fs-14">
                      {p.area ? `${p.area.toLocaleString("en-IN")} sq.ft` : "Data unavailable"}
                    </td>
                  ))}
                </tr>

                {/* 5. Typology & Purpose */}
                <tr>
                  <td className="fw-600 color-dark fs-13 bg-light">Typology / Purpose</td>
                  {properties.map((p) => (
                    <td key={p.id} className="text-center fs-13">
                      <span className="badge bg-light text-dark border me-1">{p.propertyType || "Apartment"}</span>
                      <span className="badge bg-dark text-white">{p.listingPurpose || "Buy"}</span>
                    </td>
                  ))}
                </tr>

                {/* 6. Floor & Parking */}
                <tr>
                  <td className="fw-600 color-dark fs-13 bg-light">Floor & Parking</td>
                  {properties.map((p) => (
                    <td key={p.id} className="text-center fs-13 text-muted">
                      {p.floor !== undefined && p.floor !== null ? `Floor ${p.floor}` : "Floor N/A"} •{" "}
                      {p.parking || "Parking N/A"}
                    </td>
                  ))}
                </tr>

                {/* 7. RERA Regulatory Trust */}
                <tr>
                  <td className="fw-600 color-dark fs-13 bg-light">RERA Trust Status</td>
                  {properties.map((p) => (
                    <td key={p.id} className="text-center fs-13">
                      {p.reraStatus === "verified" ? (
                        <span className="badge bg-success text-white">
                          <i className="bi bi-shield-check me-1"></i> RERA Verified
                        </span>
                      ) : p.reraStatus === "pending" && p.reraNumber ? (
                        <span className="badge bg-warning text-dark">
                          <i className="bi bi-hourglass-split me-1"></i> Verification Pending
                        </span>
                      ) : p.reraStatus === "exempt" ? (
                        <span className="badge bg-secondary text-white">RERA Exempt</span>
                      ) : (
                        <span className="badge bg-light text-muted border">Not Applicable</span>
                      )}
                    </td>
                  ))}
                </tr>

                {/* 8. Address Livability Score */}
                <tr>
                  <td className="fw-600 color-dark fs-13 bg-light">Address Score</td>
                  {properties.map((p) => (
                    <td key={p.id} className="text-center fs-14">
                      {p.addressScore && p.addressScore > 0 ? (
                        <span className="fw-700 text-warning">{p.addressScore} / 100</span>
                      ) : (
                        <span className="text-muted fs-12">Compiling upon audit</span>
                      )}
                    </td>
                  ))}
                </tr>

                {/* 9. Locality Price Benchmark */}
                <tr>
                  <td className="fw-600 color-dark fs-13 bg-light">Locality Benchmark (₹/sq.ft)</td>
                  {properties.map((p) => (
                    <td key={p.id} className="text-center fs-13 text-muted">
                      {p.localityData?.avgPriceSqft ? (
                        <strong className="color-dark">₹{p.localityData.avgPriceSqft.toLocaleString("en-IN")}</strong>
                      ) : (
                        "Benchmark pending"
                      )}
                    </td>
                  ))}
                </tr>

                {/* 10. Locality Connectivity */}
                <tr>
                  <td className="fw-600 color-dark fs-13 bg-light">Locality Connectivity</td>
                  {properties.map((p) => (
                    <td key={p.id} className="text-center fs-13">
                      {p.localityData?.connectivityScore ? (
                        <span className="fw-600 color-dark">{p.localityData.connectivityScore} / 100</span>
                      ) : (
                        <span className="text-muted">Intelligence coming soon</span>
                      )}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DynamicCompareClient;
