"use client";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useAuth } from "@/context/AuthContext";
import { apiClient } from "@/utils/api";

interface ScheduleFormProps {
  propertyTitle?: string;
  propertyLocation?: string;
  propertyId?: string | number;
}

const ScheduleForm = ({
  propertyTitle = "The Meridian Residences",
  propertyLocation = "Worli Sea Face, Mumbai",
  propertyId = "1",
}: ScheduleFormProps) => {
  const { user, isAuthenticated } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    preferredDate: "",
    preferredTime: "11:00 AM",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Set default preferred date to tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const defaultDateStr = tomorrow.toISOString().split("T")[0];

    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: user.name || (user.firstName ? `${user.firstName} ${user.lastName || ""}`.trim() : ""),
        email: user.email || "",
        phone: user.phoneNumber || prev.phone,
        preferredDate: prev.preferredDate || defaultDateStr,
        message: prev.message || `I would like to request a private viewing tour of ${propertyTitle}, ${propertyLocation}.`,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        preferredDate: prev.preferredDate || defaultDateStr,
        message: prev.message || `I would like to request a private viewing tour of ${propertyTitle}, ${propertyLocation}.`,
      }));
    }
  }, [user, propertyTitle, propertyLocation]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAuthenticated) {
      toast.info("Please log in to schedule a property tour.", { position: "top-center" });
      const loginModalBtn = document.querySelector('[data-bs-target="#loginModal"]') as HTMLElement;
      if (loginModalBtn) loginModalBtn.click();
      return;
    }

    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim() || !formData.preferredDate || !formData.preferredTime) {
      toast.error("Please fill in your contact information, preferred date, and time.");
      return;
    }

    setLoading(true);
    try {
      const res = await apiClient.createViewing({
        propertyId: String(propertyId),
        propertyTitle,
        propertyLocation,
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        preferredDate: formData.preferredDate,
        preferredTime: formData.preferredTime,
        message: formData.message.trim(),
      });

      if (res.data?.emailWarning) {
        toast.info(res.data.emailWarning, { position: "top-center" });
      } else {
        toast.success("Your property tour request has been scheduled successfully!", { position: "top-center" });
      }

      setFormData((prev) => ({
        ...prev,
        message: `I would like to request a private viewing tour of ${propertyTitle}, ${propertyLocation}.`,
      }));
    } catch (err: any) {
      toast.error(err.response?.data?.error || "Error scheduling viewing request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-box-three mb-20">
        <div className="label fs-13 fw-500">Your Full Name*</div>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Your full name"
          required
          className="type-input"
        />
      </div>

      <div className="input-box-three mb-20">
        <div className="label fs-13 fw-500">Email Address*</div>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="Enter email address"
          required
          className="type-input"
        />
      </div>

      <div className="input-box-three mb-20">
        <div className="label fs-13 fw-500">Phone Number*</div>
        <input
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          placeholder="+91 98200 12345"
          required
          className="type-input"
        />
      </div>

      <div className="row g-2 mb-20">
        <div className="col-6">
          <div className="input-box-three">
            <div className="label fs-13 fw-500">Preferred Date*</div>
            <input
              type="date"
              value={formData.preferredDate}
              onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
              required
              className="type-input p-2"
            />
          </div>
        </div>
        <div className="col-6">
          <div className="input-box-three">
            <div className="label fs-13 fw-500">Preferred Time*</div>
            <select
              value={formData.preferredTime}
              onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
              className="form-select fs-13 p-2 h-100"
            >
              <option value="10:00 AM">10:00 AM</option>
              <option value="11:30 AM">11:30 AM</option>
              <option value="02:00 PM">02:00 PM</option>
              <option value="03:30 PM">03:30 PM</option>
              <option value="05:00 PM">05:00 PM</option>
              <option value="06:30 PM">06:30 PM</option>
            </select>
          </div>
        </div>
      </div>

      <div className="input-box-three mb-20">
        <div className="label fs-13 fw-500">Special Notes / Requests</div>
        <textarea
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder={`I would like to request a private viewing tour of ${propertyTitle}...`}
          rows={3}
          className="p-2 border rounded w-100 fs-13"
        ></textarea>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="btn-nine text-uppercase rounded-3 w-100 mb-10 border-0"
        aria-label="Submit Schedule Tour Request"
      >
        {loading ? "Scheduling Tour..." : "Schedule Viewing Tour"}
      </button>
    </form>
  );
};

export default ScheduleForm;
