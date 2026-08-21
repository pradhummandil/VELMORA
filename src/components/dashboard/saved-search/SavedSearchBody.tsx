"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import DashboardHeaderTwo from "@/layouts/headers/dashboard/DashboardHeaderTwo";
import { apiClient } from "@/utils/api";

const formatINR = (val?: number | null): string => {
  if (!val || isNaN(val) || val <= 0) return "₹0";
  if (val >= 10000000) {
    const cr = val / 10000000;
    return `₹${cr.toFixed(2).replace(/\.00$/, "")} Cr`;
  } else if (val >= 100000) {
    const lakh = val / 100000;
    return `₹${lakh.toFixed(2).replace(/\.00$/, "")} Lakh`;
  }
  return `₹${Math.round(val).toLocaleString("en-IN")}`;
};

export const SavedSearchBody: React.FC = () => {
  const router = useRouter();
  const [searches, setSearches] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchSearches = async () => {
    try {
      const res = await apiClient.getSavedSearches();
      if (res.data?.searches) {
        setSearches(res.data.searches);
      }
    } catch (err) {
      console.error("Failed to load saved searches:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSearches();
  }, []);

  const handleToggleAlert = async (id: number, currentAlert: boolean) => {
    try {
      await apiClient.updateSavedSearch(id, { alertEnabled: !currentAlert });
      toast.success(`Search alerts ${!currentAlert ? "enabled" : "paused"}.`);
      fetchSearches();
    } catch {
      toast.error("Failed to update alert preference.");
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to remove this saved search?")) return;
    try {
      await apiClient.deleteSavedSearch(id);
      toast.success("Saved search removed.");
      fetchSearches();
    } catch {
      toast.error("Failed to delete saved search.");
    }
  };

  const handleRunSearch = (search: any) => {
    const criteria = search.criteria || {};
    const params = new URLSearchParams();

    if (criteria.city) params.set("city", criteria.city);
    if (criteria.locality) params.set("locality", criteria.locality);
    if (criteria.minPrice) params.set("minPrice", String(criteria.minPrice));
    if (criteria.maxPrice) params.set("maxPrice", String(criteria.maxPrice));
    if (criteria.bhk) params.set("bedrooms", String(criteria.bhk));
    if (criteria.propertyType) params.set("propertyType", String(criteria.propertyType));
    if (criteria.goal) params.set("listingPurpose", String(criteria.goal));

    router.push(`/listing_16?${params.toString()}`);
  };

  return (
    <div className="dashboard-body">
      <div className="position-relative">
        <DashboardHeaderTwo title="Saved Searches & Discovery Alerts" />
        <h2 className="main-title d-block d-lg-none">Saved Searches</h2>

        {loading ? (
          <div className="bg-white card-box border-20 text-center py-5">
            <div className="spinner-border text-warning mb-2" role="status"></div>
            <div className="text-muted fs-14">Loading your saved searches...</div>
          </div>
        ) : searches.length > 0 ? (
          <div className="row g-4">
            {searches.map((item) => {
              const criteria = item.criteria || {};

              return (
                <div key={item.id} className="col-lg-6">
                  <div className="bg-white card-box border-20 p-4 h-100 d-flex flex-column justify-content-between shadow-sm">
                    <div>
                      {/* Search Header */}
                      <div className="d-flex align-items-center justify-content-between mb-3">
                        <div className="d-flex align-items-center gap-2">
                          <i className="bi bi-bookmark-star-fill text-warning fs-18"></i>
                          <h4 className="fw-700 color-dark fs-18 mb-0">{item.name}</h4>
                        </div>
                        <span
                          className={`badge ${
                            item.alertEnabled ? "bg-success" : "bg-light text-muted border"
                          } fs-12 px-2 py-1`}
                        >
                          {item.alertEnabled ? `Alerts Active (${item.frequency})` : "Alerts Paused"}
                        </span>
                      </div>

                      {/* Criteria Highlights */}
                      <div className="p-3 bg-light rounded-3 mb-3 fs-13 text-muted">
                        <div className="mb-1">
                          <strong className="color-dark">Location: </strong>
                          {criteria.locality ? `${criteria.locality}, ` : ""}
                          {criteria.city || "All Cities"}
                        </div>
                        {(criteria.minPrice || criteria.maxPrice) && (
                          <div className="mb-1">
                            <strong className="color-dark">Budget Range: </strong>
                            {criteria.minPrice ? formatINR(criteria.minPrice) : "₹0"} –{" "}
                            {criteria.maxPrice ? formatINR(criteria.maxPrice) : "Unlimited"}
                          </div>
                        )}
                        {criteria.bhk && (
                          <div className="mb-1">
                            <strong className="color-dark">Configuration: </strong>
                            {Array.isArray(criteria.bhk) ? criteria.bhk.join(", ") : criteria.bhk} BHK
                          </div>
                        )}
                        {criteria.propertyType && (
                          <div>
                            <strong className="color-dark">Typology: </strong>
                            {criteria.propertyType}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="pt-3 border-top d-flex align-items-center justify-content-between flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => handleRunSearch(item)}
                        className="btn btn-dark btn-sm rounded-pill px-3 fs-13"
                      >
                        <i className="bi bi-search me-1"></i> Run Search
                      </button>

                      <div className="d-flex gap-2">
                        <button
                          type="button"
                          onClick={() => handleToggleAlert(item.id, item.alertEnabled)}
                          className="btn btn-outline-dark btn-sm rounded-pill px-3 fs-12"
                        >
                          {item.alertEnabled ? "Pause Alert" : "Resume Alert"}
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(item.id)}
                          className="btn btn-outline-danger btn-sm rounded-pill px-2 fs-12"
                          title="Delete saved search"
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white card-box border-20 text-center py-5 px-4">
            <div className="py-5" style={{ maxWidth: "500px", margin: "0 auto" }}>
              <i className="fa-light fa-magnifying-glass-location text-muted fs-1 mb-3 d-block"></i>
              <h4 className="font-garamond color-dark mb-15">No saved searches yet.</h4>
              <p className="fs-16 text-muted mb-30">
                Save your custom filter criteria and search preferences to quickly return to matching luxury residences and receive proactive alerts.
              </p>
              <Link href="/listing_01" className="btn-two">
                Explore Properties
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedSearchBody;
