"use client"
import Image from "next/image"
import Link from "next/link"
import ReactPaginate from "react-paginate"
import NiceSelect from "@/ui/NiceSelect"
import UseShortedProperty from "@/hooks/useShortedProperty"
import DropdownOne from "@/components/search-dropdown/inner-dropdown/DropdownOne"

import icon from "@/assets/images/icon/icon_46.svg"
import Fancybox from "@/components/common/Fancybox"

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

const ListingSixArea = ({ style }: any) => {

   const itemsPerPage = 5;
   const page = "listing_6";

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
   } = UseShortedProperty({ itemsPerPage, page });

   const handleResetFilter = () => {
      resetFilters();
   };

   return (
      <div className="property-listing-six bg-pink-two pt-110 md-pt-80 pb-150 xl-pb-120 mt-150 xl-mt-120">
         <div className="container container-large">
            <div className="row">
               <div className="col-lg-8">
                  <div className="ps-xxl-5">
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
                           <Link href="/listing_05" className="tran3s layout-change rounded-circle ms-auto ms-sm-3"
                              data-bs-toggle="tooltip" title="Switch To Grid View" aria-label="Switch To Grid View"><i
                                 className="fa-regular fa-grid-2"></i></Link>
                        </div>
                     </div>

                     {currentItems.length === 0 ? (
                        <div className="text-center p-50 bg-white border-20 mb-50">
                           <h4 className="font-garamond mb-15">No residences match your search.</h4>
                           <p className="fs-18 mb-25">Try adjusting your location, property type, or budget filters.</p>
                           <button onClick={handleResetFilter} className="btn-two sm">Reset Filters</button>
                        </div>
                     ) : (
                        currentItems.map((item: any) => (
                           <div key={item.id} className="listing-card-seven grey-bg p-0 mb-50 wow fadeInUp">
                              <div className="d-flex flex-wrap layout-two">
                                 <div className={`img-gallery position-relative z-1 overflow-hidden ${item.bg_img}`}>
                                    <div className="tag bg-white rounded-0 text-dark fw-500">{item.tag}</div>
                                    <div className="img-slider-btn">
                                       03 <i className="fa-regular fa-image"></i>
                                       <Fancybox
                                          options={{
                                             Carousel: {
                                                infinite: true,
                                             },
                                          }}
                                       >
                                          {item.carousel_thumb.map((thumb: any, index: any) => (
                                             <a key={index} className="d-block" data-fancybox="gallery2" href={`/assets/images/listing/img_large_0${thumb.id}.jpg`} aria-label={`View image ${index + 1}`}></a>
                                          ))}
                                       </Fancybox>
                                    </div>
                                 </div>
                                 <div className="property-info pe-4 ps-4">
                                    <Link href="/listing_details_06" className="title tran3s mb-15">{item.title}</Link>
                                    <div className="address">{item.address}</div>
                                    <div className="feature border-0 mt-45 mb-30">
                                       <ul className="style-none d-flex flex-wrap align-items-center justify-content-between">
                                          <li><strong>{item.property_info.sqft}</strong> sqft</li>
                                          <li><strong>{item.property_info.bed}</strong> bed</li>
                                          <li><strong>{item.property_info.bath}</strong> bath</li>
                                          <li><strong>{item.property_info.kitchen}</strong> Kitchen</li>
                                       </ul>
                                    </div>
                                    <div className="pl-footer pb-15 d-flex flex-wrap align-items-center justify-content-between">
                                       <strong className="price fw-500 color-dark me-auto">{formatPrice(item.price)}{item.price_text && <>/<sub>m</sub></>}</strong>
                                       <ul className="style-none d-flex action-icons me-4">
                                          <li><Link href="#" aria-label="Save property"><i className="fa-light fa-heart"></i></Link></li>
                                          <li><Link href="#" aria-label="Bookmark property"><i className="fa-light fa-bookmark"></i></Link></li>
                                          <li><Link href="#" aria-label="Compare property"><i className="fa-light fa-circle-plus"></i></Link></li>
                                       </ul>
                                       <Link href="/listing_details_06" className="btn-four" aria-label="View Details">
                                          <i className="bi bi-arrow-up-right"></i>
                                       </Link>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        ))
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
                           className="pagination-one d-flex align-items-center justify-content-center justify-content-sm-start style-none pt-30"
                        />
                     )}
                  </div>
               </div>

               <div className="col-lg-4 order-lg-first">
                  <div className="advance-search-panel dot-bg md-mt-80">
                     <div className="main-bg rounded-0">
                        <DropdownOne
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
               </div>
            </div>
         </div>
      </div>
   )
}

export default ListingSixArea
