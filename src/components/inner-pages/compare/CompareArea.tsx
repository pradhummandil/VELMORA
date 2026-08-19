import Image, { StaticImageData } from "next/image";
import Link from "next/link"

import compareLogo from "@/assets/images/logo/logo_08.svg";

import compareThumb_1 from "@/assets/images/listing/img_66.jpg";
import compareThumb_2 from "@/assets/images/listing/img_67.jpg";
import compareThumb_3 from "@/assets/images/listing/img_68.jpg";

interface Datatype {
   id: number;
   tag: string;
   thumb: StaticImageData;
   title: string;
   desc: string;
}

const compare_data: Datatype[] = [
   {
      id: 1,
      tag: "For Sale",
      thumb: compareThumb_1,
      title: "The Meridian Residences",
      desc: "Worli Sea Face, Worli, Mumbai 400030",
   },
   {
      id: 2,
      tag: "For Sale",
      thumb: compareThumb_2,
      title: "The Aria Grand Residences",
      desc: "Golf Course Road, DLF Phase 5, Gurugram 122002",
   },
   {
      id: 3,
      tag: "For Sale",
      thumb: compareThumb_3,
      title: "Serein Sky Residence",
      desc: "100 Feet Road, Indiranagar, Bengaluru 560038",
   },
]

interface TableData {
   table_head: string;
   table_data: string[];
}[];

const table_row_data: TableData[] = [
   {
      table_head: "Bedrooms",
      table_data: ["3 BHK", "4 BHK", "3 BHK"],
   },
   {
      table_head: "Bathrooms",
      table_data: ["3", "4", "3"],
   },
   {
      table_head: "Price",
      table_data: ["₹4.80 Cr", "₹3.85 Cr", "₹3.25 Cr"],
   },
   {
      table_head: "Property Type",
      table_data: ["Sky Residence", "Penthouse", "Apartment"],
   },
   {
      table_head: "Property ID",
      table_data: ["VEL-MUM-01", "VEL-GUR-02", "VEL-BLR-03"],
   },
   {
      table_head: "Parking",
      table_data: ["2 Dedicated", "3 Dedicated", "2 Dedicated"],
   },
   {
      table_head: "Super Built-Up Area",
      table_data: ["2,180 sq.ft", "2,850 sq.ft", "1,940 sq.ft"],
   },
   {
      table_head: "Features",
      table_data: ["Sea View, Private Balcony, Italian Marble, Concierge, EV Charging, Swimming Pool", "Golf Course View, Double Height Ceiling, Private Elevator, Concierge", "Biophilic Terrace, Smart Home Automation, Clubhouse, Infinity Pool"],
   },
   {
      table_head: "RERA Status",
      table_data: ["RERA Approved", "RERA Approved", "RERA Approved"],
   },
]

const CompareArea = () => {
   return (
      <div className="compare-section mt-150 xl-mt-100 mb-150 xl-mb-100">
         <div className="container">
            <div className="row align-items-center">
               <div className="col-md-6">
                  <div className="title-one">
                     <div className="fs-14 fw-semibold text-uppercase mb-10" style={{ color: "#B89B5E", letterSpacing: "2px" }}>PROPERTY COMPARISON</div>
                     <h2 className="font-garamond">Compare Residences</h2>
                  </div>
               </div>
               <div className="col-xl-3 col-lg-4 col-md-5 ms-auto">
                  <ul className="style-none d-flex align-items-center action-btns sm-mt-40">
                     <li className="me-auto fw-500 color-dark"><i className="fa-sharp fa-regular fa-share-nodes me-2"></i> Share</li>
                     <li><Link href="#" className="d-flex align-items-center justify-content-center tran3s"><i className="fa-light fa-heart"></i></Link></li>
                     <li><Link href="#" className="d-flex align-items-center justify-content-center tran3s"><i className="fa-light fa-bookmark"></i></Link></li>
                     <li><Link href="#" className="d-flex align-items-center justify-content-center tran3s"><i className="fa-light fa-circle-plus"></i></Link></li>
                  </ul>
               </div>
            </div>

            <div className="compare-table mt-60 lg-mt-40">
               <div className="table-responsive table-bg bg-white">
                  <table className="table">
                     <thead>
                        <tr>
                           <td><Image src={compareLogo} alt="" className="lazy-img mt-50" /></td>
                           {compare_data.map((item) => (
                              <td key={item.id}>
                                 <div className="listing-card-one style-two shadow-none">
                                    <div className="img-gallery">
                                       <div className="position-relative overflow-hidden">
                                          <div className="tag fw-500">{item.tag}</div>
                                          <Link href="#" className="fav-btn tran3s"><i className="fa-light fa-heart"></i></Link>
                                          <Link href="#" className="d-block">
                                             <Image src={item.thumb} className="w-100" alt="..." />
                                          </Link>
                                       </div>
                                    </div>
                                    <div className="property-info pt-10">
                                       <Link href="#" className="title tran3s">{item.title}</Link>
                                       <div className="address">{item.desc}</div>
                                    </div>
                                 </div>
                              </td>
                           ))}
                        </tr>
                     </thead>

                     <tbody>
                        {table_row_data.map((item, index) => (
                           <tr key={index}>
                              <th>{item.table_head}</th>
                              {item.table_data.map((data, i) => <td key={i}>{data}</td>)}
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            </div>
         </div>
      </div>
   )
}

export default CompareArea
