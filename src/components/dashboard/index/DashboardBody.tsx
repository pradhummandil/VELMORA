"use client"
import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import RecentMessage from "./RecentMessage"
import DashboardHeaderTwo from "@/layouts/headers/dashboard/DashboardHeaderTwo"
import icon_1 from "@/assets/images/dashboard/icon/icon_12.svg"
import icon_2 from "@/assets/images/dashboard/icon/icon_13.svg"
import icon_3 from "@/assets/images/dashboard/icon/icon_14.svg"
import icon_4 from "@/assets/images/dashboard/icon/icon_15.svg"
import { useAuth } from "@/context/AuthContext"
import { apiClient } from "@/utils/api"

interface DashboardStats {
  role: string;
  myProperties: number;
  activeInquiries: number;
  scheduledTours: number;
  savedFavourites: number;
  portfolioViews: number;
}

const DashboardBody = () => {
  const { user } = useAuth();
  const role = user?.role || "user";
  const [stats, setStats] = useState<DashboardStats>({
    role: "user",
    myProperties: 0,
    activeInquiries: 0,
    scheduledTours: 0,
    savedFavourites: 0,
    portfolioViews: 0,
  });
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;
    const fetchStats = async () => {
      try {
        const res = await apiClient.getDashboardStats();
        if (isMounted && res.data) {
          setStats(res.data);
        }
      } catch (err) {
        console.error("Failed to load dashboard statistics:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchStats();
    return () => {
      isMounted = false;
    };
  }, []);

  const getRoleTitle = () => {
    switch (role) {
      case "agent":
        return "VELMORA Property Advisor";
      case "property_owner":
        return "Property Owner Portfolio";
      default:
        return "Client Workspace";
    }
  };

  const getCards = () => {
    if (role === "property_owner") {
      return [
        {
          id: 1,
          icon: icon_1,
          title: "My Properties",
          value: loading ? "..." : String(stats.myProperties),
          link: "/dashboard/properties-list",
        },
        {
          id: 2,
          icon: icon_2,
          title: "Property Inquiries",
          value: loading ? "..." : String(stats.activeInquiries),
          link: "/dashboard/message",
        },
        {
          id: 3,
          icon: icon_3,
          title: "Scheduled Tours",
          value: loading ? "..." : String(stats.scheduledTours),
          link: "/dashboard/message",
        },
        {
          id: 4,
          icon: icon_4,
          title: "Saved Favourites",
          value: loading ? "..." : String(stats.savedFavourites),
          link: "/dashboard/favourites",
        },
      ];
    } else if (role === "agent") {
      return [
        {
          id: 1,
          icon: icon_1,
          title: "My Listings",
          value: loading ? "..." : String(stats.myProperties),
          link: "/dashboard/properties-list",
        },
        {
          id: 2,
          icon: icon_2,
          title: "Client Inquiries",
          value: loading ? "..." : String(stats.activeInquiries),
          link: "/dashboard/message",
        },
        {
          id: 3,
          icon: icon_3,
          title: "Scheduled Tours",
          value: loading ? "..." : String(stats.scheduledTours),
          link: "/dashboard/message",
        },
        {
          id: 4,
          icon: icon_4,
          title: "Saved Favourites",
          value: loading ? "..." : String(stats.savedFavourites),
          link: "/dashboard/favourites",
        },
      ];
    } else {
      return [
        {
          id: 1,
          icon: icon_4,
          title: "Saved Favourites",
          value: loading ? "..." : String(stats.savedFavourites),
          link: "/dashboard/favourites",
        },
        {
          id: 2,
          icon: icon_2,
          title: "My Inquiries",
          value: loading ? "..." : String(stats.activeInquiries),
          link: "/dashboard/message",
        },
        {
          id: 3,
          icon: icon_3,
          title: "Viewing Requests",
          value: loading ? "..." : String(stats.scheduledTours),
          link: "/dashboard/message",
        },
        {
          id: 4,
          icon: icon_1,
          title: "Listed Properties",
          value: loading ? "..." : String(stats.myProperties),
          link: "/dashboard/add-property",
        },
      ];
    }
  };

  return (
    <div className="dashboard-body">
      <div className="position-relative">
        <DashboardHeaderTwo title="Dashboard" />

        <div className="d-flex flex-wrap align-items-center justify-content-between mb-25 mt-10">
          <div>
            <h3 className="main-title m0">Welcome, {user?.name || "Member"}</h3>
            <p className="fs-15 text-muted m0 pt-1">
              {getRoleTitle()} — manage your listings, inquiries, scheduled tours, and saved residences.
            </p>
          </div>
          <div className="mt-2 mt-sm-0">
            {role === "user" ? (
              <Link href="/listing_01" className="btn-two sm">
                Explore Residences
              </Link>
            ) : (
              <Link href="/dashboard/add-property" className="btn-two sm">
                + Add New Property
              </Link>
            )}
          </div>
        </div>

        {/* Real Statistics Cards */}
        <div className="bg-white border-20 p-4 mb-30 shadow-sm">
          <div className="row g-3">
            {getCards().map((item) => (
              <div key={item.id} className="col-lg-3 col-sm-6 col-12">
                <Link href={item.link} className="text-decoration-none">
                  <div className="dash-card-one bg-light border-20 p-3 h-100 position-relative tran3s">
                    <div className="d-flex align-items-center justify-content-between">
                      <div className="order-sm-0">
                        <span className="text-muted fs-14 fw-500">{item.title}</span>
                        <div className="value fw-600 fs-24 color-dark mt-1">{item.value}</div>
                      </div>
                      <div className="icon rounded-circle d-flex align-items-center justify-content-center bg-white shadow-sm" style={{ width: "48px", height: "48px" }}>
                        <Image src={item.icon} alt="" width={24} height={24} className="lazy-img" />
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Action & Inquiries Overview */}
        <div className="row gx-xxl-5 d-flex pt-10">
          <div className="col-xl-7 col-lg-6 d-flex flex-column">
            <div className="bg-white border-20 p-4 mb-30 h-100 shadow-sm">
              <div className="d-flex align-items-center justify-content-between border-bottom pb-3 mb-3">
                <h5 className="dash-title-two m0 fs-18 fw-600">Overview & Quick Actions</h5>
                <span className="badge bg-dark text-white fs-12 px-2 py-1">
                  {role === "agent" ? "Agent Hub" : role === "property_owner" ? "Owner Hub" : "Buyer Hub"}
                </span>
              </div>

              {role === "property_owner" ? (
                <div>
                  <p className="fs-15 text-muted mb-3">
                    As a VELMORA Property Owner, you have direct control over your listed residences and viewing schedules.
                  </p>
                  <div className="d-flex flex-wrap gap-2">
                    <Link href="/dashboard/add-property" className="btn-two sm">List New Residence</Link>
                    <Link href="/dashboard/properties-list" className="btn-four sm">Manage Properties ({stats.myProperties})</Link>
                    <Link href="/dashboard/message" className="btn-four sm">Inquiries ({stats.activeInquiries})</Link>
                  </div>
                </div>
              ) : role === "agent" ? (
                <div>
                  <p className="fs-15 text-muted mb-3">
                    Manage client leads, inquiries, and scheduled tours for your assigned luxury residences.
                  </p>
                  <div className="d-flex flex-wrap gap-2">
                    <Link href="/dashboard/properties-list" className="btn-two sm">View Listings ({stats.myProperties})</Link>
                    <Link href="/dashboard/message" className="btn-four sm">Client Inquiries ({stats.activeInquiries})</Link>
                    <Link href="/dashboard/add-property" className="btn-four sm">+ Add Listing</Link>
                  </div>
                </div>
              ) : (
                <div>
                  <p className="fs-15 text-muted mb-3">
                    Discover India&apos;s most prestigious properties, save your favourites, and request private guided tours with VELMORA luxury advisors.
                  </p>
                  <div className="d-flex flex-wrap gap-2">
                    <Link href="/listing_01" className="btn-two sm">Browse Residences</Link>
                    <Link href="/dashboard/favourites" className="btn-four sm">Saved Favourites ({stats.savedFavourites})</Link>
                    <Link href="/dashboard/message" className="btn-four sm">My Inquiries ({stats.activeInquiries})</Link>
                    <Link href="/dashboard/add-property" className="btn-four sm">List a Property</Link>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="col-xl-5 col-lg-6 d-flex">
            <div className="recent-job-tab bg-white border-20 p-4 mb-30 w-100 shadow-sm">
              <div className="d-flex align-items-center justify-content-between border-bottom pb-3 mb-3">
                <h5 className="dash-title-two m0 fs-18 fw-600">Recent Messages & Inquiries</h5>
                <Link href="/dashboard/message" className="fs-13 text-decoration-underline color-dark">View All</Link>
              </div>
              <RecentMessage />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardBody;
