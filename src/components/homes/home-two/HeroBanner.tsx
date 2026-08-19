"use client"
import Image from "next/image"
import Link from "next/link";
import DropdownTwo from "@/components/search-dropdown/home-dropdown/DropdownTwo";

import titleShape from "@/assets/images/shape/shape_11.svg"
import bannerImg_1 from "@/assets/images/assets/ils_03.png"
import bannerImg_2 from "@/assets/images/shape/shape_12.svg"
import bannerImg_3 from "@/assets/images/assets/badge_01.svg"

const HeroBanner = () => {

   return (
      <>
         <div className="hero-banner-two z-1 position-relative">
            <div className="container">
               <div className="position-relative line-bg pt-200 md-pt-150 pb-130 xl-pb-100">
                  <div className="row">
                     <div className="col-xxl-9 col-xl-8 col-lg-9 col-md-10">
                        <h1 className="hero-heading font-garamond wow fadeInUp">Find a Place Worth Calling Home. <span><Image src={titleShape} alt="" className="lazy-img icon d-inline-block" /></span></h1>
                        <p className="fs-24 color-dark pt-35 md-pt-30 pb-35 mb-pb-20 wow fadeInUp" data-wow-delay="0.1s">Discover thoughtfully selected residences, investment opportunities and premium addresses across India&apos;s most desirable destinations.</p>
                        <div className="d-inline-flex align-items-center flex-wrap">
                           <Link href="/listing_07" className="btn-seven mb-20 me-4 me-xxl5"><span>Explore Properties</span> <i className="bi bi-arrow-up-right"></i></Link>
                           <Link href="/dashboard/add-property" style={{ cursor: "pointer" }} className="video-icon tran3s d-flex align-items-center justify-content-center mb-20">
                              <i className="fa-light fa-plus"></i>
                              <div className="ps-3 text-start">
                                 <span className="d-block">List</span>
                                 <strong className="fs-20 color-dark fw-normal d-block">Your Property</strong>
                              </div>
                           </Link>
                        </div>
                     </div>
                  </div>

                  <DropdownTwo />
               </div>
            </div>
            <Image src={bannerImg_1} alt="" className="lazy-img shapes illustration" />
            <Image src={bannerImg_2} alt="" className="lazy-img shapes shape_01" />
            <Image src={bannerImg_3} alt="" className="lazy-img shapes shape_02" />
         </div>
      </>
   )
}

export default HeroBanner
