"use client"
import { useState } from "react";
import NiceSelect from "@/ui/NiceSelect";

const tab_title: string[] = ["Buy", "Rent", "Commercial"];

const DropdownTwo = () => {

   const selectHandler = (e: any) => { };
   const [activeTab, setActiveTab] = useState(0);

   const handleTabClick = (index: any) => {
      setActiveTab(index);
   };

   const searchHandler = () => {
      window.location.href = '/listing_01';
   };

   const propertyTypeOptions = [
      { value: "apartments", text: "Apartment" },
      { value: "villas", text: "Luxury Villa" },
      { value: "penthouses", text: "Sky Penthouse" },
      { value: "houses", text: "Independent House" },
      { value: "plots", text: "Residential Plot" },
      { value: "commercial", text: "Commercial Workspace" },
   ];

   const locationOptions = [
      { value: "mumbai", text: "Worli, Mumbai" },
      { value: "gurugram", text: "Golf Course Rd, Gurugram" },
      { value: "bengaluru", text: "Indiranagar, Bengaluru" },
      { value: "hyderabad", text: "Jubilee Hills, Hyderabad" },
      { value: "pune", text: "Koregaon Park, Pune" },
      { value: "goa", text: "Assagao, Goa" },
      { value: "delhi", text: "Chanakyapuri, New Delhi" },
      { value: "noida", text: "Sector 128, Noida" },
   ];

   const priceOptions = [
      { value: "1", text: "Under ₹50 Lakh" },
      { value: "2", text: "₹50 Lakh – ₹1.5 Cr" },
      { value: "3", text: "₹1.5 Cr – ₹3.5 Cr" },
      { value: "4", text: "₹3.5 Cr – ₹10 Cr" },
      { value: "5", text: "₹10 Cr+" },
   ];

   return (
      <div className="search-wrapper-one layout-two mt-60 lg-mt-40 position-relative">
         <nav className="search-filter-nav-one d-flex">
            <div className="nav nav-tabs border-0" role="tablist">
               {tab_title.map((tab, index) => (
                  <button key={index} onClick={() => handleTabClick(index)} className={`nav-link ${activeTab === index ? "active" : ""}`} id={`tab-${index}`} type="button">{tab}</button>
               ))}
            </div>
         </nav>

         <div className="bg-wrapper border-0 rounded-0">
            <div className="tab-content">
               <div className="tab-pane show active">
                  <form onSubmit={(e) => { e.preventDefault(); searchHandler(); }}>
                     <div className="row gx-0 align-items-center">
                        <div className="col-xl-3 col-md-6">
                           <div className="input-box-one border-left">
                              <div className="label">Location</div>
                              <NiceSelect className="nice-select location fw-normal"
                                 options={locationOptions}
                                 defaultCurrent={0}
                                 onChange={selectHandler}
                                 name=""
                                 placeholder="Select city or micro-market" />
                           </div>
                        </div>
                        <div className="col-xl-3 col-md-6">
                           <div className="input-box-one border-left">
                              <div className="label">Property Type</div>
                              <NiceSelect className="nice-select fw-normal"
                                 options={propertyTypeOptions}
                                 defaultCurrent={0}
                                 onChange={selectHandler}
                                 name=""
                                 placeholder="Select category" />
                           </div>
                        </div>
                        <div className="col-xl-3 col-md-6">
                           <div className="input-box-one border-left">
                              <div className="label">Budget</div>
                              <NiceSelect
                                 className="nice-select fw-normal"
                                 options={priceOptions}
                                 defaultCurrent={2}
                                 onChange={selectHandler}
                                 name=""
                                 placeholder="Select price bracket" />
                           </div>
                        </div>
                        <div className="col-xl-2 col-md-6">
                           <div className="input-box-one border-left">
                              <div className="label">Keyword</div>
                              <input type="text" placeholder="Sea view, pool, terrace" className="type-input" />
                           </div>
                        </div>
                        <div className="col-xl-1">
                           <div className="input-box-one lg-mt-10">
                              <button aria-label="Search Properties" className="fw-500 text-uppercase tran3s search-btn-two"><i
                                 className="fa-light fa-magnifying-glass"></i></button>
                           </div>
                        </div>
                     </div>
                  </form>
               </div>
            </div>
         </div>
      </div>
   )
}

export default DropdownTwo;
