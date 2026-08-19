"use client"
import NavMenu from "./Menu/NavMenu"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import UseSticky from "@/hooks/UseSticky"
import LoginModal from "@/modals/LoginModal"
import HeaderSearchbar from "./Menu/HeaderSearchbar"

import logo_1 from "@/assets/images/logo/logo_01.svg";
import { useAuth } from "@/context/AuthContext";

const HeaderFour = () => {
   const { sticky } = UseSticky();
   const { isAuthenticated } = useAuth();
   const [isSearch, setIsSearch] = useState<boolean>(false);
   
   return (
      <>
         <header className={`theme-main-menu menu-overlay menu-style-six sticky-menu ${sticky ? "fixed" : ""}`}>
            <div className="inner-content gap-two">
               <div className="top-header position-relative">
                  <div className="d-flex align-items-center justify-content-between">
                     <div className="logo order-lg-0 me-lg-3 me-xl-4">
                        <Link href="/" className="d-flex align-items-center">
                           <Image src={logo_1} alt="VELMORA" priority />
                        </Link>
                     </div>

                     <nav className="navbar navbar-expand-lg p0 ms-lg-2 ms-xl-4 order-lg-1">
                        <button className="navbar-toggler d-block d-lg-none" type="button" data-bs-toggle="collapse"
                           data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"
                           aria-label="Toggle navigation">
                           <span></span>
                        </button>
                        <div className="collapse navbar-collapse ms-xl-5" id="navbarNav">
                           <NavMenu />
                        </div>
                     </nav>

                     <div className="right-widget ms-auto ms-lg-3 ms-xl-4 me-3 me-lg-0 order-lg-2">
                        <ul className="d-flex align-items-center style-none">
                           <li className="d-none d-md-inline-block me-4">
                              <Link href={isAuthenticated ? "/dashboard/add-property" : "#"} data-bs-toggle={!isAuthenticated ? "modal" : undefined} data-bs-target={!isAuthenticated ? "#loginModal" : undefined} className="btn-ten rounded-0">
                                 <span>List Property</span> <i className="bi bi-arrow-up-right"></i>
                              </Link>
                           </li>
                           <li>
                              {isAuthenticated ? (
                                 <Link href="/dashboard/dashboard-index" className="login-btn-two rounded-circle tran3s d-flex align-items-center justify-content-center" title="Dashboard"><i className="fa-regular fa-user"></i></Link>
                              ) : (
                                 <Link href="#" data-bs-toggle="modal" data-bs-target="#loginModal" className="login-btn-two rounded-circle tran3s d-flex align-items-center justify-content-center" title="Login"><i className="fa-regular fa-lock"></i></Link>
                              )}
                           </li>
                           <li>
                              <a onClick={() => setIsSearch(true)} style={{ cursor: "pointer" }} className="search-btn-one rounded-circle tran3s d-flex align-items-center justify-content-center"><i className="bi bi-search"></i></a>
                           </li>
                        </ul>
                     </div>
                  </div>

               </div>
            </div>
         </header>

         <LoginModal />
         <HeaderSearchbar isSearch={isSearch} setIsSearch={setIsSearch} />
      </>
   )
}

export default HeaderFour
