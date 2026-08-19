import Image from "next/image"
import fancyShape from "@/assets/images/shape/shape_30.svg"
import Link from "next/link"

const FancyBannerTwo = () => {
   return (
      <div className="fancy-banner-five position-relative z-1 pt-90 lg-pt-70 pb-110 lg-pb-70 mt-170 xl-mt-120">
         <div className="container">
            <div className="row">
               <div className="col-xl-9 m-auto text-center">
                  <div className="title-one mb-40 lg-mb-20">
                     <div className="fs-14 fw-semibold text-uppercase mb-15" style={{ color: "#B89B5E", letterSpacing: "2.5px" }}>YOUR NEXT ADDRESS</div>
                     <h2 className="font-garamond fs-xl text-white">Let&apos;s Find Somewhere Exceptional.</h2>
                     <p className="fs-22 text-white opacity-75 mt-20 mb-0">Tell us what you&apos;re looking for and explore a more considered way to discover property across India.</p>
                  </div>
                  <div className="d-inline-flex align-items-center justify-content-center flex-wrap gap-3">
                     <Link href="/listing_01" className="btn-seven text-uppercase"><span>Explore Properties</span></Link>
                     <Link href="/contact" className="btn-nine text-uppercase"><span>Speak with an Advisor</span></Link>
                  </div>
               </div>
            </div>
         </div>
         <Image src={fancyShape} alt="" className="lazy-img shapes shape_01" />
      </div>
   )
}

export default FancyBannerTwo
