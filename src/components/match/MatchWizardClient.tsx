"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";
import { MatchCriteria, ScoredPropertyMatch } from "@/types/match";
import { apiClient } from "@/utils/api";
import { useAuth } from "@/context/AuthContext";

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

export const MatchWizardClient: React.FC = () => {
  const { isAuthenticated } = useAuth();

  // Wizard Step (1 through 6 = Inputs, 7 = Results)
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [matches, setMatches] = useState<ScoredPropertyMatch[]>([]);
  const [hasCalculated, setHasCalculated] = useState<boolean>(false);

  // Criteria State
  const [criteria, setCriteria] = useState<MatchCriteria>({
    goal: "buy",
    minBudget: 15000000, // ₹1.5 Cr
    maxBudget: 60000000, // ₹6.0 Cr
    city: "Mumbai",
    preferredLocalities: ["Worli", "Bandra"],
    bhk: ["3", "4"],
    propertyTypes: ["Apartment", "Penthouse"],
    workplace: {
      address: "",
    },
    maxCommuteMinutes: 35,
    commuteMode: "driving",
    priorities: {
      connectivity: 4,
      schools: 3,
      healthcare: 4,
      lifestyle: 5,
      investment: 4,
    },
  });

  const [localityInput, setLocalityInput] = useState("");

  const handleAddLocality = () => {
    if (localityInput.trim().length > 0) {
      const current = criteria.preferredLocalities || [];
      if (!current.includes(localityInput.trim())) {
        setCriteria({
          ...criteria,
          preferredLocalities: [...current, localityInput.trim()],
        });
      }
      setLocalityInput("");
    }
  };

  const handleRemoveLocality = (name: string) => {
    const current = criteria.preferredLocalities || [];
    setCriteria({
      ...criteria,
      preferredLocalities: current.filter((l) => l !== name),
    });
  };

  const handleToggleBhk = (val: string) => {
    const current = Array.isArray(criteria.bhk) ? criteria.bhk.map(String) : criteria.bhk ? [String(criteria.bhk)] : [];
    if (current.includes(val)) {
      setCriteria({ ...criteria, bhk: current.filter((b) => b !== val) });
    } else {
      setCriteria({ ...criteria, bhk: [...current, val] });
    }
  };

  const handleTogglePropertyType = (val: string) => {
    const current = criteria.propertyTypes || [];
    if (current.includes(val)) {
      setCriteria({ ...criteria, propertyTypes: current.filter((t) => t !== val) });
    } else {
      setCriteria({ ...criteria, propertyTypes: [...current, val] });
    }
  };

  const handleCalculateMatch = async () => {
    setLoading(true);
    try {
      const res = await apiClient.calculateMatch(criteria);
      if (res.data?.matches) {
        setMatches(res.data.matches);
        setHasCalculated(true);
        setCurrentStep(7);
      } else {
        toast.info("No matching residences found. Try adjusting your parameters.");
      }
    } catch {
      toast.error("Unable to calculate match right now. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSavePreferences = async () => {
    if (!isAuthenticated) {
      toast.info("Please log in to save match preferences to your profile.", { position: "top-center" });
      const loginBtn = document.querySelector('[data-bs-target="#loginModal"]') as HTMLElement;
      if (loginBtn) loginBtn.click();
      return;
    }

    try {
      await apiClient.createInquiry({
        message: `Saved Match Criteria: ${criteria.city} | ${criteria.goal} | Budget: ${formatINR(criteria.minBudget)} - ${formatINR(criteria.maxBudget)}`,
        propertyTitle: "VELMORA Match Preferences",
      });
      toast.success("Match preferences saved to your account!", { position: "top-center" });
    } catch {
      toast.error("Unable to save preferences.");
    }
  };

  return (
    <div className="match-wizard-page bg-pink-two pt-130 xl-pt-100 pb-120">
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
                VELMORA Match Intelligence
              </li>
            </ol>
          </nav>
        </div>

        {/* TOP HERO */}
        <div className="bg-white border-20 p-4 p-lg-5 shadow-sm mb-40 text-center">
          <span className="badge bg-warning text-dark fs-12 px-3 py-2 text-uppercase mb-2 fw-600">
            Deterministic Decision Engine
          </span>
          <h1 className="fw-700 color-dark fs-36 mb-2">VELMORA Property Match</h1>
          <p className="text-muted fs-16 mb-0 mx-auto" style={{ maxWidth: "680px" }}>
            Answer a few questions about your budget, spatial layout, daily commute, and living priorities.
            Our deterministic intelligence engine will rank residences with transparent match scoring and trade-off analysis.
          </p>
        </div>

        {/* STEP PROGRESS BAR */}
        {currentStep <= 6 && (
          <div className="bg-white border-20 p-4 shadow-sm mb-40">
            <div className="d-flex align-items-center justify-content-between mb-2">
              <span className="fw-600 fs-14 color-dark">Step {currentStep} of 6</span>
              <span className="text-muted fs-13">
                {currentStep === 1 && "Ownership Goal"}
                {currentStep === 2 && "Capital Budget"}
                {currentStep === 3 && "Location & Micro-Markets"}
                {currentStep === 4 && "Spatial Configuration"}
                {currentStep === 5 && "Lifestyle Priorities"}
                {currentStep === 6 && "Daily Commute"}
              </span>
            </div>
            <div className="progress" style={{ height: "8px" }}>
              <div
                className="progress-bar bg-warning"
                role="progressbar"
                style={{ width: `${(currentStep / 6) * 100}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* STEP 1: GOAL */}
        {currentStep === 1 && (
          <div className="bg-white border-20 p-4 p-lg-5 shadow-sm mb-40" style={{ maxWidth: "800px", margin: "0 auto" }}>
            <h2 className="fw-700 fs-24 color-dark mb-2">What is your primary property goal?</h2>
            <p className="text-muted fs-15 mb-4">Select the intention behind your next real estate transaction.</p>

            <div className="row g-3">
              {[
                { key: "buy", label: "Buy a Luxury Residence", desc: "For primary or secondary homeownership" },
                { key: "rent", label: "Lease / Rent", desc: "Long-term curated luxury tenancy" },
                { key: "invest", label: "Capital Investment", desc: "High rental yields and capital appreciation" },
                { key: "commercial", label: "Commercial / Office", desc: "Prime commercial and retail assets" },
              ].map((item) => (
                <div key={item.key} className="col-sm-6">
                  <div
                    onClick={() => setCriteria({ ...criteria, goal: item.key })}
                    className={`p-4 rounded-4 border cursor-pointer h-100 transition-all ${
                      criteria.goal === item.key ? "border-warning bg-light shadow-sm" : "bg-white"
                    }`}
                    style={{ cursor: "pointer" }}
                  >
                    <div className="d-flex align-items-center justify-content-between mb-2">
                      <span className="fw-600 color-dark fs-17">{item.label}</span>
                      {criteria.goal === item.key && <i className="bi bi-check-circle-fill text-warning fs-18"></i>}
                    </div>
                    <p className="text-muted fs-13 mb-0">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="d-flex justify-content-end mt-4">
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="btn btn-dark rounded-pill px-4 py-2 fs-14"
              >
                Continue to Budget <i className="bi bi-arrow-right ms-1"></i>
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: BUDGET */}
        {currentStep === 2 && (
          <div className="bg-white border-20 p-4 p-lg-5 shadow-sm mb-40" style={{ maxWidth: "800px", margin: "0 auto" }}>
            <h2 className="fw-700 fs-24 color-dark mb-2">Define your comfortable budget range</h2>
            <p className="text-muted fs-15 mb-4">Specify the minimum and maximum capital allocation in INR.</p>

            <div className="row g-4 mb-4">
              <div className="col-sm-6">
                <label className="form-label fs-13 text-muted">Minimum Budget (₹)</label>
                <input
                  type="number"
                  step="500000"
                  value={criteria.minBudget || ""}
                  onChange={(e) => setCriteria({ ...criteria, minBudget: Number(e.target.value) })}
                  className="form-control form-control-lg fs-16"
                />
                <div className="text-warning fw-600 fs-15 mt-1">{formatINR(criteria.minBudget)}</div>
              </div>

              <div className="col-sm-6">
                <label className="form-label fs-13 text-muted">Maximum Budget (₹)</label>
                <input
                  type="number"
                  step="500000"
                  value={criteria.maxBudget || ""}
                  onChange={(e) => setCriteria({ ...criteria, maxBudget: Number(e.target.value) })}
                  className="form-control form-control-lg fs-16"
                />
                <div className="text-warning fw-600 fs-15 mt-1">{formatINR(criteria.maxBudget)}</div>
              </div>
            </div>

            <div className="d-flex justify-content-between mt-4">
              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className="btn btn-outline-dark rounded-pill px-4 py-2 fs-14"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => setCurrentStep(3)}
                className="btn btn-dark rounded-pill px-4 py-2 fs-14"
              >
                Continue to Location <i className="bi bi-arrow-right ms-1"></i>
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: LOCATION */}
        {currentStep === 3 && (
          <div className="bg-white border-20 p-4 p-lg-5 shadow-sm mb-40" style={{ maxWidth: "800px", margin: "0 auto" }}>
            <h2 className="fw-700 fs-24 color-dark mb-2">Where would you like to live?</h2>
            <p className="text-muted fs-15 mb-4">Choose your target city and preferred micro-markets.</p>

            <div className="mb-4">
              <label className="form-label fs-13 text-muted">City</label>
              <select
                value={criteria.city}
                onChange={(e) => setCriteria({ ...criteria, city: e.target.value })}
                className="form-select form-select-lg fs-16"
              >
                <option value="Mumbai">Mumbai</option>
                <option value="Pune">Pune</option>
                <option value="Bengaluru">Bengaluru</option>
                <option value="Delhi NCR">Delhi NCR</option>
                <option value="Hyderabad">Hyderabad</option>
                <option value="Goa">Goa</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="form-label fs-13 text-muted">Preferred Micro-Markets / Localities</label>
              <div className="input-group mb-2">
                <input
                  type="text"
                  placeholder="e.g. Worli, Bandra, Indiranagar, Koregaon Park..."
                  value={localityInput}
                  onChange={(e) => setLocalityInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddLocality())}
                  className="form-control"
                />
                <button type="button" onClick={handleAddLocality} className="btn btn-dark">
                  Add Locality
                </button>
              </div>

              <div className="d-flex flex-wrap gap-2 mt-2">
                {(criteria.preferredLocalities || []).map((loc) => (
                  <span key={loc} className="badge bg-light text-dark border fs-13 px-3 py-2 rounded-pill">
                    {loc}
                    <button
                      type="button"
                      onClick={() => handleRemoveLocality(loc)}
                      className="border-0 bg-transparent ms-2 text-muted"
                    >
                      ✕
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div className="d-flex justify-content-between mt-4">
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="btn btn-outline-dark rounded-pill px-4 py-2 fs-14"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => setCurrentStep(4)}
                className="btn btn-dark rounded-pill px-4 py-2 fs-14"
              >
                Continue to Configuration <i className="bi bi-arrow-right ms-1"></i>
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: CONFIGURATION & TYPE */}
        {currentStep === 4 && (
          <div className="bg-white border-20 p-4 p-lg-5 shadow-sm mb-40" style={{ maxWidth: "800px", margin: "0 auto" }}>
            <h2 className="fw-700 fs-24 color-dark mb-2">Bedrooms & Property Type</h2>
            <p className="text-muted fs-15 mb-4">Select all bedroom configurations and typologies you are open to.</p>

            <div className="mb-4">
              <label className="form-label fs-13 text-muted d-block mb-2">Bedroom Layout (BHK)</label>
              <div className="d-flex flex-wrap gap-2">
                {["1", "2", "3", "4", "5+"].map((bhk) => {
                  const isSelected = (Array.isArray(criteria.bhk) ? criteria.bhk : [criteria.bhk]).map(String).includes(bhk);
                  return (
                    <button
                      key={bhk}
                      type="button"
                      onClick={() => handleToggleBhk(bhk)}
                      className={`btn rounded-pill px-4 py-2 fs-14 ${
                        isSelected ? "btn-dark" : "btn-outline-dark"
                      }`}
                    >
                      {bhk} BHK
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mb-4">
              <label className="form-label fs-13 text-muted d-block mb-2">Property Typology</label>
              <div className="d-flex flex-wrap gap-2">
                {["Apartment", "Penthouse", "Villa", "Duplex", "Builder Floor", "Independent House"].map((type) => {
                  const isSelected = (criteria.propertyTypes || []).includes(type);
                  return (
                    <button
                      key={type}
                      type="button"
                      onClick={() => handleTogglePropertyType(type)}
                      className={`btn rounded-pill px-3 py-2 fs-14 ${
                        isSelected ? "btn-dark" : "btn-outline-dark"
                      }`}
                    >
                      {type}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="d-flex justify-content-between mt-4">
              <button
                type="button"
                onClick={() => setCurrentStep(3)}
                className="btn btn-outline-dark rounded-pill px-4 py-2 fs-14"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => setCurrentStep(5)}
                className="btn btn-dark rounded-pill px-4 py-2 fs-14"
              >
                Continue to Priorities <i className="bi bi-arrow-right ms-1"></i>
              </button>
            </div>
          </div>
        )}

        {/* STEP 5: LIFESTYLE PRIORITIES */}
        {currentStep === 5 && (
          <div className="bg-white border-20 p-4 p-lg-5 shadow-sm mb-40" style={{ maxWidth: "800px", margin: "0 auto" }}>
            <h2 className="fw-700 fs-24 color-dark mb-2">Lifestyle Priorities</h2>
            <p className="text-muted fs-15 mb-4">Rate how important each dimension is for you (1 = Low, 5 = Critical).</p>

            <div className="space-y-4">
              {[
                { key: "connectivity", label: "Transit & Highway Connectivity", desc: "Proximity to expressways, metro, and arterial links" },
                { key: "schools", label: "Top Schools & Education", desc: "Proximity to reputed international schools" },
                { key: "healthcare", label: "Healthcare & Hospitals", desc: "Quick access to multi-specialty hospitals" },
                { key: "lifestyle", label: "Dining, Culture & Retail", desc: "Fine dining, clubs, and luxury retail hubs" },
                { key: "investment", label: "Appreciation & Rental Demand", desc: "High micro-market liquidity and yield potential" },
              ].map((item) => (
                <div key={item.key} className="p-3 border rounded-3 bg-light mb-3">
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <div>
                      <strong className="color-dark fs-15">{item.label}</strong>
                      <div className="text-muted fs-12">{item.desc}</div>
                    </div>
                    <span className="badge bg-warning text-dark fs-14 px-3 py-1 fw-700">
                      {(criteria.priorities as any)?.[item.key] || 3} / 5
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={(criteria.priorities as any)?.[item.key] || 3}
                    onChange={(e) =>
                      setCriteria({
                        ...criteria,
                        priorities: {
                          ...criteria.priorities,
                          [item.key]: Number(e.target.value),
                        },
                      })
                    }
                    className="form-range mt-2"
                  />
                </div>
              ))}
            </div>

            <div className="d-flex justify-content-between mt-4">
              <button
                type="button"
                onClick={() => setCurrentStep(4)}
                className="btn btn-outline-dark rounded-pill px-4 py-2 fs-14"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => setCurrentStep(6)}
                className="btn btn-dark rounded-pill px-4 py-2 fs-14"
              >
                Continue to Commute <i className="bi bi-arrow-right ms-1"></i>
              </button>
            </div>
          </div>
        )}

        {/* STEP 6: COMMUTE */}
        {currentStep === 6 && (
          <div className="bg-white border-20 p-4 p-lg-5 shadow-sm mb-40" style={{ maxWidth: "800px", margin: "0 auto" }}>
            <h2 className="fw-700 fs-24 color-dark mb-2">Daily Commute Destination (Optional)</h2>
            <p className="text-muted fs-15 mb-4">
              Add your workplace or primary hub to calculate exact door-to-door transit times.
            </p>

            <div className="mb-4">
              <label className="form-label fs-13 text-muted">Destination / Workplace Address</label>
              <input
                type="text"
                placeholder="e.g. Bandra Kurla Complex, Cyber City Gurugram, Manyata Tech Park..."
                value={criteria.workplace?.address || ""}
                onChange={(e) =>
                  setCriteria({
                    ...criteria,
                    workplace: { ...criteria.workplace, address: e.target.value },
                  })
                }
                className="form-control form-control-lg fs-16"
              />
            </div>

            <div className="row g-3 mb-4">
              <div className="col-sm-6">
                <label className="form-label fs-13 text-muted">Maximum Acceptable Commute</label>
                <select
                  value={criteria.maxCommuteMinutes}
                  onChange={(e) => setCriteria({ ...criteria, maxCommuteMinutes: Number(e.target.value) })}
                  className="form-select"
                >
                  <option value={20}>20 minutes or less</option>
                  <option value={30}>30 minutes</option>
                  <option value={45}>45 minutes</option>
                  <option value={60}>60 minutes</option>
                </select>
              </div>

              <div className="col-sm-6">
                <label className="form-label fs-13 text-muted">Travel Mode</label>
                <select
                  value={criteria.commuteMode}
                  onChange={(e) => setCriteria({ ...criteria, commuteMode: e.target.value as any })}
                  className="form-select"
                >
                  <option value="driving">Driving (Car / Taxi)</option>
                  <option value="transit">Public Transit (Metro / Rail)</option>
                  <option value="walking">Walking</option>
                </select>
              </div>
            </div>

            <div className="d-flex justify-content-between align-items-center mt-4 flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setCurrentStep(5)}
                className="btn btn-outline-dark rounded-pill px-4 py-2 fs-14"
              >
                Back
              </button>

              <div className="d-flex gap-2">
                <button
                  type="button"
                  onClick={handleCalculateMatch}
                  disabled={loading}
                  className="btn btn-outline-secondary rounded-pill px-3 py-2 fs-14"
                >
                  Skip Commute
                </button>
                <button
                  type="button"
                  onClick={handleCalculateMatch}
                  disabled={loading}
                  className="btn btn-warning text-dark fw-600 rounded-pill px-4 py-2 fs-14"
                >
                  {loading ? "Calculating Matches..." : "Calculate Matches"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STEP 7: MATCH RESULTS VIEW */}
        {currentStep === 7 && (
          <div>
            <div className="d-flex align-items-center justify-content-between mb-4 flex-wrap gap-2">
              <div>
                <h2 className="fw-700 fs-28 color-dark mb-1">
                  Your Curated Matches ({matches.length} Residences)
                </h2>
                <p className="text-muted fs-14 mb-0">
                  Scored deterministically based on your budget, configuration, micro-market, and lifestyle preferences.
                </p>
              </div>

              <div className="d-flex gap-2">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="btn btn-outline-dark rounded-pill px-4 py-2 fs-14"
                >
                  <i className="bi bi-sliders me-1"></i> Edit Preferences
                </button>
                <button
                  type="button"
                  onClick={handleSavePreferences}
                  className="btn btn-dark rounded-pill px-4 py-2 fs-14"
                >
                  <i className="bi bi-bookmark me-1"></i> Save Preferences
                </button>
              </div>
            </div>

            {matches.length > 0 ? (
              <div className="row g-4">
                {matches.map((item, idx) => {
                  const p = item.property;
                  const thumbImg = (p.images && p.images[0]) || "/assets/images/listing/img_01.jpg";

                  return (
                    <div key={p.id || idx} className="col-lg-6">
                      <div className="bg-white border-20 p-4 shadow-sm h-100 d-flex flex-column justify-content-between">
                        <div>
                          {/* Card Header: Score Badge & Category Badge */}
                          <div className="d-flex align-items-center justify-content-between mb-3">
                            <div className="d-flex align-items-center gap-2">
                              <div className="badge bg-warning text-dark fs-18 px-3 py-2 rounded-4 fw-700">
                                {item.overallScore}% Match
                              </div>
                              {item.badge && (
                                <span className="badge bg-dark text-white fs-12 px-2 py-1">
                                  {item.badge}
                                </span>
                              )}
                            </div>
                            <span className="badge bg-light text-dark border fs-12 px-2 py-1">
                              {p.listingPurpose || "Buy"} • {p.propertyType}
                            </span>
                          </div>

                          {/* Property Details Snapshot */}
                          <div className="row g-3 align-items-center mb-3">
                            <div className="col-4">
                              <div className="position-relative rounded-3 overflow-hidden" style={{ height: "110px" }}>
                                <Image
                                  src={thumbImg}
                                  alt={p.title}
                                  fill
                                  sizes="160px"
                                  className="object-fit-cover"
                                />
                              </div>
                            </div>
                            <div className="col-8">
                              <h3 className="fw-600 color-dark fs-18 text-truncate mb-1">{p.title}</h3>
                              <div className="text-muted fs-13 text-truncate mb-2">
                                <i className="bi bi-geo-alt me-1"></i>
                                {p.locality || p.city}
                              </div>
                              <div className="fw-700 text-warning fs-20">{formatINR(p.price)}</div>
                            </div>
                          </div>

                          {/* Transparent Score Breakdown */}
                          <div className="p-3 bg-light rounded-3 mb-3">
                            <div className="fw-600 fs-13 color-dark mb-2">Score Breakdown</div>
                            <div className="row g-2 fs-12 text-muted">
                              <div className="col-4">
                                Budget: <strong className="text-dark">{item.scoreBreakdown.budget}/100</strong>
                              </div>
                              <div className="col-4">
                                Location: <strong className="text-dark">{item.scoreBreakdown.location}/100</strong>
                              </div>
                              <div className="col-4">
                                Layout: <strong className="text-dark">{item.scoreBreakdown.property}/100</strong>
                              </div>
                              <div className="col-4">
                                Lifestyle: <strong className="text-dark">{item.scoreBreakdown.lifestyle}/100</strong>
                              </div>
                              <div className="col-4">
                                Commute:{" "}
                                <strong className="text-dark">
                                  {item.scoreBreakdown.commute !== null ? `${item.scoreBreakdown.commute}/100` : "N/A"}
                                </strong>
                              </div>
                              <div className="col-4">
                                Trust: <strong className="text-dark">{item.scoreBreakdown.trust}/100</strong>
                              </div>
                            </div>
                          </div>

                          {/* Why It Matches */}
                          {item.whyItMatches && item.whyItMatches.length > 0 && (
                            <div className="mb-3">
                              <div className="fw-600 fs-13 text-success mb-1">
                                <i className="bi bi-check2-circle me-1"></i> Why It Matches:
                              </div>
                              <ul className="style-none fs-13 text-muted m-0 ps-2">
                                {item.whyItMatches.map((why, wIdx) => (
                                  <li key={wIdx} className="mb-1">
                                    • {why}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* Trade-offs */}
                          {item.tradeoffs && item.tradeoffs.length > 0 && (
                            <div className="mb-3">
                              <div className="fw-600 fs-13 text-danger mb-1">
                                <i className="bi bi-exclamation-circle me-1"></i> Trade-offs:
                              </div>
                              <ul className="style-none fs-13 text-muted m-0 ps-2">
                                {item.tradeoffs.map((trade, tIdx) => (
                                  <li key={tIdx} className="mb-1">
                                    • {trade}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>

                        {/* Card Action */}
                        <div className="pt-3 border-top d-flex justify-content-between align-items-center">
                          <div className="fs-13 text-muted">
                            {p.bedrooms && <span>{p.bedrooms} BHK • </span>}
                            {p.area && <span>{p.area.toLocaleString("en-IN")} sq.ft</span>}
                          </div>
                          <Link href={`/properties/${p.id}`} className="btn btn-dark btn-sm rounded-pill px-4">
                            View Residence
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="bg-white border-20 p-5 text-center shadow-sm">
                <i className="bi bi-search text-muted fs-1 mb-2"></i>
                <h5 className="fw-600">No properties closely matched your exact parameters.</h5>
                <p className="text-muted fs-14 mb-4">
                  Try broadening your budget range or selecting additional micro-markets.
                </p>
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="btn btn-dark rounded-pill px-4 py-2 fs-14"
                >
                  Adjust Preferences
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MatchWizardClient;
