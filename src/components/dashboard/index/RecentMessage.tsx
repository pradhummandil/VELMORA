"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { apiClient } from "@/utils/api";

interface InquiryItem {
  id: number;
  propertyTitle: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  status: string;
  createdAt: string;
}

const RecentMessage = () => {
  const { user } = useAuth();
  const role = user?.role || "user";
  const [inquiries, setInquiries] = useState<InquiryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchRecent = async () => {
      try {
        const res =
          role === "user"
            ? await apiClient.getMyInquiries()
            : await apiClient.getReceivedInquiries();
        if (isMounted && Array.isArray(res.data)) {
          setInquiries(res.data.slice(0, 3));
        }
      } catch (err) {
        console.error("Failed to load recent inquiries:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchRecent();
    return () => {
      isMounted = false;
    };
  }, [role]);

  if (loading) {
    return (
      <div className="py-4 text-center">
        <div className="spinner-border spinner-border-sm text-dark mb-2" role="status"></div>
        <p className="fs-14 text-muted m0">Loading inquiries...</p>
      </div>
    );
  }

  if (inquiries.length === 0) {
    return (
      <div className="message-wrapper py-3 px-2 text-center">
        <div className="py-3">
          <i className="fa-light fa-envelope-open text-muted fs-2 mb-2 d-block"></i>
          <p className="fs-15 fw-500 color-dark mb-1">
            {role === "user" ? "No inquiries submitted yet." : "No client inquiries received yet."}
          </p>
          <p className="fs-13 text-muted mb-3">
            {role === "user"
              ? "Inquiries you send for properties will appear here."
              : "When prospective clients inquire about your listings, requests appear here."}
          </p>
          {role === "user" ? (
            <Link href="/listing_01" className="btn-two sm">
              Browse Properties
            </Link>
          ) : (
            <Link href="/dashboard/add-property" className="btn-two sm">
              + Add Property
            </Link>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="inquiry-recent-list">
      {inquiries.map((inq) => (
        <div key={inq.id} className="p-3 mb-2 rounded bg-light border-bottom">
          <div className="d-flex justify-content-between align-items-center mb-1">
            <span className="fw-600 fs-14 text-truncate" style={{ maxWidth: "60%" }}>
              {inq.propertyTitle}
            </span>
            <span className={`badge ${inq.status === "new" ? "bg-dark" : "bg-secondary"} fs-11`}>
              {inq.status.toUpperCase()}
            </span>
          </div>
          <p className="fs-12 text-muted mb-1">
            {role === "user" ? `Submitted on ${new Date(inq.createdAt).toLocaleDateString()}` : `From: ${inq.name} (${inq.email})`}
          </p>
          <p className="fs-13 color-dark m0 text-truncate">{inq.message}</p>
        </div>
      ))}
      <div className="text-center mt-2">
        <Link href="/dashboard/message" className="fs-13 fw-500 color-dark text-decoration-underline">
          Open Inquiries Hub &rarr;
        </Link>
      </div>
    </div>
  );
};

export default RecentMessage;
