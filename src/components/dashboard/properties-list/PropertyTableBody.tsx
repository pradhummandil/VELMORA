import Image, { StaticImageData } from "next/image"
import Link from "next/link"

import icon_1 from "@/assets/images/dashboard/icon/icon_18.svg";
import icon_2 from "@/assets/images/dashboard/icon/icon_19.svg";
import icon_3 from "@/assets/images/dashboard/icon/icon_20.svg";
import icon_4 from "@/assets/images/dashboard/icon/icon_21.svg";

import listImg_1 from "@/assets/images/dashboard/img_01.jpg";
import listImg_2 from "@/assets/images/dashboard/img_02.jpg";
import listImg_3 from "@/assets/images/dashboard/img_03.jpg";
import listImg_4 from "@/assets/images/dashboard/img_04.jpg";
import listImg_5 from "@/assets/images/dashboard/img_05.jpg";

interface DataType {
   id: number;
   title: string;
   address: string;
   price: number;
   date: string;
   view: number;
   img: StaticImageData;
   status: string;
   status_bg?: string;
}

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

const list_data: DataType[] = [
   {
      id: 1,
      title: "The Meridian Sky Suite",
      address: "Worli Sea Face, Worli, Mumbai",
      price: 48000000,
      date: "13 Jan, 2024",
      view: 1210,
      img: listImg_1,
      status: "Active",
   },
   {
      id: 2,
      title: "The Aria Grand Residence",
      address: "Golf Course Road, DLF Phase 5, Gurugram",
      price: 38500000,
      date: "09 Jan, 2024",
      view: 840,
      img: listImg_2,
      status: "Pending",
      status_bg: "pending"
   },
   {
      id: 3,
      title: "Serein Sky Residence",
      address: "100 Feet Road, Indiranagar, Bengaluru",
      price: 32500000,
      date: "17 Oct, 2023",
      view: 620,
      img: listImg_3,
      status: "Processing",
      status_bg: "processing",
   },
   {
      id: 4,
      title: "Elysian Heights Mansion",
      address: "Road No. 36, Jubilee Hills, Hyderabad",
      price: 52000000,
      date: "23 Sep, 2023",
      view: 970,
      img: listImg_4,
      status: "Active",
   },
   {
      id: 5,
      title: "Casa Sol Luxury Villa",
      address: "Badem Road, Assagao, Goa",
      price: 68000000,
      date: "15 Aug, 2023",
      view: 2320,
      img: listImg_5,
      status: "Active",
   },
]

const PropertyTableBody = () => {
   return (
      <tbody className="border-0">
         {list_data.map((item) => (
            <tr key={item.id}>
               <td>
                  <div className="d-lg-flex align-items-center position-relative">
                     <Image src={item.img} alt="" className="p-img" />
                     <div className="ps-lg-4 md-pt-10">
                        <Link href="/listing_details_01" className="property-name tran3s color-dark fw-500 fs-20 stretched-link">{item.title}</Link>
                        <div className="address">{item.address}</div>
                        <strong className="price color-dark">{formatPrice(item.price)}</strong>
                     </div>
                  </div>
               </td>
               <td>{item.date}</td>
               <td>{item.view}</td>
               <td>
                  <div className={`property-status ${item.status_bg}`}>{item.status}</div>
               </td>
               <td>
                  <div className="action-dots float-end">
                     <button className="action-btn dropdown-toggle" type="button" data-bs-toggle="dropdown"
                        aria-expanded="false">
                        <span></span>
                     </button>
                     <ul className="dropdown-menu dropdown-menu-end">
                        <li><Link className="dropdown-item" href="#"><Image src={icon_1} alt="" className="lazy-img" /> View</Link></li>
                        <li><Link className="dropdown-item" href="#"><Image src={icon_2} alt="" className="lazy-img" /> Share</Link></li>
                        <li><Link className="dropdown-item" href="#"><Image src={icon_3} alt="" className="lazy-img" /> Edit</Link></li>
                        <li><Link className="dropdown-item" href="#"><Image src={icon_4} alt="" className="lazy-img" /> Delete</Link></li>
                     </ul>
                  </div>
               </td>
            </tr>
         ))}
      </tbody>
   )
}

export default PropertyTableBody
