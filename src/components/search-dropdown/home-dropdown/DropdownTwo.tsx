"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import NiceSelect from "@/ui/NiceSelect";
import { locationAutocompleteManager, UnifiedLocationSuggestion } from "@/utils/locationAutocomplete";

const tab_title: string[] = ["Buy", "Rent", "Commercial"];

const DropdownTwo = () => {
   const router = useRouter();
   const [activeTab, setActiveTab] = useState(0);
   const [locationInput, setLocationInput] = useState("");
   const [propertyType, setPropertyType] = useState("apartments");
   const [keyword, setKeyword] = useState("");
   const [suggestions, setSuggestions] = useState<UnifiedLocationSuggestion[]>([]);
   const [showSuggestions, setShowSuggestions] = useState(false);
   const locationRef = useRef<HTMLDivElement>(null);

   useEffect(() => {
      if (locationInput.trim().length < 2) {
         setSuggestions([]);
         setShowSuggestions(false);
         return;
      }

      const handler = setTimeout(async () => {
         const results = await locationAutocompleteManager.fetchSuggestions(locationInput);
         setSuggestions(results);
         setShowSuggestions(results.length > 0);
      }, 300);

      return () => clearTimeout(handler);
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

   const handleTabClick = (index: any) => {
      setActiveTab(index);
   };

   const handleSelectSuggestion = (suggestion: UnifiedLocationSuggestion) => {
      setLocationInput(suggestion.title);
      setShowSuggestions(false);
      locationAutocompleteManager.resetSessionToken();
   };

   const searchHandler = (e: React.FormEvent) => {
      e.preventDefault();
      const params = new URLSearchParams();
      if (locationInput.trim()) {
         params.set("location", locationInput.trim());
      }
      if (propertyType) {
         params.set("type", propertyType);
      }
      if (keyword.trim()) {
         params.set("search", keyword.trim());
      }
      if (activeTab === 1) {
         params.set("purpose", "rent");
      } else if (activeTab === 2) {
         params.set("purpose", "commercial");
      } else {
         params.set("purpose", "buy");
      }
      router.push(`/listing_01?${params.toString()}`);
   };

   const propertyTypeOptions = [
      { value: "apartments", text: "Apartment" },
      { value: "villas", text: "Luxury Villa" },
      { value: "penthouses", text: "Sky Penthouse" },
      { value: "houses", text: "Independent House" },
      { value: "plots", text: "Residential Plot" },
      { value: "commercial", text: "Commercial Workspace" },
   ];

   const priceOptions = [
      { value: "1", text: "Under ₹50 Lakh" },
      { value: "2", text: "₹50 Lakh – ₹1.5 Cr" },
      { value: "3", text: "₹1.5 Cr – ₹3.5 Cr" },
      { value: "4", text: "₹3.5 Cr – ₹10 Cr" },
      { value: "5", text: "₹10 Cr+" },
   ];

   return (
      <div className="search-wrapper-one layout-two mt-60 lg-mt-40 position-relative w-100">
         <nav className="search-filter-nav-one d-flex">
            <div className="nav nav-tabs border-0" role="tablist">
               {tab_title.map((tab, index) => (
                  <button key={index} onClick={() => handleTabClick(index)} className={`nav-link ${activeTab === index ? "active" : ""}`} id={`tab-${index}`} type="button">{tab}</button>
               ))}
            </div>
         </nav>

         <div className="bg-wrapper border-0 rounded-0 w-100">
            <div className="tab-content w-100">
               <div className="tab-pane show active w-100">
                  <form onSubmit={searchHandler} className="w-100">
                     <div className="row gx-0 align-items-center w-100 m-0">
                        <div className="col-xl-3 col-md-6 col-12">
                           <div className="input-box-one border-left">
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
                                       style={{ zIndex: 1050, top: "100%", maxHeight: "250px", overflowY: "auto" }}
                                    >
                                       {suggestions.map((item) => (
                                          <li
                                             key={item.id}
                                             className="px-3 py-2 fs-14 cursor-pointer hover-bg-light d-flex align-items-center justify-content-between"
                                             style={{ cursor: "pointer" }}
                                             onMouseDown={() => handleSelectSuggestion(item)}
                                          >
                                             <div>
                                                <i className="bi bi-geo-alt-fill text-muted me-2 fs-12"></i>
                                                <span className="fw-500">{item.title}</span>
                                             </div>
                                             {item.subtitle && (
                                                <span className="text-muted fs-12 ms-2">{item.subtitle}</span>
                                             )}
                                          </li>
                                       ))}
                                    </ul>
                                 )}
                              </div>
                           </div>
                        </div>
                        <div className="col-xl-3 col-md-6 col-12">
                           <div className="input-box-one border-left">
                              <div className="label">Property Type</div>
                              <NiceSelect className="nice-select fw-normal"
                                 options={propertyTypeOptions}
                                 defaultCurrent={0}
                                 onChange={(e: any) => setPropertyType(e.target.value)}
                                 name=""
                                 placeholder="Select category" />
                           </div>
                        </div>
                        <div className="col-xl-3 col-md-6 col-12">
                           <div className="input-box-one border-left">
                              <div className="label">Budget</div>
                              <NiceSelect
                                 className="nice-select fw-normal"
                                 options={priceOptions}
                                 defaultCurrent={2}
                                 onChange={() => {}}
                                 name=""
                                 placeholder="Select price bracket" />
                           </div>
                        </div>
                        <div className="col-xl-2 col-md-6 col-12">
                           <div className="input-box-one border-left">
                              <div className="label">Keyword</div>
                              <input
                                 type="text"
                                 value={keyword}
                                 onChange={(e) => setKeyword(e.target.value)}
                                 placeholder="Sea view, pool, terrace"
                                 className="type-input"
                              />
                           </div>
                        </div>
                        <div className="col-xl-1 col-12">
                           <div className="input-box-one lg-mt-10 p-0 text-center">
                              <button type="submit" aria-label="Search Properties" className="fw-500 text-uppercase tran3s search-btn-two w-100 d-inline-flex align-items-center justify-content-center">
                                 <i className="fa-light fa-magnifying-glass"></i>
                              </button>
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
