"use client"
import NavMenu from "./Menu/NavMenu"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import UseSticky from "@/hooks/UseSticky"
import LoginModal from "@/modals/LoginModal"

import logo_1 from "@/assets/images/logo/logo_01.svg";
import { useAuth } from "@/context/AuthContext";

const HeaderOne = ({ style }: any) => {
   const { sticky } = UseSticky();
   const { isAuthenticated, user } = useAuth();

   return (
      <>
         <header className={`theme-main-menu menu-overlay menu-style-one sticky-menu ${sticky ? "fixed" : ""}`}>
            {!style && <div className="alert-wrapper text-center">
               <p className="fs-16 m0 text-white">Discover curated luxury residences across India with <Link href="/listing_01" className="fw-500 text-decoration-underline">VELMORA</Link></p>
            </div>}
            <div className="inner-content gap-one">
               <div className="top-header position-relative">
                  <div className="d-flex align-items-center justify-content-between">
                     <div className="logo order-lg-0 me-lg-3 me-xl-4">
                        <Link href="/" className="d-flex align-items-center">
                           <Image src={logo_1} alt="VELMORA" priority />
                        </Link>
                     </div>

                     <nav className="navbar navbar-expand-lg p0 order-lg-1">
                        <button className="navbar-toggler d-block d-lg-none" type="button" data-bs-toggle="collapse"
                           data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"
                           aria-label="Toggle navigation">
                           <span></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                           <NavMenu />
                        </div>
                     </nav>

                     <div className="right-widget ms-auto ms-lg-3 ms-xl-4 me-3 me-lg-0 order-lg-2">
                        <ul className="d-flex align-items-center style-none">
                           <li>
                              {isAuthenticated ? (
                                 <Link href="/dashboard/dashboard-index" className="btn-one">
                                    <i className="fa-regular fa-user"></i> <span>{user?.firstName || user?.name?.split(" ")[0] || "Dashboard"}</span>
                                 </Link>
                              ) : (
                                 <Link href="#" data-bs-toggle="modal" data-bs-target="#loginModal" className="btn-one">
                                    <i className="fa-regular fa-lock"></i> <span>Login</span>
                                 </Link>
                              )}
                           </li>
                           <li className="d-none d-md-inline-block ms-3">
                              <Link href={isAuthenticated ? "/dashboard/add-property" : "#"} data-bs-toggle={!isAuthenticated ? "modal" : undefined} data-bs-target={!isAuthenticated ? "#loginModal" : undefined} className="btn-two"><span>List Property</span> <i className="fa-thin fa-arrow-up-right"></i></Link>
                           </li>
                        </ul>
                     </div>
                  </div>

               </div>
            </div>
         </header>
         <LoginModal />
      </>
   )
}

export default HeaderOne
