"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import NiceSelect from "@/ui/NiceSelect";
import PropertyMap from "@/components/map/PropertyMap";
import { usePropertyDiscovery } from "@/hooks/usePropertyDiscovery";
import DropdownSeven from "@/components/search-dropdown/inner-dropdown/DropdownSeven";

import featureIcon_1 from "@/assets/images/icon/icon_32.svg";
import featureIcon_2 from "@/assets/images/icon/icon_33.svg";
import featureIcon_3 from "@/assets/images/icon/icon_34.svg";

const select_type: string[] = ["All", "Apartments", "Villa", "Penthouse", "Independent House", "Commercial"];

const formatPrice = (price: number) => {
  if (!price || price <= 0) return "Price on Request";
  if (price >= 10000000) {
    const cr = price / 10000000;
    return `₹${cr.toFixed(2).replace(/\.00$/, "")} Cr`;
  } else if (price >= 100000) {
    const lakh = price / 100000;
    return `₹${lakh.toFixed(2).replace(/\.00$/, "")} Lakh`;
  }
  return `₹${price.toLocaleString("en-IN")}`;
};

const ListingSixteenArea = () => {
  const {
    properties,
    markers,
    total,
    totalPages,
    currentPage,
    setCurrentPage,
    loading,
    selectedPropertyId,
    setSelectedPropertyId,
    mobileView,
    setMobileView,
    handleBoundsChange,
    filters,
    updateFilters,
    resetFilters,
  } = usePropertyDiscovery(10);

  const cardRefs = useRef<Record<string | number, HTMLDivElement | null>>({});

  const handleMarkerSelect = (id: string | number) => {
    setSelectedPropertyId(id);
    const cardEl = cardRefs.current[id];
    if (cardEl) {
      cardEl.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const handleTypeClick = (type: string) => {
    updateFilters({ propertyType: type === "All" ? "all" : type.toLowerCase() });
  };

  const handleSortChange = (e: any) => {
    if (e?.target?.value) {
      updateFilters({ sortBy: e.target.value });
    }
  };

  const selectedProperty = properties.find((p) => String(p.id) === String(selectedPropertyId));

  return (
    <div className="property-listing-eight pt-150 xl-pt-120 position-relative">
      {/* Mobile Floating List/Map View Toggle */}
      <div
        className="d-lg-none position-fixed bottom-0 start-50 translate-middle-x mb-4 shadow-lg rounded-pill bg-dark p-1 d-flex"
        style={{ zIndex: 1060 }}
      >
        <button
          onClick={() => setMobileView("list")}
          className={`btn btn-sm rounded-pill px-3 py-2 fw-500 text-white ${
            mobileView === "list" ? "bg-warning text-dark" : "bg-transparent"
          }`}
        >
          <i className="fa-regular fa-list me-1"></i> List ({total})
        </button>
        <button
          onClick={() => setMobileView("map")}
          className={`btn btn-sm rounded-pill px-3 py-2 fw-500 text-white ${
            mobileView === "map" ? "bg-warning text-dark" : "bg-transparent"
          }`}
        >
          <i className="fa-regular fa-map-location-dot me-1"></i> Map
        </button>
      </div>

      {/* Filter Bar */}
      <div className="search-wrapper-three layout-two dark-bg border-0 position-relative">
        <div className="bg-wrapper rounded-0 border-0">
          <DropdownSeven
            handleSearchChange={(e: any) => updateFilters({ search: e.target.value })}
            handleBedroomChange={(e: any) => updateFilters({ bhk: e.target.value })}
            handleBathroomChange={() => {}}
            handlePriceChange={(e: any) => updateFilters({ maxPrice: Number(e.target.value) })}
            handleResetFilter={resetFilters}
            selectedAmenities={[]}
            handleAmenityChange={() => {}}
            handleLocationChange={(e: any) => updateFilters({ location: e.target.value })}
            handleStatusChange={(e: any) => updateFilters({ purpose: e.target.value })}
            handlePriceDropChange={() => {}}
          />
        </div>
      </div>

      {/* Discovery Split View */}
      <div className="row gx-0">
        {/* Map Panel */}
        <div
          className={`col-xxl-6 col-lg-5 order-lg-last ${
            mobileView === "list" ? "d-none d-lg-block" : "d-block"
          }`}
        >
          <div
            id="google-map-area"
            className="h-100 position-sticky top-0"
            style={{ minHeight: "calc(100vh - 150px)", height: "calc(100vh - 150px)" }}
          >
            <PropertyMap
              markers={markers}
              selectedPropertyId={selectedPropertyId}
              onSelectProperty={handleMarkerSelect}
              onBoundsChange={handleBoundsChange}
            />

            {/* Mobile Map Bottom Card */}
            {mobileView === "map" && selectedProperty && (
              <div
                className="d-lg-none position-absolute bottom-0 start-0 end-0 p-3"
                style={{ zIndex: 1040, marginBottom: "70px" }}
              >
                <div className="card shadow-lg border-0 rounded-4 overflow-hidden">
                  <div className="row g-0 align-items-center">
                    <div className="col-4">
                      <Image
                        src={
                          selectedProperty.thumb ||
                          (selectedProperty.images && selectedProperty.images[0]) ||
                          (selectedProperty.carousel_thumb && selectedProperty.carousel_thumb[0]?.img) ||
                          "/assets/images/listing/img_01.jpg"
                        }
                        width={120}
                        height={100}
                        alt={selectedProperty.title}
                        className="w-100 h-100 object-fit-cover"
                      />
                    </div>
                    <div className="col-8 p-3">
                      <div className="fw-bold fs-14 text-truncate">{selectedProperty.title}</div>
                      <div className="text-muted fs-12 text-truncate">{selectedProperty.location || selectedProperty.address}</div>
                      <div className="fw-600 text-warning fs-14 mt-1">{formatPrice(selectedProperty.price)}</div>
                      <Link
                        href={`/listing_details_01?id=${selectedProperty.id}`}
                        className="btn btn-sm btn-outline-dark rounded-pill mt-2 py-0 px-2 fs-12"
                      >
                        View Residence
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Property List Panel */}
        <div
          className={`col-xxl-6 col-lg-7 ${
            mobileView === "map" ? "d-none d-lg-block" : "d-block"
          }`}
        >
          <div className="pl-40 pr-40 pt-35 pb-60">
            {/* Type Filter Pills */}
            <div className="listing-type-filter border-0 p0">
              <div className="wrapper">
                <ul className="style-none d-flex flex-wrap align-items-center justify-content-center justify-content-xxl-between">
                  <li className="w-100">Select Type:</li>
                  {select_type.map((select, i) => (
                    <li key={i}>
                      <button
                        type="button"
                        className={`btn btn-link text-decoration-none ${
                          (filters.propertyType || "all") === (select === "All" ? "all" : select.toLowerCase())
                            ? "active fw-bold text-warning"
                            : "text-muted"
                        }`}
                        onClick={() => handleTypeClick(select)}
                      >
                        {select}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* List Header Count & Sort */}
            <div className="listing-header-filter d-sm-flex justify-content-between align-items-center mt-50 mb-30">
              <div>
                {loading ? (
                  <span className="text-muted">Searching visible residences...</span>
                ) : (
                  <>
                    Showing <span className="color-dark fw-500">{properties.length > 0 ? "1–" + properties.length : "0"}</span> of{" "}
                    <span className="color-dark fw-500">{total}</span> residences in this area
                  </>
                )}
              </div>
              <div className="d-flex align-items-center xs-mt-20">
                <div className="short-filter d-flex align-items-center">
                  <div className="fs-16 me-2">Sort by:</div>
                  <NiceSelect
                    className="nice-select rounded-0"
                    options={[
                      { value: "newest", text: "Newest" },
                      { value: "price_asc", text: "Price: Low to High" },
                      { value: "price_desc", text: "Price: High to Low" },
                      { value: "score_desc", text: "Highest Score" },
                    ]}
                    defaultCurrent={0}
                    onChange={handleSortChange}
                    name=""
                    placeholder=""
                  />
                </div>
                <Link
                  href="/listing_17"
                  className="tran3s layout-change rounded-circle ms-auto ms-sm-3"
                  data-bs-toggle="tooltip"
                  title="Switch To List View"
                >
                  <i className="fa-regular fa-bars"></i>
                </Link>
              </div>
            </div>

            {/* Empty State */}
            {!loading && properties.length === 0 && (
              <div className="text-center py-5 border rounded-4 bg-light my-4 p-4">
                <i className="bi bi-geo-alt text-muted fs-1 mb-2"></i>
                <h5 className="fw-600 mb-2">No residences found in this area</h5>
                <p className="text-muted fs-14 mb-4" style={{ maxWidth: "360px", margin: "0 auto" }}>
                  Try adjusting your budget or panning the map to discover premium residences in surrounding micro-markets.
                </p>
                <button onClick={resetFilters} className="btn btn-dark rounded-pill px-4 py-2 fs-14">
                  Reset Search Filters
                </button>
              </div>
            )}

            {/* Property Grid Cards */}
            <div className="row gx-xxl-5">
              {properties.map((item: any) => {
                const isSelected = String(item.id) === String(selectedPropertyId);
                const thumbImg =
                  item.thumb ||
                  (item.images && item.images[0]) ||
                  (item.carousel_thumb && item.carousel_thumb[0]?.img) ||
                  "/assets/images/listing/img_01.jpg";

                const beds = item.bedrooms || item.property_info?.bed || item.property_details?.bed || "—";
                const baths = item.bathrooms || item.property_info?.bath || item.property_details?.bath || "—";
                const sqft = item.area || item.property_info?.sqft || item.property_details?.sqft || "—";

                return (
                  <div
                    key={item.id}
                    ref={(el) => {
                      cardRefs.current[item.id] = el;
                    }}
                    onMouseEnter={() => setSelectedPropertyId(item.id)}
                    className="col-md-6 d-flex mb-40 wow fadeInUp"
                  >
                    <div
                      className={`listing-card-one style-two shadow-sm h-100 w-100 rounded-4 overflow-hidden transition-all ${
                        isSelected ? "border border-2 border-warning shadow-lg" : "border"
                      }`}
                      style={{ transition: "all 0.25s ease" }}
                    >
                      <div className="img-gallery position-relative">
                        <div className="position-relative overflow-hidden" style={{ height: "220px" }}>
                          <div className="tag fw-500 position-absolute top-0 start-0 m-3 z-2">
                            {item.listingPurpose || item.tag || "FOR SALE"}
                          </div>
                          {item.reraStatus === "verified" && (
                            <div className="badge bg-success position-absolute top-0 end-0 m-3 z-2 px-2 py-1 fs-12">
                              <i className="bi bi-shield-check me-1"></i> RERA Verified
                            </div>
                          )}
                          <Link href={`/listing_details_01?id=${item.id}`} className="d-block w-100 h-100">
                            <Image
                              src={thumbImg}
                              width={400}
                              height={260}
                              alt={item.title}
                              className="w-100 h-100 object-fit-cover"
                            />
                          </Link>
                        </div>
                      </div>

                      <div className="property-info p-3">
                        <Link href={`/listing_details_01?id=${item.id}`} className="title tran3s fw-600 text-truncate d-block fs-16 mb-1">
                          {item.title}
                        </Link>
                        <div className="address text-muted fs-13 text-truncate mb-2">
                          <i className="bi bi-geo-alt me-1"></i>
                          {item.locality || item.location || item.address}
                        </div>

                        <ul className="style-none feature d-flex flex-wrap align-items-center justify-content-between pb-15 pt-5 border-top border-bottom">
                          <li className="d-flex align-items-center">
                            <Image src={featureIcon_1} alt="" className="lazy-img icon me-2" />
                            <span className="fs-13">
                              <span className="color-dark fw-500">{sqft}</span> sqft
                            </span>
                          </li>
                          <li className="d-flex align-items-center">
                            <Image src={featureIcon_2} alt="" className="lazy-img icon me-2" />
                            <span className="fs-13">
                              <span className="color-dark fw-500">{beds}</span> bed
                            </span>
                          </li>
                          <li className="d-flex align-items-center">
                            <Image src={featureIcon_3} alt="" className="lazy-img icon me-2" />
                            <span className="fs-13">
                              <span className="color-dark fw-500">{baths}</span> bath
                            </span>
                          </li>
                        </ul>

                        <div className="pl-footer d-flex align-items-center justify-content-between pt-3">
                          <strong className="price fw-600 color-dark fs-16">{formatPrice(item.price)}</strong>
                          <Link href={`/listing_details_01?id=${item.id}`} className="btn-four rounded-circle">
                            <i className="bi bi-arrow-up-right"></i>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingSixteenArea;
