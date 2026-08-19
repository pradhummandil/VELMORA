"use client";

import DashboardHeaderTwo from "@/layouts/headers/dashboard/DashboardHeaderTwo";
import Link from "next/link";

const SavedSearchBody = () => {
   return (
      <div className="dashboard-body">
         <div className="position-relative">
            <DashboardHeaderTwo title="Saved Search" />
            <h2 className="main-title d-block d-lg-none">Saved Search</h2>

            <div className="bg-white card-box border-20 text-center py-5 px-4">
               <div className="py-5" style={{ maxWidth: "500px", margin: "0 auto" }}>
                  <i className="fa-light fa-magnifying-glass-location text-muted fs-1 mb-3 d-block"></i>
                  <h4 className="font-garamond color-dark mb-15">No saved searches yet.</h4>
                  <p className="fs-16 text-muted mb-30">Save your custom filter criteria and search preferences to quickly return to matching luxury residences.</p>
                  <Link href="/listing_01" className="btn-two">Explore Properties</Link>
               </div>
            </div>
         </div>
      </div>
   );
};

export default SavedSearchBody;

