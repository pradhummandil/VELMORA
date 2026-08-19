import NiceSelect from "@/ui/NiceSelect"
import Link from "next/link";
import ListingDropdownModal from "@/modals/ListingDropdownModal";

const DropdownSeven = ({
   handleBathroomChange,
   handleBedroomChange,
   handleSearchChange,
   handlePriceChange,
   maxPrice,
   priceValue,
   handleResetFilter,
   selectedAmenities,
   handleAmenityChange,
   handleLocationChange,
   handleStatusChange,
   handlePriceDropChange }: any) => {

   const selectHandler = (e: any) => { };

   return (
      <>
         <form onSubmit={(e) => e.preventDefault()}>
            <div className="row gx-0 align-items-center">
               <div className="col-xxl-2 col-xl-3 col-sm-6">
                  <div className="input-box-one border-left">
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
                        onChange={handleStatusChange}
                        name=""
                        placeholder="" />
                  </div>
               </div>
               <div className="col-xl-3 col-sm-6">
                  <div className="input-box-one border-left">
                     <div className="label">Location</div>
                     <NiceSelect className="nice-select location fw-normal"
                        options={[
                           { value: "mumbai", text: "Worli, Mumbai" },
                           { value: "gurugram", text: "Golf Course Rd, Gurugram" },
                           { value: "bengaluru", text: "Indiranagar, Bengaluru" },
                           { value: "hyderabad", text: "Jubilee Hills, Hyderabad" },
                           { value: "delhi", text: "Chanakyapuri, New Delhi" },
                           { value: "pune", text: "Koregaon Park, Pune" },
                           { value: "goa", text: "Assagao, Goa" },
                        ]}
                        defaultCurrent={0}
                        onChange={handleLocationChange}
                        name=""
                        placeholder="" />
                  </div>
               </div>
               <div className="col-xl-3 col-sm-4">
                  <div className="input-box-one border-left">
                     <div className="label">Price Range</div>
                     <NiceSelect
                        className="nice-select fw-normal"
                        options={[
                           { value: "1", text: "Under ₹1 Cr" },
                           { value: "2", text: "₹1 Cr - ₹3 Cr" },
                           { value: "3", text: "₹3 Cr - ₹5 Cr" },
                           { value: "4", text: "₹5 Cr - ₹10 Cr" },
                           { value: "5", text: "₹10 Cr+" },
                        ]}
                        defaultCurrent={0}
                        onChange={(event) => handlePriceDropChange(event.target.value)}
                        name=""
                        placeholder=""
                     />
                  </div>
               </div>
               <div className="col-xl-1 col-sm-4 col-6">
                  <div className="input-box-one border-left">
                     <div className="label">Bedroom</div>
                     <NiceSelect className="nice-select fw-normal"
                        options={[
                           { value: "0", text: "Any" },
                           { value: "1", text: "1+" },
                           { value: "2", text: "2+" },
                           { value: "3", text: "3+" },
                           { value: "4", text: "4+" },
                        ]}
                        defaultCurrent={0}
                        onChange={handleBedroomChange}
                        name=""
                        placeholder="" />
                  </div>
               </div>
               <div className="col-xl-1 col-sm-4 col-6">
                  <div className="input-box-one border-left">
                     <div className="label">Bath</div>
                     <NiceSelect className="nice-select fw-normal"
                        options={[
                           { value: "0", text: "Any" },
                           { value: "1", text: "1+" },
                           { value: "2", text: "2+" },
                           { value: "3", text: "3+" },
                           { value: "4", text: "4+" },
                        ]}
                        defaultCurrent={0}
                        onChange={handleBathroomChange}
                        name=""
                        placeholder="" />
                  </div>
               </div>
               <div className="col-xxl-2 col-xl-1">
                  <div className="input-box-one lg-mt-20">
                     <div className="d-flex align-items-center justify-content-center justify-content-xl-end">
                        <Link href="#" data-bs-toggle="modal" data-bs-target="#advanceFilterModal" aria-label="Open Advanced Filter"
                           className="search-modal-btn tran3s text-uppercase fw-500 d-inline-flex align-items-center">
                           <span className="me-3 d-xl-none d-xxl-block">ADVANCE Search</span>
                           <i className="fa-light fa-sliders-up"></i>
                        </Link>
                     </div>
                  </div>
               </div>
            </div>
         </form>
         <ListingDropdownModal
            handleSearchChange={handleSearchChange}
            handleBedroomChange={handleBedroomChange}
            handleBathroomChange={handleBathroomChange}
            handlePriceChange={handlePriceChange}
            maxPrice={maxPrice}
            priceValue={priceValue}
            handleResetFilter={handleResetFilter}
            selectedAmenities={selectedAmenities}
            handleAmenityChange={handleAmenityChange}
            handleLocationChange={handleLocationChange}
            handleStatusChange={handleStatusChange}
         />
      </>
   )
}

export default DropdownSeven
