import Image from "next/image"
import Link from "next/link"

import lineShape from "@/assets/images/shape/shape_22.svg";
import CardStyleOne from "@/components/common/CardStyleOne";

const BLockFeatureThree = () => {
   return (
      <>
         <div className="row align-items-center mb-100 lg-mb-50 md-mb-20">
            <div className="col-xxl-6 col-xl-5 col-lg-8">
               <div className="title-one">
                  <div className="fs-14 fw-semibold text-uppercase mb-10" style={{ color: "#B89B5E", letterSpacing: "2px" }}>WHY VELMORA</div>
                  <h2 className="font-garamond m0 lh-1 position-relative">Real Estate, Refined.
                     <Image src={lineShape} alt="" className="lazy-img shapes shape_02" /></h2>
               </div>
            </div>
            <div className="col-xxl-4 col-xl-4">
               <p className="fs-22 m0 color-dark lg-pt-30 lg-pb-50">From considered interiors to carefully chosen addresses, every property in our collection is presented with the details that matter.</p>
            </div>
            <div className="col-xxl-2 col-xl-3 d-inline-flex justify-content-xl-end">
               <Link href="/about_us_01" className="btn-five text-uppercase rounded-0">Our Story</Link>
            </div>
         </div>

         <CardStyleOne style={false} />
      </>
   )
}

export default BLockFeatureThree
