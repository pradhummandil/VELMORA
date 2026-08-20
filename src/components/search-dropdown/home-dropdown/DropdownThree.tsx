"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import NiceSelect from "@/ui/NiceSelect";
import { INDIAN_LOCATION_SUGGESTIONS } from "@/data/home-data/LocationSuggestions";

const DropdownThree = () => {
   const router = useRouter();
   const [propertyType, setPropertyType] = useState("apartments");
   const [locationInput, setLocationInput] = useState("");
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
      if (locationInput.trim()) {
         params.set("location", locationInput.trim());
      }
      if (propertyType) {
         params.set("type", propertyType);
      }
      router.push(`/listing_01?${params.toString()}`);
   };

   return (
      <form onSubmit={searchHandler}>
         <div className="row gx-0 align-items-center">
            <div className="col-xl-3 col-lg-4">
               <div className="input-box-one border-left">
                  <div className="label">I’m looking to...</div>
                  <NiceSelect className="nice-select fw-normal"
                     options={[
                        { value: "apartments", text: "Buy Apartments" },
                        { value: "villas", text: "Buy Villas" },
                        { value: "condos", text: "Rent Luxury Flats" },
                        { value: "houses", text: "Sell Houses" },
                        { value: "industrial", text: "Commercial Spaces" },
                     ]}
                     defaultCurrent={0}
                     onChange={(e: any) => setPropertyType(e.target.value)}
                     name=""
                     placeholder="" />
               </div>
            </div>
            <div className="col-xl-3 col-lg-4">
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
            <div className="col-xl-3 col-lg-4">
               <div className="input-box-one border-left border-lg-0">
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
            <div className="col-xl-3">
               <div className="input-box-one lg-mt-10">
                  <button type="submit" className="fw-500 w-100 tran3s search-btn-three">Search Now</button>
               </div>
            </div>
         </div>
      </form>
   );
};

export default DropdownThree;
