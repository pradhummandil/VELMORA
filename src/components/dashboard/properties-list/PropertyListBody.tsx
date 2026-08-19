"use client";
import { useEffect, useState } from "react";
import DashboardHeaderTwo from "@/layouts/headers/dashboard/DashboardHeaderTwo";
import Link from "next/link";
import { toast } from "react-toastify";
import { apiClient } from "@/utils/api";
import { useAuth } from "@/context/AuthContext";

interface PropertyItem {
  id: number;
  title: string;
  location: string;
  city: string;
  address?: string;
  price: number;
  propertyType: string;
  status: string;
  createdAt: string;
}

const formatPrice = (price: number) => {
  if (!price) return "Price on Request";
  if (price >= 10000000) {
    const cr = price / 10000000;
    return `₹${cr.toFixed(2).replace(/\.00$/, '')} Cr`;
  } else if (price >= 100000) {
    const lakh = price / 100000;
    return `₹${lakh.toFixed(2).replace(/\.00$/, '')} Lakh`;
  }
  return `₹${Number(price).toLocaleString('en-IN')}`;
};

const PropertyListBody = () => {
  const { user } = useAuth();
  const role = user?.role || "user";
  const [properties, setProperties] = useState<PropertyItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const res = await apiClient.getMyListings();
      if (Array.isArray(res.data)) {
        setProperties(res.data);
      }
    } catch (err) {
      console.error("Error fetching properties:", err);
      toast.error("Failed to load your listed properties.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to remove this property listing?")) return;
    try {
      setDeletingId(id);
      await apiClient.deleteProperty(id);
      toast.success("Property removed successfully.");
      setProperties((prev) => prev.filter((p) => p.id !== id));
    } catch (err: any) {
      toast.error(err.response?.data?.error || "Error deleting property.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="dashboard-body">
      <div className="position-relative">
        <DashboardHeaderTwo title={role === "agent" ? "My Listings" : "My Properties"} />

        <div className="d-flex align-items-center justify-content-between mb-25 mt-10">
          <div>
            <h3 className="main-title m0">{role === "agent" ? "Assigned Listings" : "My Properties"}</h3>
            <p className="fs-15 text-muted m0 pt-1">
              Manage your published residences, review statuses, and track portfolio performance.
            </p>
          </div>
          <Link href="/dashboard/add-property" className="btn-two sm">
            + Add New Property
          </Link>
        </div>

        {loading ? (
          <div className="bg-white card-box border-20 text-center py-5">
            <div className="spinner-border text-dark mb-3" role="status"></div>
            <p className="fs-16 text-muted m0">Loading your properties...</p>
          </div>
        ) : properties.length === 0 ? (
          <div className="bg-white card-box border-20 text-center py-5 px-4 mt-20 shadow-sm">
            <div className="py-5" style={{ maxWidth: "500px", margin: "0 auto" }}>
              <i className="fa-light fa-city text-muted fs-1 mb-3 d-block"></i>
              <h4 className="font-garamond color-dark mb-15">No properties listed yet.</h4>
              <p className="fs-16 text-muted mb-30">
                {role === "agent"
                  ? "You have not been assigned any listings yet, or have not created one."
                  : "List your luxury residence with VELMORA to reach discerning buyers across India."}
              </p>
              <Link href="/dashboard/add-property" className="btn-two">
                Add New Property
              </Link>
            </div>
          </div>
        ) : (
          <div className="bg-white card-box border-20 p-4 shadow-sm">
            <div className="table-responsive">
              <table className="table align-middle">
                <thead className="table-light">
                  <tr>
                    <th>Property</th>
                    <th>Date Added</th>
                    <th>Type</th>
                    <th>Status</th>
                    <th className="text-end">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {properties.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <div>
                          <div className="fw-600 fs-16 color-dark">{item.title}</div>
                          <div className="fs-13 text-muted">{item.location || item.address || item.city}</div>
                          <div className="fw-600 fs-14 text-dark mt-1">{formatPrice(item.price)}</div>
                        </div>
                      </td>
                      <td className="fs-14 text-muted">
                        {new Date(item.createdAt).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>
                      <td>
                        <span className="badge bg-light text-dark border fs-12">{item.propertyType}</span>
                      </td>
                      <td>
                        <span className="badge bg-dark text-white fs-12">{item.status}</span>
                      </td>
                      <td className="text-end">
                        <button
                          onClick={() => handleDelete(item.id)}
                          disabled={deletingId === item.id}
                          className="btn btn-sm btn-outline-danger"
                          title="Delete Listing"
                        >
                          {deletingId === item.id ? "Deleting..." : <i className="fa-light fa-trash"></i>}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyListBody;
