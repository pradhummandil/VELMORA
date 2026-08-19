import Image from "next/image"
import Link from "next/link"

import titleShape from "@/assets/images/shape/title_shape_02.svg"
import errorImg from "@/assets/images/assets/ils_08.svg"

const ErrorArea = () => {
   return (
      <div className="error-section position-relative z-1 bg-pink">
         <div className="container">
            <div className="row">
               <div className="col-xxl-8 col-xl-6 col-lg-7 col-md-8 m-auto">
                  <div className="title-one text-center mb-75 lg-mb-20 wow fadeInUp">
                     <div className="fs-14 fw-semibold text-uppercase mb-15" style={{ color: "#B89B5E", letterSpacing: "2px" }}>PAGE NOT FOUND</div>
                     <h2 className="font-garamond">We couldn&apos;t find that address.</h2>
                     <p className="fs-20 pb-45">The residence or page you are looking for might have been moved, sold, or is no longer available.</p>
                     <div className="d-inline-flex align-items-center justify-content-center flex-wrap gap-3">
                        <Link href="/" className="btn-five sm fw-normal text-uppercase">Return Home</Link>
                        <Link href="/listing_01" className="btn-two sm fw-normal text-uppercase">Explore Properties</Link>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <Image src={errorImg} alt="" className="lazy-img w-100 position-absolute bottom-0 start-0 z-n1" />
      </div>
   )
}

export default ErrorArea
