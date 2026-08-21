"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { LocalityRecord } from "@/types/locality";
import { PropertyRecord } from "@/types/property";
import PropertyMap from "@/components/map/PropertyMap";
import ContactAgentModal from "@/modals/ContactAgentModal";

import featureIcon_1 from "@/assets/images/icon/icon_47.svg";
import featureIcon_2 from "@/assets/images/icon/icon_48.svg";
import featureIcon_3 from "@/assets/images/icon/icon_49.svg";
import advisorDefaultAvatar from "@/assets/images/agent/img_06.jpg";

interface LocalityIntelligenceClientProps {
  locality: LocalityRecord;
  properties: PropertyRecord[];
}

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

export const LocalityIntelligenceClient: React.FC<LocalityIntelligenceClientProps> = ({
  locality,
  properties,
}) => {
  const [contactModalOpen, setContactModalOpen] = useState(false);

  const mapMarkers = properties
    .filter((p) => p.latitude && p.longitude)
    .map((p) => ({
      id: p.id,
      title: p.title,
      price: p.price,
      latitude: p.latitude as number,
      longitude: p.longitude as number,
      listingPurpose: p.listingPurpose,
      propertyType: p.propertyType,
    }));

  const mapCenter =
    locality.latitude && locality.longitude
      ? { lat: locality.latitude, lng: locality.longitude }
      : mapMarkers.length > 0
      ? { lat: mapMarkers[0].latitude, lng: mapMarkers[0].longitude }
      : { lat: 18.9986, lng: 72.8174 }; // Default Mumbai

  return (
    <div className="locality-intelligence-page bg-pink-two pt-130 xl-pt-100 pb-120">
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
              <li className="breadcrumb-item">
                <Link href="/listing_01" className="text-muted text-decoration-none">
                  Localities
                </Link>
              </li>
              <li className="breadcrumb-item active text-dark fw-500" aria-current="page">
                {locality.name}, {locality.city}
              </li>
            </ol>
          </nav>
        </div>

        {/* 1. LOCALITY HERO */}
        <div className="bg-white border-20 p-4 p-lg-5 shadow-sm mb-40">
          <div className="row align-items-center justify-content-between g-4">
            <div className="col-lg-8">
              <div className="d-flex align-items-center gap-2 mb-2 flex-wrap">
                <span className="badge bg-dark text-white fs-12 px-3 py-1">
                  Micro-Market Intelligence
                </span>
                <span className="badge bg-light text-dark border fs-12 px-3 py-1">
                  {locality.city}, {locality.state}
                </span>
                {locality.pincode && (
                  <span className="badge bg-light text-muted border fs-12 px-2 py-1">
                    PIN: {locality.pincode}
                  </span>
                )}
              </div>

              <h1 className="fw-700 color-dark fs-36 mb-2">{locality.name}</h1>
              <p className="text-muted fs-16 mb-0">
                {locality.description ||
                  `Comprehensive property valuation benchmarks, living infrastructure, and active luxury residences in ${locality.name}, ${locality.city}.`}
              </p>
            </div>

            <div className="col-lg-4 text-lg-end">
              <div className="p-3 rounded-4 bg-light d-inline-block text-start border">
                <div className="fs-13 text-muted">Active Residences</div>
                <div className="fw-700 fs-28 color-dark">{properties.length} Available</div>
                <div className="text-muted fs-12">Verified VELMORA listings</div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. PRICE SNAPSHOT */}
        <div className="bg-white border-20 p-4 p-lg-5 shadow-sm mb-40">
          <h2 className="fw-700 fs-22 color-dark mb-3 border-bottom pb-3">
            Market Price Snapshot & Valuation Benchmarks
          </h2>

          <div className="row g-4">
            <div className="col-md-4">
              <div className="p-4 rounded-4 bg-light border h-100">
                <div className="text-muted fs-13 mb-1">Locality Benchmark (₹/sq.ft)</div>
                {locality.avgPriceSqft && locality.avgPriceSqft > 0 ? (
                  <>
                    <div className="fw-700 text-warning fs-32">
                      ₹{locality.avgPriceSqft.toLocaleString("en-IN")}
                    </div>
                    <div className="text-muted fs-12 mt-1">Average weighted capital value</div>
                  </>
                ) : (
                  <div className="text-muted fs-14 py-2">
                    Verified locality pricing data is not available yet.
                  </div>
                )}
              </div>
            </div>

            <div className="col-md-4">
              <div className="p-4 rounded-4 bg-light border h-100">
                <div className="text-muted fs-13 mb-1">Observed Price Range</div>
                {locality.observedMinPriceSqft && locality.observedMaxPriceSqft ? (
                  <>
                    <div className="fw-600 color-dark fs-20">
                      ₹{locality.observedMinPriceSqft.toLocaleString("en-IN")} – ₹
                      {locality.observedMaxPriceSqft.toLocaleString("en-IN")}
                    </div>
                    <div className="text-muted fs-12 mt-1">Per sq.ft based on active listings</div>
                  </>
                ) : (
                  <div className="text-muted fs-14 py-2">
                    Active price range compiling from listing submissions.
                  </div>
                )}
              </div>
            </div>

            <div className="col-md-4">
              <div className="p-4 rounded-4 bg-light border h-100">
                <div className="text-muted fs-13 mb-1">Gross Rental Yield</div>
                {locality.rentalYield && locality.rentalYield > 0 ? (
                  <>
                    <div className="fw-700 text-success fs-32">
                      {locality.rentalYield.toFixed(2)}%
                    </div>
                    <div className="text-muted fs-12 mt-1">Estimated annual rental return</div>
                  </>
                ) : (
                  <div className="text-muted fs-14 py-2">
                    Verified rental yield benchmark not available yet.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 3. HISTORICAL PRICE TRENDS */}
        <div className="bg-white border-20 p-4 p-lg-5 shadow-sm mb-40">
          <h2 className="fw-700 fs-22 color-dark mb-2 border-bottom pb-3">
            Historical Price Movement & Trends
          </h2>

          {locality.priceTrends && locality.priceTrends.length > 0 ? (
            <div className="table-responsive mt-3">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th scope="col" className="fs-13 text-muted">Period</th>
                    <th scope="col" className="fs-13 text-muted">Average Rate (₹/sq.ft)</th>
                    <th scope="col" className="fs-13 text-muted">Quarterly (QoQ)</th>
                    <th scope="col" className="fs-13 text-muted">Annual (YoY)</th>
                    <th scope="col" className="fs-13 text-muted">Data Source</th>
                  </tr>
                </thead>
                <tbody>
                  {locality.priceTrends.map((t, idx) => (
                    <tr key={t.id || idx}>
                      <td className="fw-600 color-dark">{t.quarter.toUpperCase()} {t.year}</td>
                      <td className="fw-600 text-warning">₹{Number(t.avgPriceSqft).toLocaleString("en-IN")}</td>
                      <td>
                        {t.qoqChangePct !== undefined && t.qoqChangePct !== null ? (
                          <span className={t.qoqChangePct >= 0 ? "text-success fw-500" : "text-danger fw-500"}>
                            {t.qoqChangePct >= 0 ? `+${t.qoqChangePct}%` : `${t.qoqChangePct}%`}
                          </span>
                        ) : (
                          <span className="text-muted">—</span>
                        )}
                      </td>
                      <td>
                        {t.yoyChangePct !== undefined && t.yoyChangePct !== null ? (
                          <span className={t.yoyChangePct >= 0 ? "text-success fw-500" : "text-danger fw-500"}>
                            {t.yoyChangePct >= 0 ? `+${t.yoyChangePct}%` : `${t.yoyChangePct}%`}
                          </span>
                        ) : (
                          <span className="text-muted">—</span>
                        )}
                      </td>
                      <td className="text-muted fs-13 font-monospace">{t.source || "verified_internal"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-4 bg-light rounded-4 text-center my-3">
              <i className="bi bi-graph-up text-muted fs-2 mb-2"></i>
              <div className="fw-600 color-dark fs-15">Historical market trend data is not available yet.</div>
              <p className="text-muted fs-13 mb-0">
                VELMORA records verified quarterly observations directly from registered transactions and authoritative property deeds.
              </p>
            </div>
          )}
        </div>

        {/* 4. LIVING INFRASTRUCTURE & MICRO-MARKET METRICS */}
        <div className="bg-white border-20 p-4 p-lg-5 shadow-sm mb-40">
          <h2 className="fw-700 fs-22 color-dark mb-3 border-bottom pb-3">
            Living Infrastructure & Micro-Market Indices
          </h2>

          <div className="row g-4">
            <div className="col-md-3 col-sm-6">
              <div className="p-3 border rounded-3 bg-light h-100">
                <div className="d-flex align-items-center gap-2 mb-2 text-warning fs-18">
                  <i className="bi bi-signpost-split-fill"></i>
                  <span className="fw-600 color-dark fs-15">Connectivity</span>
                </div>
                {locality.connectivityScore ? (
                  <div className="fw-700 fs-24 color-dark">{locality.connectivityScore} / 100</div>
                ) : (
                  <div className="text-muted fs-13">Connectivity intelligence coming soon.</div>
                )}
              </div>
            </div>

            <div className="col-md-3 col-sm-6">
              <div className="p-3 border rounded-3 bg-light h-100">
                <div className="d-flex align-items-center gap-2 mb-2 text-warning fs-18">
                  <i className="bi bi-book-fill"></i>
                  <span className="fw-600 color-dark fs-15">Education</span>
                </div>
                {locality.schoolsCount ? (
                  <div className="fw-700 fs-24 color-dark">{locality.schoolsCount} Schools nearby</div>
                ) : (
                  <div className="text-muted fs-13">School directory intelligence coming soon.</div>
                )}
              </div>
            </div>

            <div className="col-md-3 col-sm-6">
              <div className="p-3 border rounded-3 bg-light h-100">
                <div className="d-flex align-items-center gap-2 mb-2 text-warning fs-18">
                  <i className="bi bi-hospital-fill"></i>
                  <span className="fw-600 color-dark fs-15">Healthcare</span>
                </div>
                {locality.hospitalsCount ? (
                  <div className="fw-700 fs-24 color-dark">{locality.hospitalsCount} Hospitals nearby</div>
                ) : (
                  <div className="text-muted fs-13">Healthcare intelligence coming soon.</div>
                )}
              </div>
            </div>

            <div className="col-md-3 col-sm-6">
              <div className="p-3 border rounded-3 bg-light h-100">
                <div className="d-flex align-items-center gap-2 mb-2 text-warning fs-18">
                  <i className="bi bi-cup-hot-fill"></i>
                  <span className="fw-600 color-dark fs-15">Lifestyle Index</span>
                </div>
                {locality.lifestyleScore ? (
                  <div className="fw-700 fs-24 color-dark">{locality.lifestyleScore} / 100</div>
                ) : (
                  <div className="text-muted fs-13">Lifestyle index intelligence coming soon.</div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 5. INTERACTIVE LOCALITY MAP */}
        <div className="bg-white border-20 p-4 p-lg-5 shadow-sm mb-40">
          <h2 className="fw-700 fs-22 color-dark mb-2 border-bottom pb-3">
            Locality Map & Available Residences
          </h2>
          <p className="text-muted fs-14 mb-3">
            Explore active residences geographically situated in {locality.name}, {locality.city}.
          </p>

          <div className="rounded-4 overflow-hidden border" style={{ height: "420px" }}>
            <PropertyMap
              markers={mapMarkers}
              initialCenter={mapCenter}
              initialZoom={14}
            />
          </div>
        </div>

        {/* 6. ACTIVE RESIDENCES INVENTORY */}
        <div className="mb-40">
          <div className="d-flex align-items-center justify-content-between mb-4 flex-wrap gap-2">
            <div>
              <h2 className="fw-700 fs-26 color-dark mb-1">
                Active Residences in {locality.name}
              </h2>
              <p className="text-muted fs-14 mb-0">
                Curated luxury residences available for purchase or lease.
              </p>
            </div>
            <Link
              href={`/listing_16?search=${encodeURIComponent(locality.name)}`}
              className="btn btn-outline-dark rounded-pill px-4 py-2 fs-14"
            >
              View on Map Discovery <i className="bi bi-map ms-1"></i>
            </Link>
          </div>

          {properties.length > 0 ? (
            <div className="row g-4">
              {properties.map((p) => {
                const thumbImg =
                  (p.images && p.images[0]) ||
                  "/assets/images/listing/img_01.jpg";

                return (
                  <div key={p.id} className="col-md-6 col-lg-4">
                    <div className="bg-white border-20 overflow-hidden shadow-sm h-100 d-flex flex-column">
                      <div className="position-relative" style={{ height: "220px" }}>
                        <Image
                          src={thumbImg}
                          alt={p.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-fit-cover"
                        />
                        <div className="position-absolute top-0 start-0 m-3 badge bg-dark text-white">
                          {p.listingPurpose || "FOR SALE"}
                        </div>
                        {p.reraStatus === "verified" ? (
                          <div className="position-absolute top-0 end-0 m-3 badge bg-success text-white">
                            <i className="bi bi-shield-check me-1"></i> RERA Verified
                          </div>
                        ) : p.reraStatus === "pending" && p.reraNumber ? (
                          <div className="position-absolute top-0 end-0 m-3 badge bg-warning text-dark">
                            <i className="bi bi-hourglass-split me-1"></i> RERA Pending
                          </div>
                        ) : null}
                      </div>

                      <div className="p-4 d-flex flex-column justify-content-between flex-grow-1">
                        <div>
                          <h3 className="fw-600 color-dark fs-17 text-truncate mb-1">{p.title}</h3>
                          <p className="text-muted fs-13 text-truncate mb-3">
                            <i className="bi bi-geo-alt me-1"></i>
                            {p.address || `${p.locality || locality.name}, ${p.city}`}
                          </p>

                          <div className="d-flex align-items-center justify-content-between py-2 border-top border-bottom text-muted fs-13 mb-3">
                            {p.bedrooms && <span>{p.bedrooms} BHK</span>}
                            {p.bathrooms && <span>{p.bathrooms} Baths</span>}
                            {p.area && <span>{p.area.toLocaleString("en-IN")} sq.ft</span>}
                          </div>
                        </div>

                        <div className="d-flex align-items-center justify-content-between pt-2">
                          <strong className="text-warning fs-18">{formatPriceINR(p.price)}</strong>
                          <Link href={`/properties/${p.id}`} className="btn btn-sm btn-dark rounded-pill px-3">
                            View Residence
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="bg-white border-20 p-5 text-center shadow-sm">
              <i className="bi bi-house-slash text-muted fs-1 mb-2"></i>
              <h5 className="fw-600">No active residences currently listed in this micro-market.</h5>
              <p className="text-muted fs-14 mb-4">
                Explore surrounding localities or contact a VELMORA private advisor for off-market inventory.
              </p>
              <button
                type="button"
                onClick={() => setContactModalOpen(true)}
                className="btn btn-dark rounded-pill px-4 py-2 fs-14"
              >
                Inquire with Private Desk
              </button>
            </div>
          )}
        </div>

        {/* 7. PRIVATE ADVISOR CTA */}
        <div className="bg-dark text-white border-20 p-4 p-lg-5 shadow-sm text-center">
          <h2 className="fw-700 fs-26 text-white mb-2">
            Interested in {locality.name} Real Estate Opportunities?
          </h2>
          <p className="text-white text-opacity-75 fs-15 mb-4 mx-auto" style={{ maxWidth: "600px" }}>
            Connect with a dedicated VELMORA luxury property advisor for exclusive micro-market insights, off-market penthouses, and tailored investment advisory.
          </p>
          <button
            type="button"
            onClick={() => setContactModalOpen(true)}
            className="btn btn-warning text-dark fw-600 rounded-pill px-4 py-2 fs-14"
          >
            Connect with Private Advisor
          </button>
        </div>
      </div>

      <ContactAgentModal
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
        propertyTitle={`Market Inquiry: ${locality.name}, ${locality.city}`}
        propertyLocation={`${locality.name}, ${locality.city}`}
        advisorName="VELMORA Private Advisory Desk"
      />
    </div>
  );
};

export default LocalityIntelligenceClient;
