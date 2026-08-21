"use client";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { apiClient } from "@/utils/api";
import { useAuth } from "@/context/AuthContext";

interface SaveSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  criteria: Record<string, any>;
  defaultName?: string;
}

export const SaveSearchModal: React.FC<SaveSearchModalProps> = ({
  isOpen,
  onClose,
  criteria,
  defaultName,
}) => {
  const { isAuthenticated } = useAuth();
  const [name, setName] = useState(defaultName || "My Luxury Search");
  const [alertEnabled, setAlertEnabled] = useState(true);
  const [frequency, setFrequency] = useState<"instant" | "daily" | "weekly">("daily");
  const [saving, setSaving] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAuthenticated) {
      toast.info("Please log in to save searches and receive alerts.");
      const loginBtn = document.querySelector('[data-bs-target="#loginModal"]') as HTMLElement;
      if (loginBtn) loginBtn.click();
      onClose();
      return;
    }

    if (!name.trim()) {
      toast.error("Please enter a name for this saved search.");
      return;
    }

    setSaving(true);
    try {
      await apiClient.createSavedSearch({
        name: name.trim(),
        criteria,
        alertEnabled,
        frequency,
      });
      toast.success("Search criteria and alerts saved successfully!", { position: "top-center" });
      onClose();
    } catch {
      toast.error("Failed to save search criteria.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      className="modal fade show d-block"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", zIndex: 1060 }}
      tabIndex={-1}
      role="dialog"
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content border-20 p-4">
          <div className="modal-header border-0 pb-0">
            <h5 className="modal-title fw-700 color-dark fs-20">Save Search & Set Alerts</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>

          <form onSubmit={handleSubmit} className="modal-body pt-3">
            <p className="text-muted fs-14 mb-3">
              Save these filter parameters to your workspace and receive instant or daily notifications when matching residences enter the portfolio.
            </p>

            <div className="mb-3">
              <label className="form-label fs-13 text-muted">Search Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Worli & Bandra 3 BHK under ₹5 Cr"
                className="form-control"
                required
              />
            </div>

            <div className="form-check form-switch mb-3">
              <input
                className="form-check-input"
                type="checkbox"
                id="alertToggle"
                checked={alertEnabled}
                onChange={(e) => setAlertEnabled(e.target.checked)}
              />
              <label className="form-check-label fs-14 fw-500 color-dark" htmlFor="alertToggle">
                Receive proactive alerts for new matching listings
              </label>
            </div>

            {alertEnabled && (
              <div className="mb-4">
                <label className="form-label fs-13 text-muted">Alert Notification Frequency</label>
                <select
                  value={frequency}
                  onChange={(e) => setFrequency(e.target.value as any)}
                  className="form-select"
                >
                  <option value="instant">Instant (as soon as listed)</option>
                  <option value="daily">Daily Digest (recommended)</option>
                  <option value="weekly">Weekly Summary</option>
                </select>
              </div>
            )}

            <div className="d-flex justify-content-end gap-2 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="btn btn-outline-dark rounded-pill px-4 py-2 fs-13"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="btn btn-dark rounded-pill px-4 py-2 fs-13"
              >
                {saving ? "Saving..." : "Save Search"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SaveSearchModal;
