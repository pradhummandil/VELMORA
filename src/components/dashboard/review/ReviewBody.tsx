"use client";

import DashboardHeaderTwo from "@/layouts/headers/dashboard/DashboardHeaderTwo";
import Link from "next/link";

const ReviewBody = () => {
   return (
      <div className="dashboard-body">
         <div className="position-relative">
            <DashboardHeaderTwo title="Reviews" />
            <h2 className="main-title d-block d-lg-none">Reviews</h2>

            <div className="bg-white card-box border-20 text-center py-5 px-4 mt-20">
               <div className="py-5" style={{ maxWidth: "500px", margin: "0 auto" }}>
                  <i className="fa-light fa-star-half-stroke text-muted fs-1 mb-3 d-block"></i>
                  <h4 className="font-garamond color-dark mb-15">No reviews yet.</h4>
                  <p className="fs-16 text-muted mb-30">Client feedback, testimonials, and advisor ratings for your listed residences will appear here.</p>
                  <Link href="/listing_01" className="btn-two">Explore Residences</Link>
               </div>
            </div>
         </div>
      </div>
   );
};

export default ReviewBody;

