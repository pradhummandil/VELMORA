"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import NiceSelect from "@/ui/NiceSelect";

import { INDIAN_LOCATION_SUGGESTIONS } from "@/data/home-data/LocationSuggestions";

const DropdownOne = ({ style }: any) => {
  const router = useRouter();
  const [propertyType, setPropertyType] = useState("apartments");
  const [locationInput, setLocationInput] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const locationRef = useRef<HTMLDivElement>(null);

  // Filter suggestions based on input
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

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (locationRef.current && !locationRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectCity = (city: string) => {
    setLocationInput(city);
    setShowSuggestions(false);
  };

  const handleSearch = (e: React.FormEvent) => {
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

  const selectHandler = (e: any) => {
    if (e?.target?.value) {
      setPropertyType(e.target.value);
    }
  };

  return (
    <form onSubmit={handleSearch}>
      <div className="row gx-0 align-items-center">
        <div className="col-xl-3 col-lg-4">
          <div className="input-box-one border-left">
            <div className="label">I&apos;m looking to...</div>
            <NiceSelect
              className={`nice-select ${style ? "fw-normal" : ""}`}
              options={[
                { value: "apartments", text: "Buy Apartments" },
                { value: "villas", text: "Buy Villas" },
                { value: "penthouse", text: "Buy Penthouse" },
                { value: "rent", text: "Rent Luxury Homes" },
                { value: "invest", text: "Invest in Properties" },
              ]}
              defaultCurrent={0}
              onChange={selectHandler}
              name=""
              placeholder=""
            />
          </div>
        </div>

        <div className={`${style ? "col-xl-3" : "col-xl-4"} col-lg-4`}>
          <div className="input-box-one border-left">
            <div className="label">Location</div>
            <div className="position-relative" ref={locationRef}>
              <input
                type="text"
                value={locationInput}
                onChange={(e) => setLocationInput(e.target.value)}
                placeholder="Search city or area in India..."
                className={`nice-select border-0 bg-transparent w-100 ${style ? "fw-normal" : ""}`}
                style={{
                  outline: "none",
                  boxShadow: "none",
                  fontSize: "15px",
                  cursor: "text",
                }}
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
                      onMouseDown={() => handleSelectCity(city)}
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
              className={`nice-select ${style ? "fw-normal" : ""}`}
              options={[
                { value: "any", text: "Any Budget" },
                { value: "upto2cr", text: "Upto ₹2 Crore" },
                { value: "2to5cr", text: "₹2 Cr – ₹5 Cr" },
                { value: "5to10cr", text: "₹5 Cr – ₹10 Cr" },
                { value: "above10cr", text: "Above ₹10 Crore" },
              ]}
              defaultCurrent={0}
              onChange={() => {}}
              name=""
              placeholder=""
            />
          </div>
        </div>

        <div className={`${style ? "col-xl-3" : "col-xl-2"}`}>
          <div className="input-box-one lg-mt-10">
            <button
              type="submit"
              className={`fw-500 tran3s ${style ? "w-100 tran3s search-btn-three" : "text-uppercase search-btn"}`}
            >
              {style ? "Search Now" : "Search"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default DropdownOne;
