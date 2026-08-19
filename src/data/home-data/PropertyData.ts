import { StaticImageData } from "next/image";

import propertyThumb_1 from "@/assets/images/listing/img_01.jpg";
import propertyThumb_2 from "@/assets/images/listing/img_02.jpg";
import propertyThumb_3 from "@/assets/images/listing/img_03.jpg";
import propertyThumb_4 from "@/assets/images/listing/img_04.jpg";
import propertyThumb_5 from "@/assets/images/listing/img_05.jpg";
import propertyThumb_6 from "@/assets/images/listing/img_06.jpg";

import property2Thumb_1 from "@/assets/images/listing/img_07.jpg";
import property2Thumb_2 from "@/assets/images/listing/img_08.jpg";
import property2Thumb_3 from "@/assets/images/listing/img_09.jpg";

import property3Thumb_1 from "@/assets/images/listing/img_13.jpg";
import property3Thumb_2 from "@/assets/images/listing/img_14.jpg";
import property3Thumb_3 from "@/assets/images/listing/img_15.jpg";
import property3Thumb_4 from "@/assets/images/listing/img_16.jpg";

import propertyLargThumb_1 from "@/assets/images/listing/img_large_01.jpg";
import propertyLargThumb_2 from "@/assets/images/listing/img_large_02.jpg";
import propertyLargThumb_3 from "@/assets/images/listing/img_large_03.jpg";
import propertyLargThumb_4 from "@/assets/images/listing/img_large_04.jpg";
import propertyLargThumb_5 from "@/assets/images/listing/img_large_05.jpg";
import propertyLargThumb_6 from "@/assets/images/listing/img_large_06.jpg";

import propertyIcon_1 from "@/assets/images/icon/icon_04.svg";
import propertyIcon_2 from "@/assets/images/icon/icon_05.svg";
import propertyIcon_3 from "@/assets/images/icon/icon_06.svg";

interface DataType {
   id: number;
   page: string;
   tag: string;
   tag_bg?: string;
   thumb?:StaticImageData
   carousel_thumb: {
      id?:string;
      img: StaticImageData;
      active?: string;
   }[];
   title: string;
   address: string;
   property_info: {
      icon: StaticImageData;
      feature: string;
      total_feature: number;
   }[];
   data_delay_time?: string;
   price: number;
   price_text?: string;
   carousel?: string;
}[];

const property_data: DataType[] = [
   {
      id: 1,
      page: "home_1",
      tag: "FOR RENT",
      carousel_thumb: [{ img: propertyThumb_1, active: "active" }, { img: propertyThumb_2 }, { img: propertyThumb_3 }],
      title: "The Meridian Residences",
      address: "Dr. Annie Besant Road, Worli, Mumbai",
      property_info: [{ icon: propertyIcon_1, feature: "sqft", total_feature: 2150 }, { icon: propertyIcon_2, feature: "bed", total_feature: 3 }, { icon: propertyIcon_3, feature: "bath", total_feature: 3 },],
      price: 185000,
      price_text: "m",
      carousel: "1",
   },
   {
      id: 2,
      page: "home_1",
      tag: "FOR SELL",
      tag_bg: "sale",
      carousel_thumb: [{ img: propertyThumb_2, active: "active" }, { img: propertyThumb_3 }, { img: propertyThumb_1 }],
      title: "The Aria Residences",
      address: "Golf Course Road, Sector 42, Gurugram",
      property_info: [{ icon: propertyIcon_1, feature: "sqft", total_feature: 3250 }, { icon: propertyIcon_2, feature: "bed", total_feature: 4 }, { icon: propertyIcon_3, feature: "bath", total_feature: 4 },],
      data_delay_time: "0.1s",
      price: 48500000,
      carousel: "2",
   },
   {
      id: 3,
      page: "home_1",
      tag: "FOR SELL",
      tag_bg: "sale",
      carousel_thumb: [{ img: propertyThumb_3, active: "active" }, { img: propertyThumb_2 }, { img: propertyThumb_1 }],
      title: "Serein Sky Residence",
      address: "100 Feet Road, Indiranagar, Bengaluru",
      property_info: [{ icon: propertyIcon_1, feature: "sqft", total_feature: 2650 }, { icon: propertyIcon_2, feature: "bed", total_feature: 3 }, { icon: propertyIcon_3, feature: "bath", total_feature: 3 },],
      data_delay_time: "0.2s",
      price: 34500000,
      carousel: "3",
   },
   {
      id: 4,
      page: "home_1",
      tag: "FOR RENT",
      carousel_thumb: [{ img: propertyThumb_4, active: "active" }, { img: propertyThumb_5 }, { img: propertyThumb_6 }],
      title: "Elysian Heights",
      address: "Road No. 36, Jubilee Hills, Hyderabad",
      property_info: [{ icon: propertyIcon_1, feature: "sqft", total_feature: 3800 }, { icon: propertyIcon_2, feature: "bed", total_feature: 4 }, { icon: propertyIcon_3, feature: "bath", total_feature: 4 },],
      price: 240000,
      price_text: "m",
      carousel: "4",
   },
   {
      id: 5,
      page: "home_1",
      tag: "FOR SELL",
      tag_bg: "sale",
      carousel_thumb: [{ img: propertyThumb_5, active: "active" }, { img: propertyThumb_4 }, { img: propertyThumb_6 }],
      title: "Casa Aurelia",
      address: "Lane 7, Koregaon Park, Pune",
      property_info: [{ icon: propertyIcon_1, feature: "sqft", total_feature: 2850 }, { icon: propertyIcon_2, feature: "bed", total_feature: 3 }, { icon: propertyIcon_3, feature: "bath", total_feature: 3 },],
      data_delay_time: "0.1s",
      price: 32000000,
      carousel: "5",
   },
   {
      id: 6,
      page: "home_1",
      tag: "FOR RENT",
      carousel_thumb: [{ img: propertyThumb_6, active: "active" }, { img: propertyThumb_5 }, { img: propertyThumb_4 }],
      title: "Casa Sol Villa",
      address: "Badem Road, Assagao, North Goa",
      property_info: [{ icon: propertyIcon_1, feature: "sqft", total_feature: 4500 }, { icon: propertyIcon_2, feature: "bed", total_feature: 4 }, { icon: propertyIcon_3, feature: "bath", total_feature: 5 },],
      data_delay_time: "0.2s",
      price: 350000,
      price_text: "m",
      carousel: "6",
   },

   // home two
   
   {
      id: 1,
      page: "home_2",
      tag: "FOR RENT",
      carousel_thumb: [{ img: property2Thumb_1, active: "active" }, { img: property2Thumb_2 }, { img: property2Thumb_3 }],
      title: "The Meridian Residences",
      address: "Dr. Annie Besant Road, Worli, Mumbai",
      property_info: [{ icon: propertyIcon_1, feature: "sqft", total_feature: 2150 }, { icon: propertyIcon_2, feature: "bed", total_feature: 3 }, { icon: propertyIcon_3, feature: "bath", total_feature: 3 },],
      price: 185000.00,
      carousel: "1",
   },
   {
      id: 2,
      page: "home_2",
      tag: "FOR SELL",
      carousel_thumb: [{ img: property2Thumb_2, active: "active" }, { img: property2Thumb_1 }, { img: property2Thumb_2 }],
      title: "The Aria Residences",
      address: "Golf Course Road, Sector 42, Gurugram",
      property_info: [{ icon: propertyIcon_1, feature: "sqft", total_feature: 3250 }, { icon: propertyIcon_2, feature: "bed", total_feature: 4 }, { icon: propertyIcon_3, feature: "bath", total_feature: 4 },],
      data_delay_time: "0.1s",
      price: 48500000.00,
      carousel: "2",
   },
   {
      id: 3,
      page: "home_2",
      tag: "FOR SELL",
      carousel_thumb: [{ img: property2Thumb_3, active: "active" }, { img: property2Thumb_2 }, { img: property2Thumb_1 }],
      title: "Serein Sky Residence",
      address: "100 Feet Road, Indiranagar, Bengaluru",
      property_info: [{ icon: propertyIcon_1, feature: "sqft", total_feature: 2650 }, { icon: propertyIcon_2, feature: "bed", total_feature: 3 }, { icon: propertyIcon_3, feature: "bath", total_feature: 3 },],
      data_delay_time: "0.2s",
      price: 34500000.00,
      carousel: "3",
   },

   // home_3_property_2

   {
      id: 1,
      page: "home_3_property_2",
      tag: "FOR RENT",
      thumb:property3Thumb_1,
      carousel_thumb: [{id:"1", img: propertyLargThumb_1}, {id:"2", img: propertyLargThumb_2 }, {id:"3", img: propertyLargThumb_3 }],
      title: "The Meridian Residences",
      address: "Dr. Annie Besant Road, Worli, Mumbai",
      property_info: [{ icon: propertyIcon_1, feature: "sqft", total_feature: 2150 }, { icon: propertyIcon_2, feature: "bed", total_feature: 3 }, { icon: propertyIcon_3, feature: "bath", total_feature: 3 },],
      price: 185000,
      carousel:"03",
   },
   {
      id: 2,
      page: "home_3_property_2",
      tag: "FOR SELL",
      thumb:property3Thumb_2,
      carousel_thumb: [{id:"4", img: propertyLargThumb_4}, {id:"5", img: propertyLargThumb_5 }, {id:"6", img: propertyLargThumb_6 }],
      title: "The Aria Residences",
      address: "Golf Course Road, Sector 42, Gurugram",
      property_info: [{ icon: propertyIcon_1, feature: "sqft", total_feature: 3250 }, { icon: propertyIcon_2, feature: "bed", total_feature: 4 }, { icon: propertyIcon_3, feature: "bath", total_feature: 4 },],
      price: 48500000,
      carousel:"03",
   },
   {
      id: 3,
      page: "home_3_property_2",
      tag: "FOR SELL",
      thumb:property3Thumb_3,
      carousel_thumb: [{id:"1", img: propertyLargThumb_1}, {id:"5", img: propertyLargThumb_5 }, {id:"3", img: propertyLargThumb_3 }, {id:"2", img: propertyLargThumb_2 }],
      title: "Serein Sky Residence",
      address: "100 Feet Road, Indiranagar, Bengaluru",
      property_info: [{ icon: propertyIcon_1, feature: "sqft", total_feature: 2650 }, { icon: propertyIcon_2, feature: "bed", total_feature: 3 }, { icon: propertyIcon_3, feature: "bath", total_feature: 3 },],
      price: 34500000,
      carousel:"04",
   },
   {
      id: 4,
      page: "home_3_property_2",
      tag: "FOR SELL",
      thumb:property3Thumb_4,
      carousel_thumb: [{id:"4", img: propertyLargThumb_4}, {id:"6", img: propertyLargThumb_6 }, {id:"3", img: propertyLargThumb_3 }, {id:"2", img: propertyLargThumb_2 }],
      title: "Elysian Heights",
      address: "Road No. 36, Jubilee Hills, Hyderabad",
      property_info: [{ icon: propertyIcon_1, feature: "sqft", total_feature: 3800 }, { icon: propertyIcon_2, feature: "bed", total_feature: 4 }, { icon: propertyIcon_3, feature: "bath", total_feature: 4 },],
      price: 52000000,
      carousel:"04",
   },
   {
      id: 5,
      page: "home_3_property_2",
      tag: "FOR SELL",
      thumb:property3Thumb_2,
      carousel_thumb: [{id:"4", img: propertyLargThumb_4}, {id:"5", img: propertyLargThumb_5 }, {id:"6", img: propertyLargThumb_6 }],
      title: "Casa Sol Villa",
      address: "Badem Road, Assagao, North Goa",
      property_info: [{ icon: propertyIcon_1, feature: "sqft", total_feature: 4500 }, { icon: propertyIcon_2, feature: "bed", total_feature: 4 }, { icon: propertyIcon_3, feature: "bath", total_feature: 5 },],
      price: 68000000,
      carousel:"03",
   },
];

export default property_data;