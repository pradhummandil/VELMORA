import { StaticImageData } from "next/image";

import agencyThumb_1 from "@/assets/images/logo/p_logo_13.png";
import agencyThumb_2 from "@/assets/images/logo/p_logo_14.png";
import agencyThumb_3 from "@/assets/images/logo/p_logo_15.png";
import agencyThumb_4 from "@/assets/images/logo/p_logo_16.png";
import agencyThumb_5 from "@/assets/images/logo/p_logo_17.png";
import agencyThumb_6 from "@/assets/images/logo/p_logo_18.png";
import agencyThumb_7 from "@/assets/images/logo/p_logo_19.png";
import agencyThumb_8 from "@/assets/images/logo/p_logo_20.png";
import agencyThumb_9 from "@/assets/images/logo/p_logo_21.png";

interface DataType {
   id: number;
   data_delay_time?: string;
   tag: string;
   category?: string;
   thumb: StaticImageData;
   title: string;
   rating: number;
   desc: string;
   price: number;
}[];

const agency_data: DataType[] = [
   { id: 1, tag: "48 Listings", thumb: agencyThumb_1, title: "VELMORA Mumbai", rating: 5, desc: "Dr. Annie Besant Road, Worli, Mumbai, Maharashtra 400018", price: 100 },
   { id: 2, data_delay_time: "0.1s", tag: "36 Listings", thumb: agencyThumb_2, title: "VELMORA NCR", rating: 5, desc: "Golf Course Road, Sector 42, Gurugram, Haryana 122002", price: 50 },
   { id: 3, data_delay_time: "0.2s", tag: "42 Listings", thumb: agencyThumb_3, title: "VELMORA Bengaluru", rating: 5, desc: "100 Feet Road, Indiranagar, Bengaluru, Karnataka 560038", price: 100 },
   { id: 4, tag: "28 Listings", thumb: agencyThumb_4, title: "VELMORA Hyderabad", rating: 5, category: "Popular", desc: "Road No. 36, Jubilee Hills, Hyderabad, Telangana 500033", price: 50 },
   { id: 5, data_delay_time: "0.1s", tag: "32 Listings", thumb: agencyThumb_5, title: "VELMORA Pune", rating: 4, desc: "North Main Road, Koregaon Park, Pune, Maharashtra 411001", price: 30 },
   { id: 6, data_delay_time: "0.2s", tag: "24 Listings", thumb: agencyThumb_6, title: "VELMORA Goa", rating: 5, desc: "Badem Road, Assagao, North Goa 403507", price: 150 },
   { id: 7, tag: "30 Listings", thumb: agencyThumb_7, title: "VELMORA Delhi", rating: 5, desc: "Vasant Vihar, New Delhi 110057", price: 30 },
   { id: 8, data_delay_time: "0.1s", tag: "22 Listings", thumb: agencyThumb_8, title: "VELMORA Noida", rating: 4, category: "Popular", desc: "Sector 128, Expressway, Noida, Uttar Pradesh 201304", price: 150 },
   { id: 9, data_delay_time: "0.2s", tag: "26 Listings", thumb: agencyThumb_9, title: "VELMORA Chennai", rating: 5, desc: "Boat Club Road, R.A. Puram, Chennai, Tamil Nadu 600028", price: 150 },
   { id: 10, tag: "20 Listings", thumb: agencyThumb_7, title: "VELMORA Ahmedabad", rating: 4, desc: "SG Highway, Bodakdev, Ahmedabad, Gujarat 380054", price: 30 },
   { id: 11, data_delay_time: "0.1s", tag: "48 Listings", thumb: agencyThumb_8, title: "VELMORA Mumbai", rating: 5, category: "Popular", desc: "Bandra Kurla Complex, Bandra East, Mumbai 400051", price: 20 },
   { id: 12, data_delay_time: "0.2s", tag: "36 Listings", thumb: agencyThumb_9, title: "VELMORA NCR", rating: 5, desc: "DLF Cyber City, DLF Phase II, Gurugram 122008", price: 100 },
   { id: 13, tag: "48 Listings", thumb: agencyThumb_1, title: "VELMORA Mumbai", rating: 5, desc: "Dr. Annie Besant Road, Worli, Mumbai, Maharashtra 400018", price: 10 },
   { id: 14, data_delay_time: "0.1s", tag: "36 Listings", thumb: agencyThumb_2, title: "VELMORA NCR", rating: 5, desc: "Golf Course Road, Sector 42, Gurugram, Haryana 122002", price: 50 },
   { id: 15, data_delay_time: "0.2s", tag: "42 Listings", thumb: agencyThumb_3, title: "VELMORA Bengaluru", rating: 5, desc: "100 Feet Road, Indiranagar, Bengaluru, Karnataka 560038", price: 150 },
   { id: 16, tag: "28 Listings", thumb: agencyThumb_4, title: "VELMORA Hyderabad", rating: 4, category: "Popular", desc: "Road No. 36, Jubilee Hills, Hyderabad, Telangana 500033", price: 50 },
   { id: 17, data_delay_time: "0.1s", tag: "32 Listings", thumb: agencyThumb_5, title: "VELMORA Pune", rating: 4, desc: "North Main Road, Koregaon Park, Pune, Maharashtra 411001", price: 20 },
   { id: 18, data_delay_time: "0.2s", tag: "24 Listings", thumb: agencyThumb_6, title: "VELMORA Goa", rating: 5, desc: "Badem Road, Assagao, North Goa 403507", price: 200 },
   { id: 19, tag: "28 Listings", thumb: agencyThumb_4, title: "VELMORA Hyderabad", rating: 5, category: "Popular", desc: "Road No. 36, Jubilee Hills, Hyderabad, Telangana 500033", price: 50 },
   { id: 20, data_delay_time: "0.1s", tag: "32 Listings", thumb: agencyThumb_5, title: "VELMORA Pune", rating: 4, desc: "North Main Road, Koregaon Park, Pune, Maharashtra 411001", price: 30 },
   { id: 21, data_delay_time: "0.2s", tag: "24 Listings", thumb: agencyThumb_6, title: "VELMORA Goa", rating: 5, desc: "Badem Road, Assagao, North Goa 403507", price: 100 },
   { id: 22, tag: "48 Listings", thumb: agencyThumb_1, title: "VELMORA Mumbai", rating: 5, desc: "Dr. Annie Besant Road, Worli, Mumbai, Maharashtra 400018", price: 100 },
   { id: 23, data_delay_time: "0.1s", tag: "36 Listings", thumb: agencyThumb_2, title: "VELMORA NCR", rating: 4, desc: "Golf Course Road, Sector 42, Gurugram, Haryana 122002", price: 60 },
   { id: 24, data_delay_time: "0.2s", tag: "42 Listings", thumb: agencyThumb_3, title: "VELMORA Bengaluru", rating: 5, desc: "100 Feet Road, Indiranagar, Bengaluru, Karnataka 560038", price: 90 },
   { id: 25, tag: "30 Listings", thumb: agencyThumb_7, title: "VELMORA Delhi", rating: 4, desc: "Vasant Vihar, New Delhi 110057", price: 30 },
   { id: 26, data_delay_time: "0.1s", tag: "22 Listings", thumb: agencyThumb_8, title: "VELMORA Noida", rating: 5, category: "Popular", desc: "Sector 128, Expressway, Noida, Uttar Pradesh 201304", price: 90 },
   { id: 27, data_delay_time: "0.2s", tag: "26 Listings", thumb: agencyThumb_9, title: "VELMORA Chennai", rating: 5, desc: "Boat Club Road, R.A. Puram, Chennai, Tamil Nadu 600028", price: 100 },
   { id: 28, tag: "48 Listings", thumb: agencyThumb_1, title: "VELMORA Mumbai", rating: 5, desc: "Dr. Annie Besant Road, Worli, Mumbai, Maharashtra 400018", price: 100 },
   { id: 29, data_delay_time: "0.1s", tag: "36 Listings", thumb: agencyThumb_2, title: "VELMORA NCR", rating: 4, desc: "Golf Course Road, Sector 42, Gurugram, Haryana 122002", price: 50 },
   { id: 30, data_delay_time: "0.2s", tag: "42 Listings", thumb: agencyThumb_3, title: "VELMORA Bengaluru", rating: 5, desc: "100 Feet Road, Indiranagar, Bengaluru, Karnataka 560038", price: 100 },
   { id: 31, tag: "28 Listings", thumb: agencyThumb_4, title: "VELMORA Hyderabad", rating: 4, category: "Popular", desc: "Road No. 36, Jubilee Hills, Hyderabad, Telangana 500033", price: 50 },
   { id: 32, data_delay_time: "0.1s", tag: "32 Listings", thumb: agencyThumb_5, title: "VELMORA Pune", rating: 4, desc: "North Main Road, Koregaon Park, Pune, Maharashtra 411001", price: 30 },
   { id: 33, data_delay_time: "0.2s", tag: "24 Listings", thumb: agencyThumb_6, title: "VELMORA Goa", rating: 5, desc: "Badem Road, Assagao, North Goa 403507", price: 150 },
   { id: 34, tag: "30 Listings", thumb: agencyThumb_7, title: "VELMORA Delhi", rating: 4, desc: "Vasant Vihar, New Delhi 110057", price: 30 },
   { id: 35, data_delay_time: "0.1s", tag: "22 Listings", thumb: agencyThumb_8, title: "VELMORA Noida", rating: 5, category: "Popular", desc: "Sector 128, Expressway, Noida, Uttar Pradesh 201304", price: 150 },
   { id: 36, data_delay_time: "0.2s", tag: "26 Listings", thumb: agencyThumb_9, title: "VELMORA Chennai", rating: 5, desc: "Boat Club Road, R.A. Puram, Chennai, Tamil Nadu 600028", price: 150 },
   { id: 37, tag: "30 Listings", thumb: agencyThumb_7, title: "VELMORA Delhi", rating: 4, desc: "Vasant Vihar, New Delhi 110057", price: 30 },
   { id: 38, data_delay_time: "0.1s", tag: "22 Listings", thumb: agencyThumb_8, title: "VELMORA Noida", rating: 4, category: "Popular", desc: "Sector 128, Expressway, Noida, Uttar Pradesh 201304", price: 20 },
   { id: 39, data_delay_time: "0.2s", tag: "26 Listings", thumb: agencyThumb_9, title: "VELMORA Chennai", rating: 5, desc: "Boat Club Road, R.A. Puram, Chennai, Tamil Nadu 600028", price: 100 },
   { id: 40, tag: "48 Listings", thumb: agencyThumb_1, title: "VELMORA Mumbai", rating: 5, desc: "Dr. Annie Besant Road, Worli, Mumbai, Maharashtra 400018", price: 10 },
];

export default agency_data;