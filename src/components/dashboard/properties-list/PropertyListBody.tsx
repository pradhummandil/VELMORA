"use client";

import DashboardHeaderTwo from "@/layouts/headers/dashboard/DashboardHeaderTwo";
import Link from "next/link";

const PropertyListBody = () => {
   return (
      <div className="dashboard-body">
         <div className="position-relative">
            <DashboardHeaderTwo title="My Properties" />
            <h2 className="main-title d-block d-lg-none">My Properties</h2>

            <div className="bg-white card-box border-20 text-center py-5 px-4 mt-20">
               <div className="py-5" style={{ maxWidth: "500px", margin: "0 auto" }}>
                  <i className="fa-light fa-city text-muted fs-1 mb-3 d-block"></i>
                  <h4 className="font-garamond color-dark mb-15">No properties listed yet.</h4>
                  <p className="fs-16 text-muted mb-30">Add a new luxury residence to manage your portfolio, track inquiries, and view performance metrics.</p>
                  <Link href="/dashboard/add-property" className="btn-two">Add New Property</Link>
               </div>
            </div>
         </div>
      </div>
   );
};

export default PropertyListBody;

