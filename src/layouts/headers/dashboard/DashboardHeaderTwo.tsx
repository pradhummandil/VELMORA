"use client"
import Image from "next/image"
import Link from "next/link"
import Notification from "./Notification";
import Profile from "./Profile";
import { useState } from "react";
import DashboardHeaderOne from "./DashboardHeaderOne";
import { useAuth } from "@/context/AuthContext";

import dashboardIcon_1 from "@/assets/images/dashboard/icon/icon_43.svg";
import dashboardIcon_2 from "@/assets/images/dashboard/icon/icon_11.svg";

const getInitials = (name?: string) => {
   if (!name) return "V";
   const parts = name.trim().split(/\s+/);
   if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
   }
   return name.slice(0, 2).toUpperCase();
};

const DashboardHeaderTwo = ({title}:any) => {
   const { user } = useAuth();
   const [isActive, setIsActive] = useState<boolean>(false);

   return (
      <>
         <header className="dashboard-header">
            <div className="d-flex align-items-center justify-content-end">
               <h4 className="m0 d-none d-lg-block">{title}</h4>
               <button onClick={() => setIsActive(true)} className="dash-mobile-nav-toggler d-block d-md-none me-auto" aria-label="Open Navigation">
                  <span></span>
               </button>
               <form onSubmit={(e) => e.preventDefault()} className="search-form ms-auto">
                  <input type="text" placeholder="Search here.." />
                  <button type="submit" aria-label="Search"><Image src={dashboardIcon_1} alt="" className="lazy-img m-auto" /></button>
               </form>
               <div className="profile-notification position-relative dropdown-center ms-3 ms-md-5 me-4">
                  <button className="noti-btn dropdown-toggle" type="button" id="notification-dropdown" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-expanded="false" aria-label="Notifications">
                     <Image src={dashboardIcon_2} alt="" className="lazy-img" />
                     <div className="badge-pill"></div>
                  </button>
                  <Notification />
               </div>
               <div className="d-none d-md-block me-3">
                  <Link href="/dashboard/add-property" className="btn-two"><span>Add Listing</span> <i className="fa-thin fa-arrow-up-right"></i></Link>
               </div>
               <div className="user-data position-relative">
                  <button 
                     className="user-avatar online position-relative rounded-circle dropdown-toggle d-flex align-items-center justify-content-center fw-600 border-0 text-white" 
                     style={{ width: "42px", height: "42px", backgroundColor: "#0D1A1C", color: "#D4AF37", fontSize: "14px", letterSpacing: "1px" }}
                     type="button" 
                     id="profile-dropdown" 
                     data-bs-toggle="dropdown" 
                     data-bs-auto-close="outside" 
                     aria-expanded="false"
                     aria-label="User Profile Menu"
                  >
                     {getInitials(user?.name)}
                  </button>
                  <Profile />
               </div>
            </div>
         </header>
         <DashboardHeaderOne isActive={isActive} setIsActive={setIsActive} />
      </>
   )
}

export default DashboardHeaderTwo

