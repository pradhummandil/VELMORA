"use client"
import NavMenu from "./Menu/NavMenu"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import UseSticky from "@/hooks/UseSticky"
import LoginModal from "@/modals/LoginModal"
import Offcanvas from "./Menu/Offcanvas"

import logo_1 from "@/assets/images/logo/logo_01.svg";
import { useAuth } from "@/context/AuthContext";

const HeaderThree = () => {
   const { sticky } = UseSticky();
   const { isAuthenticated, user } = useAuth();
   const [offCanvas, setOffCanvas] = useState<boolean>(false);

   return (
      <>
         <header className={`theme-main-menu menu-overlay menu-style-five sticky-menu ${sticky ? "fixed" : ""}`}>
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

                     <div className="right-widget ms-auto ms-lg-2 ms-xl-3 me-2 me-lg-0 order-lg-2 flex-shrink-0">
                        <ul className="d-flex align-items-center style-none">
                            <li className="d-flex align-items-center login-btn-one">
                               <i className={`fa-regular ${isAuthenticated ? "fa-user" : "fa-lock"} me-1`}></i>
                               {isAuthenticated ? (
                                  <Link href="/dashboard/dashboard-index" className="fw-500 tran3s text-truncate d-inline-block" style={{ maxWidth: "140px", verticalAlign: "middle" }} title="Dashboard">
                                     {user?.firstName || user?.name?.split(" ")[0] || "Dashboard"}
                                  </Link>
                               ) : (
                                  <Link href="#" data-bs-toggle="modal" data-bs-target="#loginModal" className="fw-500 tran3s">
                                     Login <span className="d-none d-sm-inline-block">/ Sign up</span>
                                  </Link>
                               )}
                            </li>
                            <li className="d-none d-md-inline-block ms-2 ms-xl-3 me-xl-3">
                               <Link href={isAuthenticated ? "/dashboard/add-property" : "#"} data-bs-toggle={!isAuthenticated ? "modal" : undefined} data-bs-target={!isAuthenticated ? "#loginModal" : undefined} className="btn-five md rounded-0">
                                  <span>List Property</span> <i className="fa-thin fa-arrow-up-right"></i>
                               </Link>
                            </li>
                           <li className="d-none d-xl-block"><button onClick={() => setOffCanvas(true)} style={{ cursor: "pointer" }} className="sidenavbtn rounded-circle tran3s" type="button" aria-label="Open Menu"><i className="fa-sharp fa-light fa-bars-filter"></i></button></li>
                        </ul>
                     </div>
                  </div>
               </div>
            </div>
         </header>

         <Offcanvas offCanvas={offCanvas} setOffCanvas={setOffCanvas} />
         <LoginModal />
      </>
   )
}

export default HeaderThree
