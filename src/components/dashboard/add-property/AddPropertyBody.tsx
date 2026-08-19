"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-toastify";
import DashboardHeaderTwo from "@/layouts/headers/dashboard/DashboardHeaderTwo";
import { useAuth } from "@/context/AuthContext";
import { apiClient } from "@/utils/api";

const AddPropertyBody = () => {
  const router = useRouter();
  const { user, refreshProfile } = useAuth();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    propertyType: "Apartment",
    status: "For Sale",
    price: "",
    location: "Worli, Mumbai",
    city: "Mumbai",
    address: "",
    bedrooms: "3",
    bathrooms: "3",
    area: "2200",
  });

  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([
    "A/C & Heating",
    "Balcony",
    "Elevator",
    "Parking",
    "Wifi",
    "Security",
  ]);

  const [loading, setLoading] = useState(false);

  const amenityOptions = [
    "A/C & Heating",
    "Garages",
    "Swimming Pool",
    "Parking",
    "Balcony",
    "Garden",
    "Disabled Access",
    "Pet Friendly",
    "Ceiling Height",
    "Outdoor Shower",
    "Refrigerator",
    "Fireplace",
    "Wifi",
    "Elevator",
    "Security",
  ];

  const handleAmenityToggle = (amenity: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity) ? prev.filter((a) => a !== amenity) : [...prev, amenity]
    );
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.price || !formData.location.trim()) {
      toast.error("Please provide Property Title, Price, and Location.");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        propertyType: formData.propertyType,
        status: formData.status,
        price: Number(formData.price),
        location: formData.location.trim(),
        city: formData.city.trim() || "Mumbai",
        address: formData.address.trim(),
        bedrooms: formData.bedrooms,
        bathrooms: formData.bathrooms,
        area: Number(formData.area) || undefined,
        amenities: selectedAmenities,
      };

      const res = await apiClient.createProperty(payload);

      if (res.status === 201) {
        if (res.data.roleUpdated) {
          toast.success("Property created! Your account has been upgraded to Property Owner.");
          await refreshProfile();
        } else {
          toast.success("Property listed successfully!");
        }

        router.push("/dashboard/properties-list");
      }
    } catch (err: any) {
      console.error("Create property error:", err);
      toast.error(err.response?.data?.error || "Failed to create property listing. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-body">
      <div className="position-relative">
        <DashboardHeaderTwo title="Add New Property" />
        <h2 className="main-title d-block d-lg-none">Add New Property</h2>

        <form onSubmit={handleSubmit}>
          {/* Overview Card */}
          <div className="bg-white card-box border-20 p-4 mb-30 shadow-sm">
            <h4 className="dash-title-three mb-20 fs-18 fw-600">Property Overview</h4>
            
            <div className="dash-input-wrapper mb-25">
              <label className="fw-500 mb-1 d-block">Property Title*</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. The Meridian Penthouse"
                required
                className="w-100 p-2 border rounded"
              />
            </div>

            <div className="dash-input-wrapper mb-25">
              <label className="fw-500 mb-1 d-block">Description*</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-100 p-2 border rounded"
                rows={4}
                placeholder="Describe the architectural highlights, views, finishes, and features of the residence..."
              />
            </div>

            <div className="row g-3">
              <div className="col-md-6">
                <div className="dash-input-wrapper mb-20">
                  <label className="fw-500 mb-1 d-block">Property Type*</label>
                  <select
                    name="propertyType"
                    value={formData.propertyType}
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value="Apartment">Apartment / Sky Suite</option>
                    <option value="Penthouse">Penthouse</option>
                    <option value="Villa">Private Villa</option>
                    <option value="Mansion">Luxury Mansion</option>
                    <option value="Condos">Condominium</option>
                  </select>
                </div>
              </div>

              <div className="col-md-6">
                <div className="dash-input-wrapper mb-20">
                  <label className="fw-500 mb-1 d-block">Listing Status*</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value="For Sale">For Sale</option>
                    <option value="Ready to Move">Ready to Move</option>
                    <option value="Under Construction">Under Construction</option>
                    <option value="New Launch">New Launch</option>
                  </select>
                </div>
              </div>

              <div className="col-md-6">
                <div className="dash-input-wrapper mb-20">
                  <label className="fw-500 mb-1 d-block">Price (INR ₹)*</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="e.g. 48000000 (for ₹4.80 Cr)"
                    required
                    className="w-100 p-2 border rounded"
                  />
                  <small className="text-muted">Enter exact amount in Rupees (e.g. 48000000 = ₹4.80 Cr)</small>
                </div>
              </div>

              <div className="col-md-6">
                <div className="dash-input-wrapper mb-20">
                  <label className="fw-500 mb-1 d-block">Super Built-Up Area (sq.ft)</label>
                  <input
                    type="number"
                    name="area"
                    value={formData.area}
                    onChange={handleChange}
                    placeholder="e.g. 2450"
                    className="w-100 p-2 border rounded"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Listing Details & Specifications */}
          <div className="bg-white card-box border-20 p-4 mb-30 shadow-sm">
            <h4 className="dash-title-three mb-20 fs-18 fw-600">Specifications & Room Configuration</h4>
            <div className="row g-3">
              <div className="col-md-6">
                <div className="dash-input-wrapper mb-20">
                  <label className="fw-500 mb-1 d-block">Bedrooms</label>
                  <select
                    name="bedrooms"
                    value={formData.bedrooms}
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value="1">1 BHK</option>
                    <option value="2">2 BHK</option>
                    <option value="3">3 BHK</option>
                    <option value="4">4 BHK</option>
                    <option value="5">5+ BHK</option>
                  </select>
                </div>
              </div>

              <div className="col-md-6">
                <div className="dash-input-wrapper mb-20">
                  <label className="fw-500 mb-1 d-block">Bathrooms</label>
                  <select
                    name="bathrooms"
                    value={formData.bathrooms}
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value="1">1 Bath</option>
                    <option value="2">2 Baths</option>
                    <option value="3">3 Baths</option>
                    <option value="4">4 Baths</option>
                    <option value="5">5+ Baths</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Location Details */}
          <div className="bg-white card-box border-20 p-4 mb-30 shadow-sm">
            <h4 className="dash-title-three mb-20 fs-18 fw-600">Location & Address</h4>
            <div className="row g-3">
              <div className="col-md-6">
                <div className="dash-input-wrapper mb-20">
                  <label className="fw-500 mb-1 d-block">City*</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="e.g. Mumbai, Indore, Bhopal, Bengaluru"
                    required
                    className="w-100 p-2 border rounded"
                  />
                </div>
              </div>

              <div className="col-md-6">
                <div className="dash-input-wrapper mb-20">
                  <label className="fw-500 mb-1 d-block">Locality / Neighborhood*</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="e.g. Worli Sea Face, Bandra West, Vijay Nagar"
                    required
                    className="w-100 p-2 border rounded"
                  />
                </div>
              </div>

              <div className="col-12">
                <div className="dash-input-wrapper mb-20">
                  <label className="fw-500 mb-1 d-block">Full Street Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="e.g. 42 Dr Annie Besant Road, Worli, Mumbai 400030"
                    className="w-100 p-2 border rounded"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Amenities Selection */}
          <div className="bg-white card-box border-20 p-4 mb-30 shadow-sm">
            <h4 className="dash-title-three mb-20 fs-18 fw-600">Curated Amenities</h4>
            <div className="row g-2">
              {amenityOptions.map((amenity) => (
                <div key={amenity} className="col-lg-4 col-sm-6 col-12">
                  <div
                    onClick={() => handleAmenityToggle(amenity)}
                    className={`p-2 border rounded d-flex align-items-center justify-content-between cursor-pointer tran3s ${
                      selectedAmenities.includes(amenity) ? "bg-dark text-white border-dark" : "bg-light text-dark"
                    }`}
                    style={{ cursor: "pointer" }}
                  >
                    <span className="fs-14 fw-500">{amenity}</span>
                    <i
                      className={`fa-solid ${
                        selectedAmenities.includes(amenity) ? "fa-check text-white" : "fa-plus text-muted"
                      }`}
                    ></i>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="button-group d-flex align-items-center gap-3 mt-30 mb-50">
            <button type="submit" disabled={loading} className="btn-two">
              {loading ? "Publishing Listing..." : "Submit Property Listing"}
            </button>
            <Link href="/dashboard/properties-list" className="btn-four">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPropertyBody;
