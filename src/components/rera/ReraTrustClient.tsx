"use client";
import React, { useState } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import { apiClient } from "@/utils/api";
import { RERA_AUTHORITIES } from "@/data/reraAuthorities";

export const ReraTrustClient: React.FC = () => {
  const [reportData, setReportData] = useState({
    propertyId: "",
    reporterName: "",
    reporterEmail: "",
    issueType: "incorrect_rera_number",
    details: "",
  });
  const [submittingReport, setSubmittingReport] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredAuthorities = Object.values(RERA_AUTHORITIES).filter(
    (auth) =>
      auth.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
      auth.shortName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      auth.authorityName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleReportSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportData.propertyId || !reportData.details) {
      toast.error("Please enter the Property ID and report details.");
      return;
    }

    setSubmittingReport(true);
    try {
      await apiClient.reportReraDiscrepancy(reportData);
      toast.success(
        "Thank you. Your report has been submitted to the VELMORA Compliance Desk for authoritative review.",
        { position: "top-center" }
      );
      setReportData({
        propertyId: "",
        reporterName: "",
        reporterEmail: "",
        issueType: "incorrect_rera_number",
        details: "",
      });
    } catch {
      toast.error("Unable to submit report. Please try again later.");
    } finally {
      setSubmittingReport(false);
    }
  };

  return (
    <div className="rera-trust-center bg-pink-two pt-130 xl-pt-100 pb-120">
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
                RERA Trust & Property Verification
              </li>
            </ol>
          </nav>
        </div>

        {/* HERO BANNER */}
        <div className="bg-white border-20 p-4 p-lg-5 shadow-sm mb-40 text-center text-lg-start">
          <div className="row align-items-center g-4">
            <div className="col-lg-8">
              <span className="badge bg-dark text-white fs-12 px-3 py-2 text-uppercase mb-3">
                Authoritative Governance & Transparency
              </span>
              <h1 className="fw-700 color-dark fs-36 mb-3">
                VELMORA RERA Trust & Property Verification Center
              </h1>
              <p className="text-muted fs-16 mb-0 leading-relaxed">
                Empowering home buyers and investors with verified regulatory compliance under India&apos;s
                Real Estate (Regulation and Development) Act, 2016. Discover how VELMORA authenticates
                registration certificates, distinguishes review states, and enforces strict transparency.
              </p>
            </div>
            <div className="col-lg-4 text-center">
              <div className="p-4 rounded-4 bg-light d-inline-block border">
                <i className="bi bi-shield-check text-success" style={{ fontSize: "56px" }}></i>
                <div className="fw-700 fs-18 color-dark mt-2">Zero Fabricated Claims</div>
                <div className="text-muted fs-13">Authoritative Portal Verification Only</div>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 1: THE 4 VERIFICATION STATES */}
        <div className="bg-white border-20 p-4 p-lg-5 shadow-sm mb-40">
          <h2 className="fw-700 fs-24 color-dark mb-2">Understanding VELMORA Trust Badges</h2>
          <p className="text-muted fs-15 mb-4">
            We never convert an unverified RERA submission into a verified badge. Every listing displays its precise legal status:
          </p>

          <div className="row g-4">
            <div className="col-md-6 col-lg-3">
              <div className="p-4 rounded-4 border h-100 bg-light">
                <div className="badge bg-success text-white fs-13 px-3 py-2 mb-3">
                  <i className="bi bi-shield-check me-1"></i> ✓ RERA Verified
                </div>
                <h3 className="fw-600 fs-17 color-dark mb-2">Authoritatively Confirmed</h3>
                <p className="text-muted fs-14 mb-0">
                  The registration number has been cross-referenced with official state regulatory portals, confirming project approvals, promoter entity, and valid validity dates.
                </p>
              </div>
            </div>

            <div className="col-md-6 col-lg-3">
              <div className="p-4 rounded-4 border h-100 bg-light">
                <div className="badge bg-warning text-dark fs-13 px-3 py-2 mb-3">
                  <i className="bi bi-hourglass-split me-1"></i> RERA Verification Pending
                </div>
                <h3 className="fw-600 fs-17 color-dark mb-2">Under Admin Audit</h3>
                <p className="text-muted fs-14 mb-0">
                  Registration number was provided by the property owner or representative and is actively queued in our administrative verification review pipeline.
                </p>
              </div>
            </div>

            <div className="col-md-6 col-lg-3">
              <div className="p-4 rounded-4 border h-100 bg-light">
                <div className="badge bg-secondary text-white fs-13 px-3 py-2 mb-3">
                  <i className="bi bi-info-circle me-1"></i> RERA Exempt
                </div>
                <h3 className="fw-600 fs-17 color-dark mb-2">Statutory Exemption</h3>
                <p className="text-muted fs-14 mb-0">
                  Units/projects below the statutory threshold (e.g. plot area &lt; 500 sq.m or &lt; 8 apartments) or completed developments with an Occupancy Certificate received prior to RERA enactment.
                </p>
              </div>
            </div>

            <div className="col-md-6 col-lg-3">
              <div className="p-4 rounded-4 border h-100 bg-light">
                <div className="badge bg-secondary text-white fs-13 px-3 py-2 mb-3">
                  <i className="bi bi-dash-circle me-1"></i> RERA Not Applicable
                </div>
                <h3 className="fw-600 fs-17 color-dark mb-2">Individual Resale / Non-RERA</h3>
                <p className="text-muted fs-14 mb-0">
                  Individual resale residences, independent ancestral parcels, or rental tenancies where initial promoter registration is not legally statutory.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 2: HOW TO READ A RERA NUMBER */}
        <div className="bg-white border-20 p-4 p-lg-5 shadow-sm mb-40">
          <h2 className="fw-700 fs-24 color-dark mb-2">How to Read a RERA Registration Number</h2>
          <p className="text-muted fs-15 mb-4">
            Each state authority uses a unique alphanumeric format encoding the state jurisdiction, district, and project sequence:
          </p>

          <div className="row g-4">
            <div className="col-lg-6">
              <div className="p-4 rounded-4 border bg-light h-100">
                <div className="fw-600 color-dark fs-16 mb-2">Maharashtra (MahaRERA) Anatomy</div>
                <div className="p-3 bg-white rounded-3 border mb-3 font-monospace fs-18 text-warning fw-700">
                  P518 000 12345
                </div>
                <ul className="style-none fs-14 text-muted m-0">
                  <li className="mb-2"><strong className="text-dark">P5:</strong> Prefix denoting Maharashtra state project registration.</li>
                  <li className="mb-2"><strong className="text-dark">18:</strong> District census code (e.g. 18 for Mumbai Suburban, 19 for Mumbai City, 20 for Pune).</li>
                  <li><strong className="text-dark">00012345:</strong> Unique project issuance sequence registered in the state database.</li>
                </ul>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="p-4 rounded-4 border bg-light h-100">
                <div className="fw-600 color-dark fs-16 mb-2">Karnataka & Haryana Formats</div>
                <div className="p-3 bg-white rounded-3 border mb-3 font-monospace fs-18 text-warning fw-700">
                  PRM/KA/RERA/1251/310/PR/...
                </div>
                <ul className="style-none fs-14 text-muted m-0">
                  <li className="mb-2"><strong className="text-dark">KA / HARERA:</strong> Identifies State/District Authority branch (e.g. Gurugram or Panchkula).</li>
                  <li className="mb-2"><strong className="text-dark">Taluk / Category:</strong> Encodes commercial vs residential land layout categorization.</li>
                  <li><strong className="text-dark">Year & Sequence:</strong> Official timestamped registration certificate index.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 3: OFFICIAL STATE REGULATORY AUTHORITY DIRECTORY */}
        <div className="bg-white border-20 p-4 p-lg-5 shadow-sm mb-40">
          <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-4">
            <div>
              <h2 className="fw-700 fs-24 color-dark mb-1">State Regulatory Authority Directory</h2>
              <p className="text-muted fs-14 mb-0">Official government websites and public project verification registries.</p>
            </div>
            <div style={{ maxWidth: "280px", width: "100%" }}>
              <input
                type="text"
                placeholder="Search state (e.g. Maharashtra)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-control form-control-sm rounded-pill px-3 py-2 fs-13"
              />
            </div>
          </div>

          <div className="row g-3">
            {filteredAuthorities.map((auth) => (
              <div key={auth.code} className="col-md-6 col-lg-4">
                <div className="p-3 border rounded-3 h-100 d-flex flex-column justify-content-between bg-light">
                  <div>
                    <div className="d-flex align-items-center justify-content-between mb-2">
                      <span className="badge bg-dark text-white fs-11 px-2 py-1">{auth.state}</span>
                      <span className="fw-600 text-warning fs-13">{auth.shortName}</span>
                    </div>
                    <div className="fw-600 color-dark fs-14 mb-2">{auth.authorityName}</div>
                    <p className="text-muted fs-12 mb-3">{auth.numberPatternDescription}</p>
                  </div>

                  <div className="d-flex gap-2">
                    <a
                      href={auth.officialPortal}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-sm btn-outline-dark rounded-pill px-3 fs-12 w-100 text-center"
                    >
                      Official Portal <i className="bi bi-box-arrow-up-right ms-1"></i>
                    </a>
                    {auth.projectSearchUrl && (
                      <a
                        href={auth.projectSearchUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-sm btn-dark rounded-pill px-3 fs-12 w-100 text-center text-truncate"
                      >
                        Search Registry
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 4: REPORT INCORRECT INFORMATION FORM */}
        <div className="bg-white border-20 p-4 p-lg-5 shadow-sm mb-40">
          <div className="row g-4 align-items-center">
            <div className="col-lg-5">
              <span className="badge bg-warning text-dark fs-12 px-3 py-2 text-uppercase mb-2">
                Public Integrity & Compliance
              </span>
              <h2 className="fw-700 fs-24 color-dark mb-3">Report a Discrepancy or Inaccuracy</h2>
              <p className="text-muted fs-15 leading-relaxed mb-4">
                VELMORA takes real estate compliance with utmost seriousness. If you notice an incorrect RERA registration number, misstated completion date, or unverified marketing claim on any listing, please notify our Compliance Desk for immediate re-audit.
              </p>
              <div className="p-3 bg-light rounded-3 border">
                <div className="d-flex align-items-center gap-2 text-dark fs-14 fw-600 mb-1">
                  <i className="bi bi-shield-lock text-success fs-16"></i> Confidential Review
                </div>
                <div className="text-muted fs-13">
                  All compliance reports are audited against state records within 24–48 business hours.
                </div>
              </div>
            </div>

            <div className="col-lg-7">
              <form onSubmit={handleReportSubmit} className="p-4 rounded-4 bg-light border">
                <div className="row g-3">
                  <div className="col-sm-6">
                    <label className="form-label fs-13 text-muted">Property ID / URL *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 1 or /properties/1"
                      value={reportData.propertyId}
                      onChange={(e) => setReportData({ ...reportData, propertyId: e.target.value })}
                      className="form-control"
                    />
                  </div>

                  <div className="col-sm-6">
                    <label className="form-label fs-13 text-muted">Issue Type *</label>
                    <select
                      value={reportData.issueType}
                      onChange={(e) => setReportData({ ...reportData, issueType: e.target.value })}
                      className="form-select"
                    >
                      <option value="incorrect_rera_number">Incorrect RERA Number</option>
                      <option value="fake_registration">Unregistered / Fake Project Claim</option>
                      <option value="developer_misrepresentation">Developer / Project Misrepresentation</option>
                      <option value="possession_date_discrepancy">Possession Date Discrepancy</option>
                      <option value="other">Other Compliance Concern</option>
                    </select>
                  </div>

                  <div className="col-sm-6">
                    <label className="form-label fs-13 text-muted">Your Name (Optional)</label>
                    <input
                      type="text"
                      placeholder="Your full name"
                      value={reportData.reporterName}
                      onChange={(e) => setReportData({ ...reportData, reporterName: e.target.value })}
                      className="form-control"
                    />
                  </div>

                  <div className="col-sm-6">
                    <label className="form-label fs-13 text-muted">Your Email (Optional)</label>
                    <input
                      type="email"
                      placeholder="name@domain.com"
                      value={reportData.reporterEmail}
                      onChange={(e) => setReportData({ ...reportData, reporterEmail: e.target.value })}
                      className="form-control"
                    />
                  </div>

                  <div className="col-12">
                    <label className="form-label fs-13 text-muted">Discrepancy Details *</label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Describe the discrepancy with official source reference if available..."
                      value={reportData.details}
                      onChange={(e) => setReportData({ ...reportData, details: e.target.value })}
                      className="form-control"
                    ></textarea>
                  </div>

                  <div className="col-12 text-end">
                    <button
                      type="submit"
                      disabled={submittingReport}
                      className="btn btn-dark rounded-pill px-4 py-2 fs-14"
                    >
                      {submittingReport ? "Submitting Report..." : "Submit Compliance Report"}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReraTrustClient;
