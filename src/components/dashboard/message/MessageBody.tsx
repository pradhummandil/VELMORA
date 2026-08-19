"use client";
import { useEffect, useState } from "react";
import DashboardHeaderTwo from "@/layouts/headers/dashboard/DashboardHeaderTwo";
import Link from "next/link";
import { toast } from "react-toastify";
import { useAuth } from "@/context/AuthContext";
import { apiClient } from "@/utils/api";

interface InquiryItem {
  id: number;
  propertyId: string;
  propertyTitle: string;
  propertyLocation?: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  status: "new" | "contacted" | "in_progress" | "closed";
  createdAt: string;
}

interface ViewingItem {
  id: number;
  propertyId: string;
  propertyTitle: string;
  propertyLocation?: string;
  name: string;
  email: string;
  phone: string;
  preferredDate: string;
  preferredTime: string;
  message?: string;
  status: "requested" | "confirmed" | "rescheduled" | "completed" | "cancelled";
  createdAt: string;
}

const MessageBody = () => {
  const { user } = useAuth();
  const role = user?.role || "user";

  const [activeTab, setActiveTab] = useState<"inquiries" | "viewings">("inquiries");
  const [inquiries, setInquiries] = useState<InquiryItem[]>([]);
  const [viewings, setViewings] = useState<ViewingItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      const isOwnerOrAgent = role === "property_owner" || role === "agent" || role === "admin";

      const [inqRes, viewRes] = await Promise.all([
        isOwnerOrAgent ? apiClient.getReceivedInquiries() : apiClient.getMyInquiries(),
        isOwnerOrAgent ? apiClient.getReceivedViewings() : apiClient.getMyViewings(),
      ]);

      if (Array.isArray(inqRes.data)) {
        setInquiries(inqRes.data);
      }
      if (Array.isArray(viewRes.data)) {
        setViewings(viewRes.data);
      }
    } catch (err) {
      console.error("Failed to load inquiries and viewing requests:", err);
      toast.error("Failed to load inquiries data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [role]);

  const handleInquiryStatusChange = async (id: number, newStatus: string) => {
    try {
      await apiClient.updateInquiryStatus(id, newStatus);
      toast.success(`Inquiry status updated to ${newStatus}.`);
      setInquiries((prev) =>
        prev.map((item) => (item.id === id ? { ...item, status: newStatus as any } : item))
      );
    } catch (err) {
      toast.error("Failed to update inquiry status.");
    }
  };

  const handleViewingStatusChange = async (id: number, newStatus: string) => {
    try {
      await apiClient.updateViewingStatus(id, newStatus);
      toast.success(`Viewing request status updated to ${newStatus}.`);
      setViewings((prev) =>
        prev.map((item) => (item.id === id ? { ...item, status: newStatus as any } : item))
      );
    } catch (err) {
      toast.error("Failed to update viewing status.");
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "new":
      case "requested":
        return "bg-primary text-white";
      case "confirmed":
      case "contacted":
        return "bg-success text-white";
      case "in_progress":
      case "rescheduled":
        return "bg-warning text-dark";
      case "completed":
        return "bg-info text-dark";
      case "cancelled":
      case "closed":
        return "bg-secondary text-white";
      default:
        return "bg-dark text-white";
    }
  };

  return (
    <div className="dashboard-body">
      <div className="position-relative">
        <DashboardHeaderTwo title="Inquiries & Tours" />

        <div className="d-flex flex-wrap align-items-center justify-content-between mb-25 mt-10">
          <div>
            <h3 className="main-title m0">
              {role === "user" ? "My Inquiries & Viewing Requests" : "Client Inquiries & Tour Requests"}
            </h3>
            <p className="fs-15 text-muted m0 pt-1">
              Synchronized real-time communications for luxury residences.
            </p>
          </div>
          {role === "user" ? (
            <Link href="/listing_01" className="btn-two sm">
              Browse Residences
            </Link>
          ) : (
            <Link href="/dashboard/add-property" className="btn-two sm">
              + Add Property
            </Link>
          )}
        </div>

        {/* Tab Selection */}
        <div className="bg-white border-20 p-3 mb-25 shadow-sm">
          <ul className="nav nav-pills">
            <li className="nav-item me-2">
              <button
                className={`nav-link fw-600 fs-15 ${activeTab === "inquiries" ? "active bg-dark text-white" : "text-dark"}`}
                onClick={() => setActiveTab("inquiries")}
              >
                <i className="fa-light fa-envelope me-2"></i>
                Property Inquiries ({inquiries.length})
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link fw-600 fs-15 ${activeTab === "viewings" ? "active bg-dark text-white" : "text-dark"}`}
                onClick={() => setActiveTab("viewings")}
              >
                <i className="fa-light fa-calendar-check me-2"></i>
                Scheduled Tours ({viewings.length})
              </button>
            </li>
          </ul>
        </div>

        {loading ? (
          <div className="bg-white card-box border-20 text-center py-5 shadow-sm">
            <div className="spinner-border text-dark mb-3" role="status"></div>
            <p className="fs-16 text-muted m0">Loading records from PostgreSQL...</p>
          </div>
        ) : activeTab === "inquiries" ? (
          inquiries.length === 0 ? (
            <div className="bg-white card-box border-20 text-center py-5 px-4 shadow-sm">
              <div className="py-4" style={{ maxWidth: "500px", margin: "0 auto" }}>
                <i className="fa-light fa-envelope-open-text text-muted fs-1 mb-3 d-block"></i>
                <h4 className="font-garamond color-dark mb-15">
                  {role === "user" ? "No inquiries sent yet." : "No client inquiries received yet."}
                </h4>
                <p className="fs-16 text-muted mb-25">
                  {role === "user"
                    ? "Inquiries you submit via 'Contact Agent' on property pages will appear here."
                    : "Client requests submitted for your listings will appear here in real-time."}
                </p>
                <Link href="/listing_01" className="btn-two sm">
                  Browse Properties
                </Link>
              </div>
            </div>
          ) : (
            <div className="row g-3">
              {inquiries.map((inq) => (
                <div key={inq.id} className="col-12">
                  <div className="bg-white border-20 p-4 shadow-sm">
                    <div className="d-flex flex-wrap align-items-center justify-content-between border-bottom pb-3 mb-3">
                      <div>
                        <span className="fs-12 text-muted text-uppercase fw-bold">Property</span>
                        <h5 className="fs-18 fw-600 color-dark m0">{inq.propertyTitle}</h5>
                        {inq.propertyLocation && <span className="fs-13 text-muted">{inq.propertyLocation}</span>}
                      </div>
                      <div className="text-end mt-2 mt-sm-0">
                        <span className={`badge ${getStatusBadge(inq.status)} fs-12 px-2 py-1`}>
                          {inq.status.toUpperCase()}
                        </span>
                        <div className="fs-12 text-muted mt-1">
                          {new Date(inq.createdAt).toLocaleString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </div>
                      </div>
                    </div>

                    <div className="row mb-3">
                      <div className="col-md-4 mb-2 mb-md-0">
                        <span className="fs-12 text-muted d-block">Client Name:</span>
                        <span className="fw-600 fs-14 color-dark">{inq.name}</span>
                      </div>
                      <div className="col-md-4 mb-2 mb-md-0">
                        <span className="fs-12 text-muted d-block">Email:</span>
                        <a href={`mailto:${inq.email}`} className="fs-14 color-dark text-decoration-underline">
                          {inq.email}
                        </a>
                      </div>
                      <div className="col-md-4">
                        <span className="fs-12 text-muted d-block">Phone:</span>
                        <a href={`tel:${inq.phone}`} className="fs-14 color-dark text-decoration-underline">
                          {inq.phone}
                        </a>
                      </div>
                    </div>

                    <div className="bg-light p-3 rounded mb-3">
                      <span className="fs-12 fw-bold text-muted text-uppercase d-block mb-1">Message:</span>
                      <p className="fs-14 color-dark m0 white-space-pre-wrap">{inq.message}</p>
                    </div>

                    {(role === "property_owner" || role === "agent" || role === "admin") && (
                      <div className="d-flex align-items-center gap-2 pt-2 border-top">
                        <span className="fs-13 fw-600 text-muted me-2">Update Status:</span>
                        {["new", "contacted", "in_progress", "closed"].map((st) => (
                          <button
                            key={st}
                            type="button"
                            onClick={() => handleInquiryStatusChange(inq.id, st)}
                            className={`btn btn-sm ${inq.status === st ? "btn-dark" : "btn-outline-secondary"}`}
                          >
                            {st.replace("_", " ").toUpperCase()}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )
        ) : viewings.length === 0 ? (
          <div className="bg-white card-box border-20 text-center py-5 px-4 shadow-sm">
            <div className="py-4" style={{ maxWidth: "500px", margin: "0 auto" }}>
              <i className="fa-light fa-calendar-xmark text-muted fs-1 mb-3 d-block"></i>
              <h4 className="font-garamond color-dark mb-15">
                {role === "user" ? "No scheduled tours yet." : "No viewing requests for your residences."}
              </h4>
              <p className="fs-16 text-muted mb-25">
                {role === "user"
                  ? "When you schedule a viewing on a property page, your bookings appear here."
                  : "Private tour bookings for your properties will appear here with date and time preferences."}
              </p>
              <Link href="/listing_01" className="btn-two sm">
                Explore Residences
              </Link>
            </div>
          </div>
        ) : (
          <div className="row g-3">
            {viewings.map((view) => (
              <div key={view.id} className="col-12">
                <div className="bg-white border-20 p-4 shadow-sm">
                  <div className="d-flex flex-wrap align-items-center justify-content-between border-bottom pb-3 mb-3">
                    <div>
                      <span className="fs-12 text-muted text-uppercase fw-bold">Viewing Tour Residence</span>
                      <h5 className="fs-18 fw-600 color-dark m0">{view.propertyTitle}</h5>
                      {view.propertyLocation && <span className="fs-13 text-muted">{view.propertyLocation}</span>}
                    </div>
                    <div className="text-end mt-2 mt-sm-0">
                      <span className={`badge ${getStatusBadge(view.status)} fs-12 px-2 py-1`}>
                        {view.status.toUpperCase()}
                      </span>
                      <div className="fs-12 text-muted mt-1">
                        Requested: {new Date(view.createdAt).toLocaleDateString("en-IN")}
                      </div>
                    </div>
                  </div>

                  <div className="row mb-3 bg-light p-3 rounded">
                    <div className="col-sm-6 col-md-3 mb-2 mb-md-0">
                      <span className="fs-12 text-muted d-block">Preferred Date:</span>
                      <span className="fw-600 fs-15 color-dark">{view.preferredDate}</span>
                    </div>
                    <div className="col-sm-6 col-md-3 mb-2 mb-md-0">
                      <span className="fs-12 text-muted d-block">Preferred Time:</span>
                      <span className="fw-600 fs-15 color-dark">{view.preferredTime}</span>
                    </div>
                    <div className="col-sm-6 col-md-3 mb-2 mb-md-0">
                      <span className="fs-12 text-muted d-block">Client:</span>
                      <span className="fw-600 fs-14 color-dark">{view.name}</span>
                    </div>
                    <div className="col-sm-6 col-md-3">
                      <span className="fs-12 text-muted d-block">Contact:</span>
                      <span className="fs-13 color-dark">{view.phone}</span>
                    </div>
                  </div>

                  {view.message && (
                    <div className="mb-3">
                      <span className="fs-12 fw-bold text-muted text-uppercase d-block mb-1">Notes:</span>
                      <p className="fs-14 color-dark m0">{view.message}</p>
                    </div>
                  )}

                  <div className="d-flex flex-wrap align-items-center gap-2 pt-2 border-top">
                    <span className="fs-13 fw-600 text-muted me-2">Actions:</span>
                    {(role === "property_owner" || role === "agent" || role === "admin") ? (
                      ["requested", "confirmed", "rescheduled", "completed", "cancelled"].map((st) => (
                        <button
                          key={st}
                          type="button"
                          onClick={() => handleViewingStatusChange(view.id, st)}
                          className={`btn btn-sm ${view.status === st ? "btn-dark" : "btn-outline-secondary"}`}
                        >
                          {st.toUpperCase()}
                        </button>
                      ))
                    ) : (
                      view.status !== "cancelled" && (
                        <button
                          type="button"
                          onClick={() => handleViewingStatusChange(view.id, "cancelled")}
                          className="btn btn-sm btn-outline-danger"
                        >
                          Cancel Request
                        </button>
                      )
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageBody;
