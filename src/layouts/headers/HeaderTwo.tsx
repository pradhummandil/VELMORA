"use client"
import NavMenu from "./Menu/NavMenu"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import UseSticky from "@/hooks/UseSticky"
import LoginModal from "@/modals/LoginModal"
import Offcanvas from "./Menu/Offcanvas"
import HeaderSearchbar from "./Menu/HeaderSearchbar"

import logo_1 from "@/assets/images/logo/logo_02.svg";
import logo_2 from "@/assets/images/logo/logo_04.svg";
import logo_3 from "@/assets/images/logo/logo_06.svg";
import { useAuth } from "@/context/AuthContext";

const HeaderTwo = ({ style_1, style_2 }: any) => {
   const { sticky } = UseSticky();
   const { isAuthenticated, user } = useAuth();
   const [offCanvas, setOffCanvas] = useState<boolean>(false);
   const [isSearch, setIsSearch] = useState<boolean>(false);

   return (
      <>
         <div className={`theme-main-menu menu-overlay sticky-menu ${style_2 ? "menu-style-four" : style_1 ? "menu-style-three" : "menu-style-two"} ${sticky ? "fixed" : ""}`}>
            <div className={`inner-content ${style_2 ? "gap-two" : "gap-one"}`}>
               <div className="top-header position-relative">
                  <div className="d-flex align-items-center justify-content-between">
                     <div className="logo order-lg-0 me-lg-3 me-xl-4">
                        <Link href="/" className="d-flex align-items-center">
                           <Image src={style_2 ? logo_3 : style_1 ? logo_2 : logo_1} alt="VELMORA" priority />
                        </Link>
                     </div>

                     <nav className="navbar navbar-expand-lg p0 ms-lg-2 ms-xl-4 order-lg-1">
                        <button className="navbar-toggler d-block d-lg-none" type="button" data-bs-toggle="collapse"
                           data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"
                           aria-label="Toggle navigation">
                           <span></span>
                        </button>
                        <div className={`collapse navbar-collapse ${style_2 ? "ms-xl-5" : ""}`} id="navbarNav">
                           <NavMenu />
                        </div>
                     </nav>

                     <div className="right-widget ms-auto ms-lg-3 ms-xl-4 me-3 me-lg-0 order-lg-2">
                        <ul className="d-flex align-items-center style-none">
                           {!style_2 ? (<>
                              <li className="d-flex align-items-center login-btn-one">
                                 <i className={`fa-regular ${isAuthenticated ? "fa-user" : "fa-lock"} me-1`}></i>
                                 {isAuthenticated ? (
                                    <Link href="/dashboard/dashboard-index" className="fw-500 tran3s text-truncate d-inline-block" style={{ maxWidth: "140px", verticalAlign: "middle" }} title="Dashboard">
                                       {user?.firstName || user?.name?.split(" ")[0] || "Dashboard"}
                                    </Link>
                                 ) : (
                                    <Link href="#" data-bs-toggle="modal" data-bs-target="#loginModal" className="fw-500 tran3s">
                                       Login <span className="d-none d-sm-inline-block"> {""} / Sign up</span>
                                    </Link>
                                 )}
                              </li>
                              <li className="d-none d-md-inline-block ms-2 ms-xl-3 me-xl-3">
                                 <Link href={isAuthenticated ? "/dashboard/add-property" : "#"} data-bs-toggle={!isAuthenticated ? "modal" : undefined} data-bs-target={!isAuthenticated ? "#loginModal" : undefined} className={style_1 ? "btn-ten" : "btn-two rounded-0"}>
                                    <span>List Property</span> <i className="fa-thin fa-arrow-up-right"></i>
                                 </Link>
                              </li>
                              <li className="d-none d-xl-block">
                                 <button onClick={() => setOffCanvas(true)} style={{ cursor: "pointer" }} className="sidenavbtn rounded-circle tran3s" type="button">
                                    <i className="fa-sharp fa-light fa-bars-filter"></i>
                                 </button>
                              </li></>) : (<>
                                 <li className="d-none d-md-flex align-items-center login-btn-one me-4 me-xxl-5">
                                    <i className="fa-regular fa-phone-volume"></i>
                                    <Link href="tel:+912249876543" className="tran3s">+91 22 4987 6543</Link>
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
                              </>)}
                        </ul>
                     </div>
                  </div>

               </div>
            </div>
         </div>

         <Offcanvas offCanvas={offCanvas} setOffCanvas={setOffCanvas} />
         <LoginModal />
         <HeaderSearchbar isSearch={isSearch} setIsSearch={setIsSearch} />
      </>
   )
}

export default HeaderTwo
