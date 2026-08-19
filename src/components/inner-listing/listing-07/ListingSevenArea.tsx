"use client"
import DropdownTwo from "@/components/search-dropdown/inner-dropdown/DropdownTwo";
import UseShortedProperty from "@/hooks/useShortedProperty";
import NiceSelect from "@/ui/NiceSelect";
import Link from "next/link";
import Image from "next/image";
import ReactPaginate from "react-paginate";

import featureIcon_1 from "@/assets/images/icon/icon_32.svg"
import featureIcon_2 from "@/assets/images/icon/icon_33.svg"
import featureIcon_3 from "@/assets/images/icon/icon_34.svg"
import icon from "@/assets/images/icon/icon_46.svg"

const formatPrice = (price: number) => {
   if (!price) return "Price on Request";
   if (price >= 10000000) {
      const cr = price / 10000000;
      return `₹${cr.toFixed(2).replace(/\.00$/, '')} Cr`;
   } else if (price >= 100000) {
      const lakh = price / 100000;
      return `₹${lakh.toFixed(2).replace(/\.00$/, '')} Lakh`;
   }
   return `₹${price.toLocaleString('en-IN')}`;
};

const ListingSevenArea = ({ style }: any) => {

   const itemsPerPage = 9;
   const page = "listing_7";

   const {
      itemOffset,
      sortedProperties,
      currentItems,
      pageCount,
      handlePageClick,
      handleBathroomChange,
      handleBedroomChange,
      handleSearchChange,
      handlePriceChange,
      maxPrice,
      priceValue,
      resetFilters,
      selectedAmenities,
      handleAmenityChange,
      handleLocationChange,
      handleStatusChange,
      handleTypeChange,
      handlePriceDropChange
   } = UseShortedProperty({ itemsPerPage, page });

   const handleResetFilter = () => {
      resetFilters();
   };

   return (
      <div className="property-listing-seven pt-120 md-pt-80 pb-150 xl-pb-120">
         <div className="container container-large">
            <div className="search-wrapper-one layout-one bg position-relative mb-75 md-mb-50">
               <div className="bg-wrapper border-layout">
                  <DropdownTwo
                     handlePriceDropChange={handlePriceDropChange}
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
               </div>
            </div>

            <div className="listing-header-filter d-sm-flex justify-content-between align-items-center mb-40 lg-mb-30">
               <div>Showing <span className="color-dark fw-500">{currentItems.length > 0 ? itemOffset + 1 : 0}–{itemOffset + currentItems.length}</span> of <span
                  className="color-dark fw-500">{sortedProperties.length}</span> results</div>
               <div className="d-flex align-items-center xs-mt-20">
                  <div className="short-filter d-flex align-items-center">
                     <div className="fs-16 me-2">Short by:</div>
                     <NiceSelect
                        className="nice-select"
                        options={[
                           { value: "newest", text: "Newest" },
                           { value: "best_seller", text: "Best Seller" },
                           { value: "best_match", text: "Best Match" },
                           { value: "price_low", text: "Price Low" },
                           { value: "price_high", text: "Price High" },
                        ]}
                        defaultCurrent={0}
                        onChange={handleTypeChange}
                        name=""
                        placeholder="" />
                  </div>
                  <Link href="/listing_08" className="tran3s layout-change rounded-circle ms-auto ms-sm-3"
                     data-bs-toggle="tooltip" title="Switch To List View" aria-label="Switch To List View"><i
                        className="fa-regular fa-bars"></i></Link>
               </div>
            </div>

            {currentItems.length === 0 ? (
               <div className="text-center p-50 bg-white border-20 mb-50">
                  <h4 className="font-garamond mb-15">No residences match your search.</h4>
                  <p className="fs-18 mb-25">Try adjusting your location, property type, or budget filters.</p>
                  <button onClick={handleResetFilter} className="btn-two sm">Reset Filters</button>
               </div>
            ) : (
               <div className="row gx-xxl-5">
                  {currentItems.map((item: any) => (
                     <div key={item.id} className="col-lg-4 col-md-6 d-flex mb-80 lg-mb-40 wow fadeInUp" data-wow-delay={item.data_delay_time}>
                        <div className="listing-card-one style-two shadow-none h-100 w-100">
                           <div className="img-gallery">
                              <div className="position-relative overflow-hidden">
                                 <div className={`tag fw-500 ${item.tag_bg}`}>{item.tag}</div>
                                 <Link href="#" className="fav-btn tran3s" aria-label="Add to favourites"><i className="fa-light fa-heart"></i></Link>
                                 <div id={`carousel${item.carousel}`} className="carousel slide">
                                    <div className="carousel-indicators">
                                       <button type="button" data-bs-target={`#carousel${item.carousel}`} data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                                       <button type="button" data-bs-target={`#carousel${item.carousel}`} data-bs-slide-to="1" aria-label="Slide 2"></button>
                                       <button type="button" data-bs-target={`#carousel${item.carousel}`} data-bs-slide-to="2" aria-label="Slide 3"></button>
                                    </div>
                                    <div className="carousel-inner">
                                       {item.carousel_thumb.map((item: any, i: any) => (
                                          <div key={i} className={`carousel-item ${item.active}`} data-bs-interval="1000000">
                                             <Link href="/listing_details_01" className="d-block"><Image src={item.img} className="w-100" alt="..." /></Link>
                                          </div>
                                       ))}
                                    </div>
                                 </div>
                              </div>
                           </div>
                           <div className="property-info pt-20">
                              <Link href="/listing_details_06" className="title tran3s">{item.title}</Link>
                              <div className="address">{item.address}</div>
                              <ul className="style-none feature d-flex flex-wrap align-items-center justify-content-between pb-15 pt-5">
                                 <li className="d-flex align-items-center">
                                    <Image src={featureIcon_1} alt=""
                                       className="lazy-img icon me-2" />
                                    <span className="fs-16"><span className="color-dark">{item.property_info.sqft}</span> sqft</span>
                                 </li>
                                 <li className="d-flex align-items-center">
                                    <Image src={featureIcon_2} alt=""
                                       className="lazy-img icon me-2" />
                                    <span className="fs-16"><span className="color-dark">{item.property_info.bed}</span> bed</span>
                                 </li>
                                 <li className="d-flex align-items-center">
                                    <Image src={featureIcon_3} alt=""
                                       className="lazy-img icon me-2" />
                                    <span className="fs-16"><span className="color-dark">{item.property_info.bath}</span> bath</span>
                                 </li>
                              </ul>
                              <div className="pl-footer top-border bottom-border d-flex align-items-center justify-content-between">
                                 <strong className="price fw-500 color-dark">{formatPrice(item.price)}{item.price_text && <>/<sub>m</sub></>}</strong>
                                 <Link href="/listing_details_06" className="btn-four" aria-label="View Details"><i className="bi bi-arrow-up-right"></i></Link>
                              </div>
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
            )}

            {pageCount > 1 && (
               <ReactPaginate
                  breakLabel="..."
                  nextLabel={<Image src={icon} alt="" className="ms-2" />}
                  onPageChange={handlePageClick}
                  pageRangeDisplayed={pageCount}
                  pageCount={pageCount}
                  previousLabel={<Image src={icon} alt="" className="ms-2" />}
                  renderOnZeroPageCount={null}
                  className="pagination-one d-flex align-items-center justify-content-center style-none pt-30"
               />
            )}
         </div>
      </div>
   )
}

export default ListingSevenArea;
