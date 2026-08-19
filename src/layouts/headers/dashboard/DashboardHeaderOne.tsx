"use client"
import Image from "next/image"
import Link from "next/link";
import { usePathname } from 'next/navigation'

import dashboardLogo from "@/assets/images/logo/logo_01.svg";
import dashboardIconActive_1 from "@/assets/images/dashboard/icon/icon_1_active.svg";
import dashboardIcon_1 from "@/assets/images/dashboard/icon/icon_1.svg";
import dashboardIconActive_2 from "@/assets/images/dashboard/icon/icon_2_active.svg";
import dashboardIcon_2 from "@/assets/images/dashboard/icon/icon_2.svg";
import dashboardIconActive_3 from "@/assets/images/dashboard/icon/icon_3_active.svg";
import dashboardIcon_3 from "@/assets/images/dashboard/icon/icon_3.svg";
import dashboardIconActive_4 from "@/assets/images/dashboard/icon/icon_4_active.svg";
import dashboardIcon_4 from "@/assets/images/dashboard/icon/icon_4.svg";
import dashboardIconActive_6 from "@/assets/images/dashboard/icon/icon_6_active.svg";
import dashboardIcon_6 from "@/assets/images/dashboard/icon/icon_6.svg";
import dashboardIconActive_7 from "@/assets/images/dashboard/icon/icon_7_active.svg";
import dashboardIcon_7 from "@/assets/images/dashboard/icon/icon_7.svg";
import dashboardIconActive_8 from "@/assets/images/dashboard/icon/icon_8_active.svg";
import dashboardIcon_8 from "@/assets/images/dashboard/icon/icon_8.svg";
import dashboardIconActive_9 from "@/assets/images/dashboard/icon/icon_9_active.svg";
import dashboardIcon_9 from "@/assets/images/dashboard/icon/icon_9.svg";
import dashboardIcon_11 from "@/assets/images/dashboard/icon/icon_41.svg";
import { useAuth } from "@/context/AuthContext";

const DashboardHeaderOne = ({ isActive, setIsActive }: any) => {
   const pathname = usePathname();
   const { logout, user } = useAuth();
   const role = user?.role || "user";

   const getRoleLabel = () => {
      switch (role) {
         case "agent":
            return "Property Advisor / Agent";
         case "property_owner":
            return "Property Owner";
         case "admin":
            return "Administrator";
         default:
            return "Buyer / Member";
      }
   };

   return (
      <aside className={`dash-aside-navbar ${isActive ? "show" : ""}`}>
         <div className="position-relative">
            <div className="logo d-md-block d-flex align-items-center justify-content-between plr bottom-line pb-30">
               <Link href="/dashboard/dashboard-index" aria-label="VELMORA Dashboard">
                  <Image src={dashboardLogo} alt="VELMORA" />
               </Link>
               <button onClick={() => setIsActive(false)} className="close-btn d-block d-md-none" aria-label="Close Navigation"><i className="fa-light fa-circle-xmark"></i></button>
            </div>
            <nav className="dasboard-main-nav pt-30 pb-30 bottom-line">
               <ul className="style-none">
                  <li className="plr">
                     <Link href="/dashboard/dashboard-index" className={`d-flex w-100 align-items-center ${pathname === '/dashboard/dashboard-index' ? 'active' : ''}`}>
                        <Image src={pathname === '/dashboard/dashboard-index' ? dashboardIconActive_1 : dashboardIcon_1} alt="" />
                        <span>Dashboard</span>
                     </Link>
                  </li>

                  {/* Role-Specific Properties & Listings */}
                  {(role === "property_owner" || role === "agent" || role === "admin") && (
                     <>
                        <li className="plr">
                           <Link href="/dashboard/properties-list" className={`d-flex w-100 align-items-center ${pathname === '/dashboard/properties-list' ? 'active' : ''}`}>
                              <Image src={pathname === '/dashboard/properties-list' ? dashboardIconActive_6 : dashboardIcon_6} alt="" />
                              <span>{role === "agent" ? "My Listings" : "My Properties"}</span>
                           </Link>
                        </li>
                        <li className="plr">
                           <Link href="/dashboard/add-property" className={`d-flex w-100 align-items-center ${pathname === '/dashboard/add-property' ? 'active' : ''}`}>
                              <Image src={pathname === '/dashboard/add-property' ? dashboardIconActive_7 : dashboardIcon_7} alt="" />
                              <span>{role === "agent" ? "Add Listing" : "Add Property"}</span>
                           </Link>
                        </li>
                     </>
                  )}

                  {/* Inquiries & Tour Messages */}
                  <li className="plr">
                     <Link href="/dashboard/message" className={`d-flex w-100 align-items-center ${pathname === '/dashboard/message' ? 'active' : ''}`}>
                        <Image src={pathname === '/dashboard/message' ? dashboardIconActive_2 : dashboardIcon_2} alt="" />
                        <span>{role === "user" ? "Inquiries & Tours" : role === "agent" ? "Client Inquiries" : "Property Inquiries"}</span>
                     </Link>
                  </li>

                  {/* Favourites */}
                  <li className="plr">
                     <Link href="/dashboard/favourites" className={`d-flex w-100 align-items-center ${pathname === '/dashboard/favourites' ? 'active' : ''}`}>
                        <Image src={pathname === '/dashboard/favourites' ? dashboardIconActive_8 : dashboardIcon_8} alt="" />
                        <span>Saved Favourites</span>
                     </Link>
                  </li>

                  {role === "user" && (
                     <>
                        <li className="plr">
                           <Link href="/dashboard/saved-search" className={`d-flex w-100 align-items-center ${pathname === '/dashboard/saved-search' ? 'active' : ''}`}>
                              <Image src={pathname === '/dashboard/saved-search' ? dashboardIconActive_9 : dashboardIcon_9} alt="" />
                              <span>Saved Searches</span>
                           </Link>
                        </li>
                        <li className="plr">
                           <Link href="/dashboard/add-property" className={`d-flex w-100 align-items-center ${pathname === '/dashboard/add-property' ? 'active' : ''}`}>
                              <Image src={pathname === '/dashboard/add-property' ? dashboardIconActive_7 : dashboardIcon_7} alt="" />
                              <span>List a Property</span>
                           </Link>
                        </li>
                     </>
                  )}

                  <li className="bottom-line pt-30 lg-pt-20 mb-40 lg-mb-30"></li>
                  <li><div className="nav-title">Account</div></li>
                  <li className="plr">
                     <Link href="/dashboard/profile" className={`d-flex w-100 align-items-center ${pathname === '/dashboard/profile' ? 'active' : ''}`}>
                        <Image src={pathname === '/dashboard/profile' ? dashboardIconActive_3 : dashboardIcon_3} alt="" />
                        <span>Profile</span>
                     </Link>
                  </li>
                  <li className="plr">
                     <Link href="/dashboard/account-settings" className={`d-flex w-100 align-items-center ${pathname === '/dashboard/account-settings' ? 'active' : ''}`}>
                        <Image src={pathname === '/dashboard/account-settings' ? dashboardIconActive_4 : dashboardIcon_4} alt="" />
                        <span>Account Settings</span>
                     </Link>
                  </li>
               </ul>
            </nav>

            {user && (
               <div className="profile-complete-status bottom-line pb-25 pt-15 plr">
                  <div className="d-flex align-items-center justify-content-between mb-5">
                     <span className="badge bg-dark text-white fs-11 px-2 py-1 rounded-pill">{getRoleLabel()}</span>
                  </div>
                  <div className="fw-600 color-dark text-truncate">{user.name}</div>
                  <div className="fs-12 text-muted text-truncate">{user.email}</div>
               </div>
            )}

            <div className="plr pt-20">
               <button 
                  type="button" 
                  onClick={logout} 
                  className="d-flex w-100 align-items-center logout-btn border-0 bg-transparent" 
                  aria-label="Logout"
               >
                  <div className="icon tran3s d-flex align-items-center justify-content-center rounded-circle"><Image src={dashboardIcon_11} alt="" /></div>
                  <span>Logout</span>
               </button>
            </div>
         </div>
      </aside>
   )
}

export default DashboardHeaderOne;
