"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import NiceSelect from "@/ui/NiceSelect";
import Link from "next/link";
import { INDIAN_LOCATION_SUGGESTIONS } from "@/data/home-data/LocationSuggestions";

const ammenities_data: string[] = ["A/C & Heating", "Garages", "Garden", "Disabled Access", "Swimming Pool", "Parking", "Wifi", "Pet Friendly", "Ceiling Height", "Fireplace", "Play Ground", "Elevator"];

const DropdownModal = () => {
   const router = useRouter();
   const [propertyType, setPropertyType] = useState("apartments");
   const [locationInput, setLocationInput] = useState("");
   const [keyword, setKeyword] = useState("");
   const [bedroom, setBedroom] = useState("");
   const [bathroom, setBathroom] = useState("");
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

   const handleSearch = (e: React.FormEvent) => {
      e.preventDefault();
      const params = new URLSearchParams();
      if (locationInput.trim()) params.set("location", locationInput.trim());
      if (propertyType) params.set("type", propertyType);
      if (keyword.trim()) params.set("search", keyword.trim());
      router.push(`/listing_01?${params.toString()}`);
   };

   return (
      <div className="home-dropdown modal fade" id="advanceFilterModal" tabIndex={-1} aria-hidden="true">
         <div className="modal-dialog modal-dialog-centered">
            <div className="container">
               <div className="row">
                  <div className="col-xl-8 m-auto">
                     <div className="modal-content">
                        <button type="button" className="btn-close ms-auto mt-20 me-4" data-bs-dismiss="modal"
                           aria-label="Close"><i className="fa-regular fa-xmark"></i></button>
                        <div className="advance-search-panel">
                           <div className="main-bg border-0">
                              <form onSubmit={handleSearch}>
                                 <div className="row gx-lg-5">
                                    <div className="col-md-6">
                                       <div className="input-box-one mb-35">
                                          <div className="label">I’m looking to...</div>
                                          <NiceSelect className="nice-select fw-normal"
                                             options={[
                                                { value: "apartments", text: "Buy Apartments" },
                                                { value: "condos", text: "Rent Condos" },
                                                { value: "houses", text: "Sell Houses" },
                                                { value: "industrial", text: "Rent Industrial" },
                                                { value: "villas", text: "Sell Villas" },
                                             ]}
                                             defaultCurrent={0}
                                             onChange={(e: any) => setPropertyType(e.target.value)}
                                             name=""
                                             placeholder="" />
                                       </div>
                                    </div>
                                    <div className="col-md-6">
                                       <div className="input-box-one mb-35">
                                          <div className="label">Location</div>
                                          <div className="position-relative" ref={locationRef}>
                                             <input
                                                type="text"
                                                value={locationInput}
                                                onChange={(e) => setLocationInput(e.target.value)}
                                                placeholder="Search city, locality, or area..."
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
                                    <div className="col-md-6">
                                       <div className="input-box-one mb-35">
                                          <div className="label">Keyword</div>
                                          <input
                                             type="text"
                                             value={keyword}
                                             onChange={(e) => setKeyword(e.target.value)}
                                             placeholder="Sea Face, Penthouse, Duplex"
                                             className="type-input"
                                          />
                                       </div>
                                    </div>
                                    <div className="col-md-6">
                                       <div className="input-box-one mb-35">
                                          <div className="label">Property ID</div>
                                          <input type="text" placeholder="VM-WORLI-401" className="type-input" />
                                       </div>
                                    </div>

                                    <div className="col-lg-6">
                                       <div className="input-box-one mb-40">
                                          <div className="label">Bedroom</div>
                                          <NiceSelect className="nice-select fw-normal"
                                             options={[
                                                { value: "1", text: "1" },
                                                { value: "2", text: "2" },
                                                { value: "3", text: "3" },
                                                { value: "4", text: "4+" },
                                             ]}
                                             defaultCurrent={0}
                                             onChange={(e: any) => setBedroom(e.target.value)}
                                             name=""
                                             placeholder="" />
                                       </div>
                                    </div>
                                    <div className="col-lg-6">
                                       <div className="input-box-one mb-40">
                                          <div className="label">Bath</div>
                                          <NiceSelect className="nice-select fw-normal"
                                             options={[
                                                { value: "1", text: "1" },
                                                { value: "2", text: "2" },
                                                { value: "3", text: "3" },
                                                { value: "4", text: "4+" },
                                             ]}
                                             defaultCurrent={0}
                                             onChange={(e: any) => setBathroom(e.target.value)}
                                             name=""
                                             placeholder="" />
                                       </div>
                                    </div>
                                    <div className="col-12">
                                       <h6 className="block-title fw-bold mb-30">Amenities</h6>
                                       <ul className="style-none d-flex flex-wrap justify-content-between filter-input">
                                          {ammenities_data.map((list, i) => (
                                             <li key={i}>
                                                <input type="checkbox" name="Amenities" value={`${i}`} />
                                                <label>{list}</label>
                                             </li>
                                          ))}
                                       </ul>
                                    </div>
                                    <div className="col-md-6">
                                       <h6 className="block-title fw-bold mt-45 mb-20">Price range (INR)</h6>
                                       <div className="price-ranger">
                                          <div
                                             className="price-input d-flex align-items-center justify-content-between pt-5">
                                             <div className="field d-flex align-items-center">
                                                <input type="number" className="input-min" defaultValue="10000000" onChange={(e) => (e.target.value)} />
                                             </div>
                                             <div className="divider-line"></div>
                                             <div className="field d-flex align-items-center">
                                                <input type="number" className="input-max" defaultValue="100000000" />
                                             </div>
                                             <div className="currency ps-1">INR</div>
                                          </div>
                                          <div className="slider">
                                             <div className="progress"></div>
                                          </div>
                                          <div className="range-input mb-10">
                                             <input type="range" className="range-min" min="5000000" max="200000000" defaultValue="10000000"
                                                step="1000000" />
                                             <input type="range" className="range-max" min="5000000" max="200000000" defaultValue="100000000"
                                                step="1000000" />
                                          </div>
                                       </div>
                                    </div>
                                    <div className="col-md-6">
                                       <h6 className="block-title fw-bold mt-45 mb-20">SQFT</h6>
                                       <div className="d-flex align-items-center sqf-ranger">
                                          <input type="text" placeholder="Min" />
                                          <div className="divider"></div>
                                          <input type="text" placeholder="Max" />
                                       </div>
                                    </div>
                                    <div className="col-12">
                                       <button className="fw-500 text-uppercase tran3s apply-search w-100 mt-40 mb-25">
                                          <i className="fa-light fa-magnifying-glass"></i>
                                          <span>Search</span>
                                       </button>
                                    </div>
                                    <div className="col-12">
                                       <div className="d-flex justify-content-between form-widget">
                                          <Link href="#" className="tran3s">
                                             <i className="fa-regular fa-arrows-rotate"></i>
                                             <span>Reset Filter</span>
                                          </Link>
                                          <Link href="#" className="tran3s">
                                             <i className="fa-regular fa-star"></i>
                                             <span>Save Search</span>
                                          </Link>
                                       </div>
                                    </div>
                                 </div>
                              </form>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default DropdownModal
