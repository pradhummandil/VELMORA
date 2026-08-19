import feature_data from "@/data/home-data/FeatureData"
import Link from "next/link"

const BLockFeatureOne = () => {
   return (
      <div className="block-feature-six mt-150 xl-mt-100">
         <div className="container">
            <div className="position-relative z-1">
               <div className="row">
                  <div className="col-xl-9 m-auto">
                     <div className="title-one text-center mb-35 lg-mb-20 wow fadeInUp">
                        <div className="fs-14 fw-semibold text-uppercase mb-10" style={{ color: "#B89B5E", letterSpacing: "2px" }}>PRIME DESTINATIONS</div>
                        <h2 className="font-garamond">Explore India’s Finest Addresses</h2>
                        <p className="fs-22 mt-xs">From Mumbai’s skyline to Goa’s coastal villas, discover properties across India’s most desirable destinations.</p>
                     </div>
                  </div>
               </div>

               <div className="row gx-xxl-5">
                  {feature_data.filter((items) => items.page === "home_2_feature_1").map((item) => (
                     <div key={item.id} className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay={item.data_delay_time}>
                        <div className={`location-card-two position-relative z-1 d-flex align-items-center justify-content-center mt-30 ${item.item_bg}`}>
                           <div className="content text-center">
                              <h5 className="text-white font-garamond mb-5">{item.title}</h5>
                              <span className="text-white opacity-75 fs-16 d-block">Explore residences &rarr;</span>
                           </div>
                           <Link href="/listing_01" className="stretched-link" aria-label={`Explore residences in ${item.title}`}></Link>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </div>
   )
}

export default BLockFeatureOne
