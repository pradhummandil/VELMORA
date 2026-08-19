import FaqTwo from "@/components/common/faq/FaqTwo"
import Image from "next/image"
import Link from "next/link"

import faqShape from "@/assets/images/shape/shape_29.svg"

const FAQ = () => {
   return (
      <div className="faq-section-one position-relative z-1 mt-170 xl-mt-120">
         <div className="container">
            <div className="row">
               <div className="col-lg-5 wow fadeInLeft">
                  <div className="title-one mb-40 lg-mb-20">
                     <div className="fs-14 fw-semibold text-uppercase mb-10" style={{ color: "#B89B5E", letterSpacing: "2px" }}>ADVISORY FAQ</div>
                     <h2 className="font-garamond">Frequently Asked Questions</h2>
                     <p className="fs-20 mt-xs pt-20 md-pt-10">Key insights into RERA verification, private viewings, and luxury property transactions in India.</p>
                  </div>
                  <Link href="/faq" className="btn-five sm text-uppercase rounded-0">Explore All FAQs</Link>
               </div>

               <div className="col-lg-7">
                  <div className="accordion-style-two md-mt-40">
                     <div className="accordion" id="accordionTwo">
                        <FaqTwo />
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <Image src={faqShape} alt="" className="lazy-img shapes shape_01" />
      </div>
   )
}

export default FAQ
