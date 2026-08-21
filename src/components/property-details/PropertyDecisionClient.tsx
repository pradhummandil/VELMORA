"use client";
import React, { useState, useEffect, useId, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";
import { PropertyRecord } from "@/types/property";
import { apiClient } from "@/utils/api";
import { useAuth } from "@/context/AuthContext";
import { shareProperty } from "@/utils/share";
import PropertyMap from "@/components/map/PropertyMap";
import ContactAgentModal from "@/modals/ContactAgentModal";
import ScheduleForm from "@/components/ListingDetails/listing-details-sidebar.tsx/ScheduleForm";

import featureIcon_1 from "@/assets/images/icon/icon_47.svg";
import featureIcon_2 from "@/assets/images/icon/icon_48.svg";
import featureIcon_3 from "@/assets/images/icon/icon_49.svg";
import advisorDefaultAvatar from "@/assets/images/agent/img_06.jpg";

interface PropertyDecisionClientProps {
  property: PropertyRecord;
}

const formatPriceINR = (price: number): string => {
  if (!price || isNaN(price) || price <= 0) return "Price on Request";
  if (price >= 10000000) {
    const cr = price / 10000000;
    return `₹${cr.toFixed(2).replace(/\.00$/, "")} Cr`;
  } else if (price >= 100000) {
    const lakh = price / 100000;
    return `₹${lakh.toFixed(2).replace(/\.00$/, "")} Lakh`;
  }
  return `₹${Math.round(price).toLocaleString("en-IN")}`;
};

export const PropertyDecisionClient: React.FC<PropertyDecisionClientProps> = ({ property }) => {
  const { isAuthenticated, user } = useAuth();

  // Gallery state
  const images = useMemo(() => {
    if (Array.isArray(property.images) && property.images.length > 0) {
      return property.images.filter((img) => typeof img === "string" && img.trim().length > 0);
    }
    return [];
  }, [property.images]);

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  // Contact modal state
  const [contactModalOpen, setContactModalOpen] = useState(false);

  // Favorites state
  const [isFavorite, setIsFavorite] = useState(false);
  const [loadingFav, setLoadingFav] = useState(false);

  // Comparison state
  const [isCompared, setIsCompared] = useState(false);

  // Similar properties
  const [similarProperties, setSimilarProperties] = useState<any[]>([]);

  // Mortgage Calculator state
  const [homePrice, setHomePrice] = useState<number>(property.price || 50000000);
  const [downPayment, setDownPayment] = useState<number>(Math.round((property.price || 50000000) * 0.2));
  const [interestRate, setInterestRate] = useState<number>(8.5); // Indian standard home loan rate
  const [loanTerm, setLoanTerm] = useState<number>(20); // 20 years

  const homePriceId = useId();
  const downPaymentId = useId();
  const interestRateId = useId();
  const loanTermId = useId();

  // EMI Math (Reducing Balance Formula)
  const principal = Math.max(0, homePrice - downPayment);
  const monthlyRate = interestRate > 0 ? interestRate / 100 / 12 : 0;
  const totalMonths = Math.max(1, loanTerm * 12);

  let monthlyEMI = 0;
  if (principal > 0 && monthlyRate > 0) {
    const rateFactor = Math.pow(1 + monthlyRate, totalMonths);
    monthlyEMI = (principal * monthlyRate * rateFactor) / (rateFactor - 1);
  } else if (principal > 0 && monthlyRate === 0) {
    monthlyEMI = principal / totalMonths;
  }

  const totalPayment = monthlyEMI * totalMonths;
  const totalInterest = Math.max(0, totalPayment - principal);

  // Check initial favorite status
  useEffect(() => {
    let isMounted = true;
    if (!isAuthenticated) return;

    apiClient
      .getFavoriteIds()
      .then((res) => {
        if (isMounted && Array.isArray(res.data)) {
          setIsFavorite(res.data.includes(property.id));
        }
      })
      .catch(() => {});

    return () => {
      isMounted = false;
    };
  }, [isAuthenticated, property.id]);

  // Check initial comparison status from localStorage
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const stored = localStorage.getItem("velmora_compare_ids");
      if (stored) {
        const ids = JSON.parse(stored);
        if (Array.isArray(ids)) {
          setIsCompared(ids.includes(property.id));
        }
      }
    } catch {}
  }, [property.id]);

  // Fetch similar properties from backend
  useEffect(() => {
    let isMounted = true;
    const fetchSimilar = async () => {
      try {
        const params: any = {
          city: property.city,
          propertyType: property.propertyType,
          limit: 4,
        };
        const res = await apiClient.searchProperties(params);
        if (isMounted && res.data?.properties) {
          const filtered = res.data.properties.filter((p: any) => p.id !== property.id).slice(0, 3);
          setSimilarProperties(filtered);
        }
      } catch (e) {}
    };

    fetchSimilar();
    return () => {
      isMounted = false;
    };
  }, [property.city, property.propertyType, property.id]);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    if (!lightboxOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxOpen(false);
      if (e.key === "ArrowRight" && images.length > 1) {
        setActiveImageIndex((prev) => (prev + 1) % images.length);
      }
      if (e.key === "ArrowLeft" && images.length > 1) {
        setActiveImageIndex((prev) => (prev - 1 + images.length) % images.length);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen, images.length]);

  const handleToggleFavorite = async () => {
    if (!isAuthenticated) {
      toast.info("Please log in to save properties to your favourites.", { position: "top-center" });
      const loginBtn = document.querySelector('[data-bs-target="#loginModal"]') as HTMLElement;
      if (loginBtn) loginBtn.click();
      return;
    }

    setLoadingFav(true);
    try {
      if (isFavorite) {
        await apiClient.removeFavorite(property.id);
        setIsFavorite(false);
        toast.success("Removed from favourites.");
      } else {
        await apiClient.addFavorite(property.id, {
          id: property.id,
          title: property.title,
          location: property.location,
          price: property.price,
        });
        setIsFavorite(true);
        toast.success("Saved to your favourites!");
      }
    } catch {
      toast.error("Unable to update favourite status.");
    } finally {
      setLoadingFav(false);
    }
  };

  const handleShare = () => {
    shareProperty({
      title: property.title,
      text: `Discover ${property.title} in ${property.locality || property.location || property.city} on VELMORA.`,
    });
  };

  const handleToggleCompare = () => {
    if (typeof window === "undefined") return;
    try {
      const stored = localStorage.getItem("velmora_compare_ids");
      let ids: number[] = stored ? JSON.parse(stored) : [];
      if (!Array.isArray(ids)) ids = [];

      if (isCompared) {
        ids = ids.filter((id) => id !== property.id);
        setIsCompared(false);
        toast.success("Removed from comparison list.");
      } else {
        if (ids.length >= 4) {
          toast.warning("You can compare up to 4 properties simultaneously.");
          return;
        }
        ids.push(property.id);
        setIsCompared(true);
        toast.success("Added to comparison list! View at /compare");
      }
      localStorage.setItem("velmora_compare_ids", JSON.stringify(ids));
    } catch {}
  };

  // Derived highlights from real data
  const highlights = useMemo(() => {
    const list: string[] = [];
    if (property.bedrooms) list.push(`${property.bedrooms} BHK Spacious Layout`);
    if (property.area) list.push(`${property.area.toLocaleString("en-IN")} sq.ft Carpet Area`);
    if (property.furnishing) list.push(`${property.furnishing} Interior Finish`);
    if (property.parking) list.push(`Dedicated Parking: ${property.parking}`);
    if (property.constructionStatus === "ready_to_move") list.push("Ready to Move In Residence");
    if (property.constructionStatus === "under_construction") list.push("Under Construction Project");
    if (property.reraStatus === "verified") list.push("Authority RERA Verified Compliance");
    if (property.developer) list.push(`Developed by ${property.developer}`);
    return list;
  }, [property]);

  return (
    <div className="property-decision-page bg-pink-two pt-130 xl-pt-100 pb-120">
      <div className="container container-large">
        {/* Breadcrumb & Navigation */}
        <div className="d-flex align-items-center justify-content-between mb-30 flex-wrap gap-2">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb m-0 fs-14">
              <li className="breadcrumb-item">
                <Link href="/" className="text-muted text-decoration-none">
                  Home
                </Link>
              </li>
              <li className="breadcrumb-item">
                <Link href="/listing_01" className="text-muted text-decoration-none">
                  Residences
                </Link>
              </li>
              <li className="breadcrumb-item active text-dark fw-500" aria-current="page">
                {property.title}
              </li>
            </ol>
          </nav>
          <span className="badge bg-dark text-white fs-12 px-3 py-2 text-uppercase">
            {property.listingPurpose || "Buy"} • {property.propertyType}
          </span>
        </div>

        {/* 1. HERO SECTION */}
        <div className="bg-white border-20 p-4 p-lg-5 shadow-sm mb-40">
          <div className="row align-items-end justify-content-between g-4">
            <div className="col-lg-8">
              <div className="d-flex align-items-center gap-2 mb-2 flex-wrap">
                {property.reraStatus === "verified" && (
                  <span className="badge bg-success text-white fs-12 px-2 py-1">
                    <i className="bi bi-shield-check me-1"></i> RERA Verified
                  </span>
                )}
                <span className="badge bg-light text-dark border fs-12 px-2 py-1">
                  {property.constructionStatus === "ready_to_move"
                    ? "Ready to Move"
                    : property.constructionStatus === "under_construction"
                    ? "Under Construction"
                    : "New Launch"}
                </span>
                {property.addressScore > 0 && (
                  <span className="badge bg-warning text-dark fs-12 px-2 py-1 fw-600">
                    Address Score: {property.addressScore}/100
                  </span>
                )}
              </div>

              <h1 className="fw-700 color-dark fs-36 mb-2">{property.title}</h1>
              <p className="text-muted fs-16 mb-0 d-flex align-items-center">
                <i className="bi bi-geo-alt-fill text-warning me-2 fs-18"></i>
                {property.address || `${property.locality ? property.locality + ", " : ""}${property.city}${property.state ? ", " + property.state : ""}`}
              </p>
            </div>

            <div className="col-lg-4 text-lg-end">
              <div className="fs-14 text-muted mb-1">Listed Valuation</div>
              <div className="price fw-700 color-dark fs-36 text-warning mb-2">
                {formatPriceINR(property.price)}
              </div>
              {property.pricePerSqft && property.pricePerSqft > 0 && (
                <div className="fs-14 text-muted">
                  ≈ ₹{property.pricePerSqft.toLocaleString("en-IN")} / sq.ft
                </div>
              )}

              {/* Action Buttons: Favorite, Share, Compare */}
              <div className="d-flex align-items-center justify-content-lg-end gap-2 mt-3">
                <button
                  type="button"
                  onClick={handleToggleFavorite}
                  disabled={loadingFav}
                  className={`btn btn-sm rounded-pill px-3 py-2 border ${
                    isFavorite ? "btn-danger text-white border-danger" : "btn-light"
                  }`}
                  aria-label="Save to favourites"
                >
                  <i className={`bi ${isFavorite ? "bi-heart-fill" : "bi-heart"} me-1`}></i>
                  {isFavorite ? "Saved" : "Favorite"}
                </button>

                <button
                  type="button"
                  onClick={handleShare}
                  className="btn btn-sm btn-light rounded-pill px-3 py-2 border"
                  aria-label="Share property"
                >
                  <i className="bi bi-share me-1"></i> Share
                </button>

                <button
                  type="button"
                  onClick={handleToggleCompare}
                  className={`btn btn-sm rounded-pill px-3 py-2 border ${
                    isCompared ? "btn-dark text-white" : "btn-light"
                  }`}
                  aria-label="Compare property"
                >
                  <i className="bi bi-arrow-left-right me-1"></i>
                  {isCompared ? "Compared" : "Compare"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 2. IMAGE GALLERY & LIGHTBOX */}
        <div className="bg-white border-20 p-4 p-lg-5 shadow-sm mb-40">
          {images.length > 0 ? (
            <div>
              <div
                className="position-relative rounded-4 overflow-hidden mb-3 cursor-pointer"
                style={{ height: "480px", cursor: "pointer" }}
                onClick={() => setLightboxOpen(true)}
              >
                <Image
                  src={images[activeImageIndex]}
                  alt={`${property.title} - image ${activeImageIndex + 1}`}
                  fill
                  sizes="(max-width: 1200px) 100vw, 1200px"
                  className="object-fit-cover w-100 h-100"
                  priority
                />
                <button
                  type="button"
                  className="btn btn-dark position-absolute bottom-0 end-0 m-3 rounded-pill px-3 py-2 fs-13 opacity-90"
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxOpen(true);
                  }}
                >
                  <i className="bi bi-arrows-fullscreen me-1"></i> View Gallery ({images.length} Photos)
                </button>
              </div>

              {/* Thumbnails Strip */}
              {images.length > 1 && (
                <div className="d-flex gap-2 overflow-x-auto pb-2">
                  {images.map((imgUrl, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveImageIndex(idx)}
                      className={`border-0 p-0 rounded-3 overflow-hidden position-relative flex-shrink-0 ${
                        activeImageIndex === idx ? "ring-2 ring-warning border border-warning" : "opacity-75"
                      }`}
                      style={{ width: "110px", height: "75px" }}
                      aria-label={`Show image ${idx + 1}`}
                    >
                      <Image
                        src={imgUrl}
                        alt=""
                        fill
                        sizes="110px"
                        className="object-fit-cover w-100 h-100"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="d-flex flex-column align-items-center justify-content-center bg-light rounded-4 p-5 text-center" style={{ minHeight: "350px" }}>
              <i className="bi bi-image text-muted fs-1 mb-2"></i>
              <h6 className="fw-600">VELMORA Curated Residence Media</h6>
              <p className="text-muted fs-14 mb-0">High-resolution architectural photography is currently being processed for this listing.</p>
            </div>
          )}
        </div>

        {/* Lightbox Modal */}
        {lightboxOpen && images.length > 0 && (
          <div
            className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-black bg-opacity-95"
            style={{ zIndex: 9999 }}
            onClick={() => setLightboxOpen(false)}
          >
            <button
              type="button"
              onClick={() => setLightboxOpen(false)}
              className="btn btn-outline-light position-absolute top-0 end-0 m-4 rounded-circle"
              style={{ width: "45px", height: "45px" }}
              aria-label="Close lightbox"
            >
              ✕
            </button>

            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveImageIndex((prev) => (prev - 1 + images.length) % images.length);
                  }}
                  className="btn btn-outline-light position-absolute start-0 ms-4 rounded-circle"
                  style={{ width: "50px", height: "50px" }}
                  aria-label="Previous image"
                >
                  ❮
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveImageIndex((prev) => (prev + 1) % images.length);
                  }}
                  className="btn btn-outline-light position-absolute end-0 me-4 rounded-circle"
                  style={{ width: "50px", height: "50px" }}
                  aria-label="Next image"
                >
                  ❯
                </button>
              </>
            )}

            <div className="position-relative" style={{ maxWidth: "85vw", maxHeight: "80vh", width: "900px", height: "600px" }} onClick={(e) => e.stopPropagation()}>
              <Image
                src={images[activeImageIndex]}
                alt=""
                fill
                sizes="85vw"
                className="object-fit-contain"
              />
              <div className="position-absolute bottom-0 start-50 translate-middle-x mb-2 text-white bg-dark bg-opacity-75 px-3 py-1 rounded-pill fs-13">
                {activeImageIndex + 1} of {images.length}
              </div>
            </div>
          </div>
        )}

        {/* 3. MAIN CONTENT: 2-COLUMN LAYOUT */}
        <div className="row g-4">
          {/* LEFT COLUMN: Property Intelligence Details */}
          <div className="col-lg-8">
            {/* Property Overview Grid */}
            <div className="bg-white border-20 p-4 p-lg-5 shadow-sm mb-40">
              <h4 className="fw-700 fs-22 color-dark mb-4 border-bottom pb-3">Property Overview</h4>
              <div className="row g-4">
                {property.bedrooms && (
                  <div className="col-sm-6 col-md-4">
                    <div className="d-flex align-items-center gap-3">
                      <Image src={featureIcon_2} alt="" width={36} height={36} />
                      <div>
                        <div className="text-muted fs-13">Bedrooms</div>
                        <div className="fw-600 color-dark fs-16">{property.bedrooms} BHK</div>
                      </div>
                    </div>
                  </div>
                )}
                {property.bathrooms && (
                  <div className="col-sm-6 col-md-4">
                    <div className="d-flex align-items-center gap-3">
                      <Image src={featureIcon_3} alt="" width={36} height={36} />
                      <div>
                        <div className="text-muted fs-13">Bathrooms</div>
                        <div className="fw-600 color-dark fs-16">{property.bathrooms} Baths</div>
                      </div>
                    </div>
                  </div>
                )}
                {property.area && (
                  <div className="col-sm-6 col-md-4">
                    <div className="d-flex align-items-center gap-3">
                      <Image src={featureIcon_1} alt="" width={36} height={36} />
                      <div>
                        <div className="text-muted fs-13">Carpet Area</div>
                        <div className="fw-600 color-dark fs-16">{property.area.toLocaleString("en-IN")} sq.ft</div>
                      </div>
                    </div>
                  </div>
                )}
                {property.floor !== undefined && property.floor !== null && (
                  <div className="col-sm-6 col-md-4">
                    <div className="d-flex align-items-center gap-3">
                      <i className="bi bi-layers fs-2 text-warning"></i>
                      <div>
                        <div className="text-muted fs-13">Floor Level</div>
                        <div className="fw-600 color-dark fs-16">
                          Floor {property.floor} {property.totalFloors ? `of ${property.totalFloors}` : ""}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {property.parking && (
                  <div className="col-sm-6 col-md-4">
                    <div className="d-flex align-items-center gap-3">
                      <i className="bi bi-car-front fs-2 text-warning"></i>
                      <div>
                        <div className="text-muted fs-13">Parking</div>
                        <div className="fw-600 color-dark fs-16">{property.parking}</div>
                      </div>
                    </div>
                  </div>
                )}
                {property.furnishing && (
                  <div className="col-sm-6 col-md-4">
                    <div className="d-flex align-items-center gap-3">
                      <i className="bi bi-house-gear fs-2 text-warning"></i>
                      <div>
                        <div className="text-muted fs-13">Furnishing</div>
                        <div className="fw-600 color-dark fs-16">{property.furnishing}</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Description */}
            {property.description && (
              <div className="bg-white border-20 p-4 p-lg-5 shadow-sm mb-40">
                <h4 className="fw-700 fs-22 color-dark mb-3 border-bottom pb-3">About This Residence</h4>
                <p className="text-muted fs-16 leading-relaxed mb-0" style={{ whiteSpace: "pre-line" }}>
                  {property.description}
                </p>
              </div>
            )}

            {/* Why This Property (Highlights) */}
            {highlights.length > 0 && (
              <div className="bg-white border-20 p-4 p-lg-5 shadow-sm mb-40">
                <h4 className="fw-700 fs-22 color-dark mb-4 border-bottom pb-3">Why This Property</h4>
                <div className="row g-3">
                  {highlights.map((h, i) => (
                    <div key={i} className="col-md-6">
                      <div className="d-flex align-items-center gap-2 p-3 bg-light rounded-3">
                        <i className="bi bi-check-circle-fill text-warning fs-16"></i>
                        <span className="fw-500 fs-14 color-dark">{h}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Address Score Section */}
            <div className="bg-white border-20 p-4 p-lg-5 shadow-sm mb-40">
              <div className="d-flex align-items-center justify-content-between border-bottom pb-3 mb-4 flex-wrap gap-2">
                <div>
                  <h4 className="fw-700 fs-22 color-dark mb-1">VELMORA Address Score</h4>
                  <p className="text-muted fs-14 mb-0">Quantitative micro-market and living infrastructure rating.</p>
                </div>
                {property.addressScore > 0 ? (
                  <div className="badge bg-warning text-dark fs-20 px-3 py-2 rounded-4 fw-700">
                    {property.addressScore} / 100
                  </div>
                ) : (
                  <span className="badge bg-light text-muted border fs-12 px-3 py-2">
                    Address intelligence coming soon
                  </span>
                )}
              </div>

              {property.addressScore > 0 && property.scoreBreakdown && Object.keys(property.scoreBreakdown).length > 0 ? (
                <div className="row g-3">
                  {Object.entries(property.scoreBreakdown).map(([category, val]: [string, any]) => (
                    <div key={category} className="col-sm-6">
                      <div className="p-3 border rounded-3">
                        <div className="d-flex justify-content-between fs-14 mb-1">
                          <span className="text-capitalize fw-500 color-dark">{category}</span>
                          <span className="fw-600 text-warning">{val}/100</span>
                        </div>
                        <div className="progress" style={{ height: "6px" }}>
                          <div
                            className="progress-bar bg-warning"
                            role="progressbar"
                            style={{ width: `${Math.min(100, Number(val) || 0)}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted fs-14 mb-0">
                  Quantitative transit, school, healthcare, and appreciation index will be compiled upon verification.
                </p>
              )}
            </div>

            {/* Amenities */}
            {Array.isArray(property.amenities) && property.amenities.length > 0 && (
              <div className="bg-white border-20 p-4 p-lg-5 shadow-sm mb-40">
                <h4 className="fw-700 fs-22 color-dark mb-4 border-bottom pb-3">Residences Amenities</h4>
                <div className="row g-3">
                  {property.amenities.map((item, idx) => (
                    <div key={idx} className="col-sm-6 col-md-4">
                      <div className="d-flex align-items-center gap-2">
                        <i className="bi bi-stars text-warning fs-14"></i>
                        <span className="fs-15 color-dark">{item}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* RERA Trust & Governance */}
            <div className="bg-white border-20 p-4 p-lg-5 shadow-sm mb-40">
              <h4 className="fw-700 fs-22 color-dark mb-3 border-bottom pb-3">RERA Compliance & Verification</h4>
              <div className="p-4 rounded-4 bg-light">
                <div className="d-flex align-items-center gap-2 mb-3">
                  {property.reraStatus === "verified" ? (
                    <span className="badge bg-success text-white fs-14 px-3 py-2">
                      <i className="bi bi-shield-check me-1"></i> RERA Verified Residence
                    </span>
                  ) : property.reraStatus === "exempt" ? (
                    <span className="badge bg-secondary text-white fs-14 px-3 py-2">
                      RERA Exempt
                    </span>
                  ) : property.reraStatus === "not_applicable" ? (
                    <span className="badge bg-secondary text-white fs-14 px-3 py-2">
                      RERA Not Applicable
                    </span>
                  ) : (
                    <span className="badge bg-warning text-dark fs-14 px-3 py-2">
                      RERA Verification Pending
                    </span>
                  )}
                </div>

                <div className="row g-3 fs-14">
                  {property.reraNumber && (
                    <div className="col-sm-6">
                      <div className="text-muted">Registration Number</div>
                      <div className="fw-600 color-dark font-monospace">{property.reraNumber}</div>
                    </div>
                  )}
                  {property.reraAuthority && (
                    <div className="col-sm-6">
                      <div className="text-muted">Regulatory Authority</div>
                      <div className="fw-600 color-dark">{property.reraAuthority}</div>
                    </div>
                  )}
                  {property.reraRegistrationUrl && (
                    <div className="col-12 mt-2">
                      <a
                        href={property.reraRegistrationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-sm btn-outline-dark rounded-pill px-3 fs-12"
                      >
                        Official Authority Portal Record <i className="bi bi-box-arrow-up-right ms-1"></i>
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Location & Interactive Map */}
            <div className="bg-white border-20 p-4 p-lg-5 shadow-sm mb-40">
              <h4 className="fw-700 fs-22 color-dark mb-2 border-bottom pb-3">Location & Surroundings</h4>
              <p className="text-muted fs-15 mb-3">
                <i className="bi bi-geo-alt me-1"></i>
                {property.address || property.location}
              </p>

              {property.latitude && property.longitude ? (
                <div className="rounded-4 overflow-hidden border" style={{ height: "380px" }}>
                  <PropertyMap
                    markers={[
                      {
                        id: property.id,
                        title: property.title,
                        price: property.price,
                        latitude: property.latitude,
                        longitude: property.longitude,
                        listingPurpose: property.listingPurpose,
                        propertyType: property.propertyType,
                      },
                    ]}
                    initialCenter={{ lat: property.latitude, lng: property.longitude }}
                    initialZoom={14}
                  />
                </div>
              ) : (
                <div className="bg-light p-4 rounded-4 text-center text-muted fs-14">
                  Location map unavailable for this micro-market.
                </div>
              )}
            </div>

            {/* Mortgage & EMI Reducing-Balance Calculator */}
            <div className="bg-white border-20 p-4 p-lg-5 shadow-sm mb-40">
              <h4 className="fw-700 fs-22 color-dark mb-3 border-bottom pb-3">Estimated Monthly Payment (EMI)</h4>
              <p className="text-muted fs-14 mb-4">
                Calculate home loan repayments based on reducing-balance interest formulas.
              </p>

              <div className="row g-4">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor={homePriceId} className="form-label fs-13 text-muted">Property Price (₹)</label>
                    <input
                      id={homePriceId}
                      type="number"
                      value={homePrice}
                      onChange={(e) => setHomePrice(Math.max(0, Number(e.target.value)))}
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor={downPaymentId} className="form-label fs-13 text-muted">Down Payment (₹)</label>
                    <input
                      id={downPaymentId}
                      type="number"
                      value={downPayment}
                      onChange={(e) => setDownPayment(Math.max(0, Number(e.target.value)))}
                      className="form-control"
                    />
                  </div>
                  <div className="row g-2">
                    <div className="col-6">
                      <label htmlFor={interestRateId} className="form-label fs-13 text-muted">Rate (% p.a.)</label>
                      <input
                        id={interestRateId}
                        type="number"
                        step="0.1"
                        value={interestRate}
                        onChange={(e) => setInterestRate(Math.max(0, Number(e.target.value)))}
                        className="form-control"
                      />
                    </div>
                    <div className="col-6">
                      <label htmlFor={loanTermId} className="form-label fs-13 text-muted">Tenure (Years)</label>
                      <input
                        id={loanTermId}
                        type="number"
                        value={loanTerm}
                        onChange={(e) => setLoanTerm(Math.max(1, Number(e.target.value)))}
                        className="form-control"
                      />
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="bg-light p-4 rounded-4 text-center h-100 d-flex flex-column justify-content-center">
                    <div className="text-muted fs-13">Estimated Monthly EMI</div>
                    <div className="fw-700 text-warning fs-32 my-1">
                      {formatPriceINR(monthlyEMI)} / mo
                    </div>
                    <div className="divider my-2 border-top"></div>
                    <div className="d-flex justify-content-between fs-13 py-1">
                      <span className="text-muted">Principal Loan:</span>
                      <span className="fw-600 color-dark">{formatPriceINR(principal)}</span>
                    </div>
                    <div className="d-flex justify-content-between fs-13 py-1">
                      <span className="text-muted">Total Interest:</span>
                      <span className="fw-600 color-dark">{formatPriceINR(totalInterest)}</span>
                    </div>
                    <div className="d-flex justify-content-between fs-13 py-1">
                      <span className="text-muted">Total Payment:</span>
                      <span className="fw-600 color-dark">{formatPriceINR(totalPayment)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Sidebar (Advisor Desk, Schedule Tour, Quick Contact) */}
          <div className="col-lg-4">
            <div className="position-sticky" style={{ top: "120px" }}>
              {/* Private Luxury Advisor Box */}
              <div className="bg-white border-20 p-4 shadow-sm mb-30 text-center">
                <Image
                  src={advisorDefaultAvatar}
                  alt={property.agent?.name || "VELMORA Luxury Advisor"}
                  className="rounded-circle mx-auto mb-3 object-fit-cover shadow-sm"
                  width={80}
                  height={80}
                />
                <h5 className="fw-600 color-dark fs-18 mb-1">
                  {property.agent?.name || "VELMORA Private Advisory Desk"}
                </h5>
                <p className="text-muted fs-13 mb-3">
                  {property.agent?.about || "Dedicated Luxury Real Estate Advisor • Confidential Consultations"}
                </p>

                <div className="d-grid gap-2">
                  <button
                    type="button"
                    onClick={() => setContactModalOpen(true)}
                    className="btn btn-dark rounded-pill py-2 fw-500 fs-14"
                  >
                    <i className="bi bi-chat-dots me-1"></i> Contact Advisor
                  </button>
                </div>
              </div>

              {/* Schedule Tour Card */}
              <div className="bg-white border-20 p-4 shadow-sm mb-30">
                <h5 className="fw-600 color-dark fs-18 mb-2 border-bottom pb-2">
                  Schedule Private Tour
                </h5>
                <p className="text-muted fs-13 mb-3">
                  Select a convenient date for a guided on-site preview.
                </p>
                <ScheduleForm
                  propertyId={property.id}
                  propertyTitle={property.title}
                  propertyLocation={property.location || property.locality || property.city}
                />
              </div>
            </div>
          </div>
        </div>

        {/* 4. SIMILAR RESIDENCES */}
        {similarProperties.length > 0 && (
          <div className="mt-60">
            <h3 className="fw-700 fs-26 color-dark mb-4">Similar Curated Residences</h3>
            <div className="row g-4">
              {similarProperties.map((sim) => (
                <div key={sim.id} className="col-md-4">
                  <div className="bg-white border-20 overflow-hidden shadow-sm h-100 d-flex flex-column">
                    <div className="position-relative" style={{ height: "200px" }}>
                      <Image
                        src={
                          (sim.images && sim.images[0]) ||
                          sim.thumb ||
                          "/assets/images/listing/img_01.jpg"
                        }
                        alt={sim.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-fit-cover"
                      />
                    </div>
                    <div className="p-3 d-flex flex-column justify-content-between flex-grow-1">
                      <div>
                        <div className="fw-600 color-dark fs-16 text-truncate mb-1">{sim.title}</div>
                        <div className="text-muted fs-13 text-truncate mb-2">
                          <i className="bi bi-geo-alt me-1"></i>
                          {sim.locality || sim.city}
                        </div>
                      </div>
                      <div className="d-flex align-items-center justify-content-between pt-2 border-top">
                        <strong className="text-warning fs-16">{formatPriceINR(sim.price)}</strong>
                        <Link href={`/properties/${sim.id}`} className="btn btn-sm btn-outline-dark rounded-pill px-3">
                          Explore
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Contact Agent Modal */}
      <ContactAgentModal
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
        propertyId={property.id}
        propertyTitle={property.title}
        propertyLocation={property.locality || property.city}
        advisorName={property.agent?.name || "VELMORA Luxury Advisor"}
      />
    </div>
  );
};

export default PropertyDecisionClient;
