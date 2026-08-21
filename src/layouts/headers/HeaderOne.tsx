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
                     <div className="logo order-lg-0 flex-shrink-0 me-2 me-xl-3">
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

                     <div className="right-widget ms-auto ms-lg-2 ms-xl-3 order-lg-2 flex-shrink-0">
                         <ul className="d-flex align-items-center style-none gap-2 gap-xl-3 m-0 p-0">
                            <li>
                               {isAuthenticated ? (
                                  <Link href="/dashboard/dashboard-index" className="btn-one d-inline-flex align-items-center" title="Dashboard">
                                     <i className="fa-regular fa-user me-1"></i>
                                     <span className="text-truncate d-none d-sm-inline-block" style={{ maxWidth: "110px" }}>
                                        {user?.firstName || user?.name?.split(" ")[0] || "Dashboard"}
                                     </span>
                                  </Link>
                               ) : (
                                  <Link href="#" data-bs-toggle="modal" data-bs-target="#loginModal" className="btn-one d-inline-flex align-items-center">
                                     <i className="fa-regular fa-lock me-1"></i> <span>Login</span>
                                  </Link>
                               )}
                            </li>
                            <li className="d-none d-md-inline-block">
                               <Link href={isAuthenticated ? "/dashboard/add-property" : "#"} data-bs-toggle={!isAuthenticated ? "modal" : undefined} data-bs-target={!isAuthenticated ? "#loginModal" : undefined} className="btn-two">
                                  <span>List Property</span> <i className="fa-thin fa-arrow-up-right"></i>
                                </Link>
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
