import Link from "next/link";

interface StepItem {
   step: string;
   title: string;
   desc: string;
}

const steps: StepItem[] = [
   {
      step: "01",
      title: "Discover",
      desc: "Explore curated homes, luxury developments, and architectural residences across India's leading micro-markets."
   },
   {
      step: "02",
      title: "Compare",
      desc: "Evaluate properties based on micro-location, RERA compliance, layout specifications, and lifestyle value."
   },
   {
      step: "03",
      title: "Connect",
      desc: "Engage directly with dedicated VELMORA luxury advisors for private viewings and discrete acquisition."
   }
];

const HowItWorks = () => {
   return (
      <div className="how-it-works-section mt-150 xl-mt-120 position-relative z-1">
         <div className="container">
            <div className="position-relative">
               <div className="title-one text-center mb-60 lg-mb-40 wow fadeInUp">
                  <div className="fs-14 fw-semibold text-uppercase mb-10" style={{ color: "#B89B5E", letterSpacing: "2px" }}>ACQUISITION JOURNEY</div>
                  <h2 className="font-garamond">A Better Way to Find Property</h2>
                  <p className="fs-22 mt-xs">A transparent, structured process designed for thoughtful real estate decisions.</p>
               </div>

               <div className="row gx-xxl-5">
                  {steps.map((item, idx) => (
                     <div key={idx} className="col-lg-4 col-md-6 d-flex mt-30 wow fadeInUp" data-wow-delay={`${idx * 0.1}s`}>
                        <div 
                           className="w-100 p-40 d-flex flex-column justify-content-between"
                           style={{ 
                              background: "#FFFFFF", 
                              borderRadius: "16px", 
                              border: "1px solid rgba(0, 0, 0, 0.06)",
                              boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.03)"
                           }}
                        >
                           <div>
                              <div 
                                 className="font-garamond fw-bold mb-25"
                                 style={{ fontSize: "42px", color: "#B89B5E", lineHeight: "1" }}
                              >
                                 {item.step}
                              </div>
                              <h4 className="font-garamond mb-15">{item.title}</h4>
                              <p className="fs-18 color-dark opacity-75 m-0">{item.desc}</p>
                           </div>
                           <div className="pt-30">
                              <Link href="/listing_01" className="fs-15 fw-semibold text-uppercase" style={{ color: "#171717", letterSpacing: "1px" }}>
                                 Explore Step &rarr;
                              </Link>
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </div>
   );
};

export default HowItWorks;
