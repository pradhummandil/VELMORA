"use client";
import { useState, useEffect } from "react";
import DashboardHeaderTwo from "@/layouts/headers/dashboard/DashboardHeaderTwo";
import Link from "next/link";
import { toast } from "react-toastify";
import { useAuth } from "@/context/AuthContext";
import { apiClient } from "@/utils/api";

const AccountSettingBody = () => {
  const { user, refreshProfile } = useAuth();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [about, setAbout] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
      setPhoneNumber(user.phoneNumber || "");
      setAbout(user.about || "");
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await apiClient.updateProfile({
        firstName,
        lastName,
        phoneNumber,
        about,
      });
      await refreshProfile();
      toast.success("Account settings updated successfully!");
    } catch (err: any) {
      toast.error(err.response?.data?.error || "Error updating account settings");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="dashboard-body">
      <div className="position-relative">
        <DashboardHeaderTwo title="Account Settings" />
        <h2 className="main-title d-block d-lg-none">Account Settings</h2>
        <div className="bg-white card-box border-20 p-4 shadow-sm">
          <h4 className="dash-title-three mb-20 fs-18 fw-600">Account Details</h4>
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-lg-6">
                <div className="dash-input-wrapper mb-20">
                  <label className="fw-500 mb-1 d-block">First Name</label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First Name"
                    className="w-100 p-2 border rounded"
                  />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="dash-input-wrapper mb-20">
                  <label className="fw-500 mb-1 d-block">Last Name</label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Last Name"
                    className="w-100 p-2 border rounded"
                  />
                </div>
              </div>
              <div className="col-12">
                <div className="dash-input-wrapper mb-20">
                  <label className="fw-500 mb-1 d-block">Email Address (Cannot be changed)</label>
                  <input
                    type="email"
                    value={user?.email || ""}
                    disabled
                    className="w-100 p-2 border rounded bg-light"
                  />
                </div>
              </div>
              <div className="col-12">
                <div className="dash-input-wrapper mb-20">
                  <label className="fw-500 mb-1 d-block">Phone Number</label>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-100 p-2 border rounded"
                  />
                </div>
              </div>
              <div className="col-12">
                <div className="dash-input-wrapper mb-20">
                  <label className="fw-500 mb-1 d-block">About / Bio</label>
                  <textarea
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                    placeholder="Tell us about yourself..."
                    rows={3}
                    className="w-100 p-2 border rounded"
                  />
                </div>
              </div>
            </div>

            <div className="button-group d-flex align-items-center gap-3 mt-30">
              <button type="submit" disabled={saving} className="btn-two">
                {saving ? "Saving Changes..." : "Save Changes"}
              </button>
              <Link href="/dashboard/dashboard-index" className="btn-four">
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AccountSettingBody;
