import Image from "next/image";
import Link from "next/link";
import agent_data from "@/data/home-data/AgentData";

const Advisors = () => {
   // Select top 4 advisors
   const advisorList = agent_data.filter(a => a.page === "home_1").slice(0, 4);

   return (
      <div className="agent-section-one position-relative z-1 mt-150 xl-mt-120">
         <div className="container">
            <div className="position-relative">
               <div className="d-flex justify-content-between align-items-end flex-wrap mb-40 lg-mb-20 wow fadeInUp">
                  <div className="title-one">
                     <div className="fs-14 fw-semibold text-uppercase mb-10" style={{ color: "#B89B5E", letterSpacing: "2px" }}>ADVISORY DESK</div>
                     <h2 className="font-garamond">Meet Your Property Advisors</h2>
                     <p className="fs-22 mt-xs">Local expertise for decisions that deserve more attention.</p>
                  </div>
                  <Link href="/agent" className="btn-eight mb-10 d-none d-md-inline-flex">
                     <span>Meet Entire Advisory</span> <i className="bi bi-arrow-up-right"></i>
                  </Link>
               </div>

               <div className="row gx-xxl-5">
                  {advisorList.map((advisor) => (
                     <div key={advisor.id} className="col-lg-3 col-sm-6 d-flex mt-30 wow fadeInUp" data-wow-delay="0.1s">
                        <div className="agent-card-one w-100 position-relative overflow-hidden border-20 p-0" style={{ borderRadius: "16px", background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.06)" }}>
                           <div className="img position-relative overflow-hidden" style={{ height: "320px", borderRadius: "16px 16px 0 0" }}>
                              <Image 
                                 src={advisor.thumb} 
                                 alt={advisor.title} 
                                 className="w-100 h-100 object-fit-cover tran5s" 
                              />
                           </div>
                           <div className="p-25 text-center">
                              <h6 className="fs-20 font-garamond mb-5">{advisor.title}</h6>
                              <span className="fs-14 text-uppercase fw-medium d-block mb-10" style={{ color: "#B89B5E", letterSpacing: "1px" }}>
                                 {advisor.desc}
                              </span>
                              <Link href="/agent_details" className="fs-14 fw-semibold color-dark" aria-label={`View profile of ${advisor.title}`}>
                                 View Profile &rarr;
                              </Link>
                           </div>
                        </div>
                     </div>
                  ))}
               </div>

               <div className="section-btn text-center mt-50 d-md-none">
                  <Link href="/agent" className="btn-eight">
                     <span>Meet Entire Advisory</span> <i className="bi bi-arrow-up-right"></i>
                  </Link>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Advisors;
