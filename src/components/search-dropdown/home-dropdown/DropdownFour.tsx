"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import NiceSelect from "@/ui/NiceSelect";
import { INDIAN_LOCATION_SUGGESTIONS } from "@/data/home-data/LocationSuggestions";

const tab_title: string[] = ["Buy", "Rent", "Sell"];

const DropdownFour = () => {
   const router = useRouter();
   const [activeTab, setActiveTab] = useState(0);
   const [locationInput, setLocationInput] = useState("");
   const [propertyType, setPropertyType] = useState("apartments");
   const [suggestions, setSuggestions] = useState<string[]>([]);
   const [showSuggestions, setShowSuggestions] = useState(false);
   const locationRef = useRef<HTMLDivElement>(null);

   useEffect(() => {
      if (locationInput.trim().length < 1) {
         setSuggestions([]);
         setShowSuggestions(false);
         return;
      }
      const filtered = INDIAN_LOCATION_SUGGESTIONS.filter((city) =>
         city.toLowerCase().includes(locationInput.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 6));
      setShowSuggestions(filtered.length > 0);
   }, [locationInput]);

   useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => {
         if (locationRef.current && !locationRef.current.contains(e.target as Node)) {
            setShowSuggestions(false);
         }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
   }, []);

   const searchHandler = (e: React.FormEvent) => {
      e.preventDefault();
      const params = new URLSearchParams();
      if (locationInput.trim()) params.set("location", locationInput.trim());
      if (propertyType) params.set("type", propertyType);
      router.push(`/listing_01?${params.toString()}`);
   };

   return (
      <div className="search-wrapper-two position-relative ms-xl-5 ms-lg-4 ps-xxl-4 md-mt-60">
         <nav className="search-filter-nav-two d-inline-flex">
            <div className="nav nav-tabs border-0" role="tablist">
               {tab_title.map((tab, index) => (
                  <button key={index} onClick={() => setActiveTab(index)} className={`nav-link ${activeTab === index ? "active" : ""}`} id="buy-tab" type="button">{tab}</button>
               ))}
            </div>
         </nav>

         <div className="bg-wrapper position-relative z-1">
            <h4 className="mb-35 xl-mb-30">Find & Buy Now!</h4>
            <div className="tab-content">
               <div className="tab-pane show active">
                  <form onSubmit={searchHandler}>
                     <div className="row gx-0 align-items-center">
                        <div className="col-12">
                           <div className="input-box-one bottom-border mb-25">
                              <div className="label">I’m looking to...</div>
                              <NiceSelect className="nice-select fw-normal"
                                 options={[
                                    { value: "apartments", text: "Buy Apartments" },
                                    { value: "condos", text: "Rent Condos" },
                                    { value: "houses", text: "Sell Houses" },
                                    { value: "villas", text: "Sell Villas" },
                                 ]}
                                 defaultCurrent={0}
                                 onChange={(e: any) => setPropertyType(e.target.value)}
                                 name=""
                                 placeholder="" />
                           </div>
                        </div>
                        <div className="col-12">
                           <div className="input-box-one bottom-border mb-25">
                              <div className="label">Location</div>
                              <div className="position-relative" ref={locationRef}>
                                 <input
                                    type="text"
                                    value={locationInput}
                                    onChange={(e) => setLocationInput(e.target.value)}
                                    placeholder="Search city, area, or locality..."
                                    className="nice-select border-0 bg-transparent w-100 fw-normal"
                                    style={{ outline: "none", boxShadow: "none", fontSize: "15px", cursor: "text" }}
                                    autoComplete="off"
                                 />
                                 {showSuggestions && suggestions.length > 0 && (
                                    <ul
                                       className="position-absolute start-0 end-0 bg-white border shadow-sm rounded list-unstyled m-0 py-1"
                                       style={{ zIndex: 1050, top: "100%" }}
                                    >
                                       {suggestions.map((city) => (
                                          <li
                                             key={city}
                                             className="px-3 py-2 fs-14 cursor-pointer hover-bg-light"
                                             style={{ cursor: "pointer" }}
                                             onMouseDown={() => {
                                                setLocationInput(city);
                                                setShowSuggestions(false);
                                             }}
                                          >
                                             <i className="bi bi-geo-alt-fill text-muted me-2 fs-12"></i>
                                             {city}
                                          </li>
                                       ))}
                                    </ul>
                                 )}
                              </div>
                           </div>
                        </div>
                        <div className="col-12">
                           <div className="input-box-one bottom-border mb-50 lg-mb-30">
                              <div className="label">Price Range</div>
                              <NiceSelect
                                 className="nice-select fw-normal"
                                 options={[
                                    { value: "1", text: "₹50 Lakh – ₹1.5 Cr" },
                                    { value: "2", text: "₹1.5 Cr – ₹3.5 Cr" },
                                    { value: "3", text: "₹3.5 Cr – ₹10 Cr+" },
                                 ]}
                                 defaultCurrent={0}
                                 onChange={() => {}}
                                 name=""
                                 placeholder="" />
                           </div>
                        </div>
                        <div className="col-12">
                           <div className="input-box-one">
                              <button type="submit" className="btn-five text-uppercase rounded-0 w-100">Search</button>
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

export default DropdownFour;
