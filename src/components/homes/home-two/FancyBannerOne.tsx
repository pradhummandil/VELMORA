import Image from "next/image"
import FaqOne from "@/components/common/faq/FaqOne"

import fancyImg_1 from "@/assets/images/shape/shape_19.svg"
import fancyImg_2 from "@/assets/images/assets/ils_04.png"
import fancyImg_3 from "@/assets/images/assets/screen_02.jpg"

const FancyBannerOne = () => {

   return (
      <div className="fancy-banner-four position-relative z-1 mt-180 xl-mt-150 lg-mt-120">
         <div className="container">
            <div className="bg-line position-relative z-1 pt-110 xl-pt-80 pb-140 xl-pb-100">
               <div className="row">
                  <div className="col-xl-8 col-lg-9 ms-auto wow fadeInRight">
                     <div className="ps-xxl-5">
                        <div className="title-one mb-50 lg-mb-30">
                           <div className="fs-14 fw-semibold text-uppercase mb-10" style={{ color: "#B89B5E", letterSpacing: "2px" }}>THE VELMORA STANDARD</div>
                           <h2 className="font-garamond fs-xl">Designed Around How You Want to Live.</h2>
                        </div>
                        <div className="row">
                           <div className="col-lg-4">
                              <Image src={fancyImg_1} alt="" className="lazy-img ms-auto d-none d-lg-block me-auto mt-20" />
                           </div>
                           <div className="col-lg-8">
                              <p className="fs-22 color-dark">From considered interiors to carefully chosen addresses, every property in our collection is presented with the details that matter.</p>
                              <div className="accordion accordion-style-one mt-60" id="accordionOne">
                                 <FaqOne />
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <Image src={fancyImg_2} alt="" className="lazy-img shapes illustration" />
         <Image src={fancyImg_3} alt="" className="lazy-img shapes screen_01" />
      </div>
   )
}

export default FancyBannerOne
