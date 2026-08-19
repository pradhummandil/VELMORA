import Image from "next/image";
import Link from "next/link";
import project_data from "@/data/inner-data/ProjectData";

const SignatureProjects = () => {
   // Select top 4 landmark projects
   const signatureList = project_data.filter(p => p.page === "project_3").slice(0, 4);

   return (
      <div className="project-section-two mt-150 xl-mt-120 position-relative z-1">
         <div className="container">
            <div className="position-relative">
               <div className="d-flex justify-content-between align-items-end flex-wrap mb-40 lg-mb-20 wow fadeInUp">
                  <div className="title-one">
                     <div className="fs-14 fw-semibold text-uppercase mb-10" style={{ color: "#B89B5E", letterSpacing: "2px" }}>SIGNATURE DEVELOPMENTS</div>
                     <h2 className="font-garamond">Signature Developments</h2>
                     <p className="fs-22 mt-xs">Explore distinctive developments shaped around architecture, location and contemporary living.</p>
                  </div>
                  <Link href="/project_01" className="btn-eight mb-10 d-none d-md-inline-flex">
                     <span>Explore All Developments</span> <i className="bi bi-arrow-up-right"></i>
                  </Link>
               </div>

               <div className="row gx-xxl-5">
                  {signatureList.map((project, idx) => (
                     <div key={project.id} className="col-lg-6 col-md-6 d-flex mt-35 wow fadeInUp" data-wow-delay={`${idx * 0.1}s`}>
                        <div className="project-card-one w-100 position-relative overflow-hidden border-20" style={{ minHeight: "380px", borderRadius: "16px" }}>
                           <Image 
                              src={project.thumb} 
                              alt={project.title || "Signature Development"} 
                              className="w-100 h-100 object-fit-cover position-absolute top-0 start-0"
                              style={{ transition: "transform 0.5s ease" }}
                           />
                           <div 
                              className="position-absolute bottom-0 start-0 w-100 p-30 d-flex justify-content-between align-items-end"
                              style={{ background: "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(23,23,23,0.92) 100%)", borderRadius: "0 0 16px 16px" }}
                           >
                              <div>
                                 <span className="fs-14 text-white text-uppercase tracking-wider fw-medium d-block mb-5" style={{ color: "#B89B5E" }}>
                                    {project.tag || "LUXURY"}
                                 </span>
                                 <h4 className="font-garamond text-white mb-5">{project.title}</h4>
                                 <span className="fs-16 text-white opacity-75">{project.date ? `Completed ${project.date}` : "Prime Location"}</span>
                              </div>
                              <Link href="/project_details_01" className="btn-four rounded-circle flex-shrink-0 ms-3" aria-label={`Explore ${project.title || 'Development'}`}>
                                 <i className="bi bi-arrow-up-right"></i>
                              </Link>
                           </div>
                        </div>
                     </div>
                  ))}
               </div>

               <div className="section-btn text-center mt-50 d-md-none">
                  <Link href="/project_01" className="btn-eight">
                     <span>Explore All Developments</span> <i className="bi bi-arrow-up-right"></i>
                  </Link>
               </div>
            </div>
         </div>
      </div>
   );
};

export default SignatureProjects;
