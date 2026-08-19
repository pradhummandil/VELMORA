"use client";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useAuth } from "@/context/AuthContext";
import { apiClient } from "@/utils/api";

interface ContactAgentModalProps {
  isOpen: boolean;
  onClose: () => void;
  propertyTitle?: string;
  propertyLocation?: string;
  propertyId?: string | number;
  advisorName?: string;
}

const ContactAgentModal = ({
  isOpen,
  onClose,
  propertyTitle = "The Meridian Residences",
  propertyLocation = "Worli, Mumbai",
  propertyId = "1",
  advisorName = "Aarav Mehta",
}: ContactAgentModalProps) => {
  const { user, isAuthenticated } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: user.name || (user.firstName ? `${user.firstName} ${user.lastName || ""}`.trim() : ""),
        email: user.email || "",
        phone: user.phoneNumber || prev.phone,
        message: prev.message || `I am interested in ${propertyTitle}, ${propertyLocation}. Please connect me with advisor ${advisorName}.`,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        message: prev.message || `I am interested in ${propertyTitle}, ${propertyLocation}.`,
      }));
    }
  }, [user, propertyTitle, propertyLocation, advisorName]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAuthenticated) {
      toast.info("Please log in to contact the property advisor.", { position: "top-center" });
      const loginModalBtn = document.querySelector('[data-bs-target="#loginModal"]') as HTMLElement;
      if (loginModalBtn) loginModalBtn.click();
      return;
    }

    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim() || !formData.message.trim()) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    try {
      const res = await apiClient.createInquiry({
        propertyId: String(propertyId),
        propertyTitle,
        propertyLocation,
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        message: formData.message.trim(),
      });

      if (res.data?.emailWarning) {
        toast.info(res.data.emailWarning, { position: "top-center" });
      } else {
        toast.success("Your inquiry has been sent to the property advisor!", { position: "top-center" });
      }

      onClose();
    } catch (err: any) {
      toast.error(err.response?.data?.error || "We couldn't send your inquiry. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="modal fade show d-block"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.65)", zIndex: 1060 }}
      tabIndex={-1}
      role="dialog"
    >
      <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: "560px" }}>
        <div className="modal-content border-20 p-4 bg-white shadow-lg">
          <div className="d-flex align-items-center justify-content-between border-bottom pb-3 mb-3">
            <div>
              <span className="fs-12 text-uppercase fw-600 text-muted" style={{ letterSpacing: "1.5px" }}>
                VELMORA ADVISORY
              </span>
              <h4 className="font-garamond color-dark m0 fs-22">Contact Property Advisor</h4>
            </div>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
              aria-label="Close"
            ></button>
          </div>

          {/* Contextual Property Card */}
          <div className="bg-light p-3 rounded mb-3 border">
            <div className="row g-2">
              <div className="col-12">
                <span className="fs-11 text-muted text-uppercase fw-bold">Residence</span>
                <div className="fw-600 fs-15 color-dark">{propertyTitle}</div>
                <div className="fs-13 text-muted">{propertyLocation}</div>
              </div>
              <div className="col-12 mt-1">
                <span className="fs-11 text-muted text-uppercase fw-bold">Assigned Advisor: </span>
                <span className="fw-600 fs-13 color-dark">{advisorName}</span>
              </div>
            </div>
          </div>

          {!isAuthenticated && (
            <div className="alert alert-warning py-2 px-3 fs-13 mb-3 d-flex align-items-center justify-content-between">
              <span>Authentication required to connect with advisors.</span>
              <button
                type="button"
                className="btn btn-sm btn-dark ms-2"
                onClick={() => {
                  onClose();
                  const loginModalBtn = document.querySelector('[data-bs-target="#loginModal"]') as HTMLElement;
                  if (loginModalBtn) loginModalBtn.click();
                }}
              >
                Log In
              </button>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-12">
                <label className="fs-13 fw-500 color-dark mb-1">Your Full Name*</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Vikram Singhania"
                  required
                  className="w-100 p-2 border rounded fs-14"
                />
              </div>

              <div className="col-sm-6">
                <label className="fs-13 fw-500 color-dark mb-1">Email Address*</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="your.email@domain.com"
                  required
                  className="w-100 p-2 border rounded fs-14"
                />
              </div>

              <div className="col-sm-6">
                <label className="fs-13 fw-500 color-dark mb-1">Phone Number*</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 98200 12345"
                  required
                  className="w-100 p-2 border rounded fs-14"
                />
              </div>

              <div className="col-12">
                <label className="fs-13 fw-500 color-dark mb-1">Message / Notes*</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={3}
                  placeholder="Specify your inquiry, preferred callback time, or questions regarding the residence..."
                  required
                  className="w-100 p-2 border rounded fs-14"
                />
              </div>
            </div>

            <div className="d-flex align-items-center justify-content-end gap-2 mt-4 pt-2 border-top">
              <button type="button" onClick={onClose} className="btn btn-outline-secondary btn-sm px-3">
                Cancel
              </button>
              <button type="submit" disabled={loading} className="btn-two sm">
                {loading ? "Sending Inquiry..." : "Submit Inquiry"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactAgentModal;
