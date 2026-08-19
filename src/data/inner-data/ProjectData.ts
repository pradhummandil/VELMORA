import { StaticImageData } from "next/image";

import projectThumb_1 from "@/assets/images/project/img_01.jpg"
import projectThumb_2 from "@/assets/images/project/img_02.jpg"
import projectThumb_3 from "@/assets/images/project/img_03.jpg"
import projectThumb_4 from "@/assets/images/project/img_04.jpg"
import projectThumb_5 from "@/assets/images/project/img_05.jpg"
import projectThumb_6 from "@/assets/images/project/img_06.jpg"
import projectThumb_7 from "@/assets/images/project/img_07.jpg"
import projectThumb_8 from "@/assets/images/project/img_08.jpg"
import projectThumb_9 from "@/assets/images/project/img_09.jpg"

import projectThumb_10 from "@/assets/images/project/img_10.jpg"
import projectThumb_11 from "@/assets/images/project/img_11.jpg"
import projectThumb_12 from "@/assets/images/project/img_12.jpg"
import projectThumb_13 from "@/assets/images/project/img_13.jpg"
import projectThumb_14 from "@/assets/images/project/img_14.jpg"
import projectThumb_15 from "@/assets/images/project/img_15.jpg"

import projectThumb_16 from "@/assets/images/project/img_16.jpg"
import projectThumb_17 from "@/assets/images/project/img_17.jpg"
import projectThumb_18 from "@/assets/images/project/img_18.jpg"
import projectThumb_19 from "@/assets/images/project/img_19.jpg"
import projectThumb_20 from "@/assets/images/project/img_20.jpg"
import projectThumb_21 from "@/assets/images/project/img_21.jpg"

import projectThumb_22 from "@/assets/images/project/img_22.jpg"
import projectThumb_23 from "@/assets/images/project/img_23.jpg"
import projectThumb_24 from "@/assets/images/project/img_24.jpg"
import projectThumb_25 from "@/assets/images/project/img_25.jpg"
import projectThumb_26 from "@/assets/images/project/img_26.jpg"

interface DataType {
   id: number;
   page: string;
   thumb: StaticImageData;
   category: string;
   title?:string;
   date?:string;
   desc?:string;
   tag?:string;
   fancybox?:string;
}

const project_data: DataType[] = [
   {
      id: 1,
      page: "project_1",
      thumb: projectThumb_1,
      category: "house flat"
   },
   {
      id: 2,
      page: "project_1",
      thumb: projectThumb_2,
      category: "villa"
   },
   {
      id: 3,
      page: "project_1",
      thumb: projectThumb_3,
      category: "apartments"
   },
   {
      id: 4,
      page: "project_1",
      thumb: projectThumb_4,
      category: "villa"
   },
   {
      id: 5,
      page: "project_1",
      thumb: projectThumb_5,
      category: "house"
   },
   {
      id: 6,
      page: "project_1",
      thumb: projectThumb_6,
      category: "apartments flat"
   },
   {
      id: 7,
      page: "project_1",
      thumb: projectThumb_7,
      category: "villa"
   },
   {
      id: 8,
      page: "project_1",
      thumb: projectThumb_8,
      category: "apartments"
   },
   {
      id: 9,
      page: "project_1",
      thumb: projectThumb_9,
      category: "house flat"
   },

   // project_2

   {
      id: 1,
      page: "project_2",
      thumb: projectThumb_10,
      category: "house flat"
   },
   {
      id: 2,
      page: "project_2",
      thumb: projectThumb_11,
      category: "villa"
   },
   {
      id: 3,
      page: "project_2",
      thumb: projectThumb_12,
      category: "apartments"
   },
   {
      id: 4,
      page: "project_2",
      thumb: projectThumb_13,
      category: "villa"
   },
   {
      id: 5,
      page: "project_2",
      thumb: projectThumb_14,
      category: "house"
   },
   {
      id: 6,
      page: "project_2",
      thumb: projectThumb_15,
      category: "apartments flat"
   },

   // project_3
   
   {
      id: 1,
      page: "project_3",
      thumb: projectThumb_16,
      category: "house flat",
      title:"VELMORA Aria Residences",
      date:"13 Sep, 24",
      tag:"APARTMENTS",
      fancybox:"16",
   },
   {
      id: 2,
      page: "project_3",
      thumb: projectThumb_17,
      category: "villa",
      title:"The Banyan Residences",
      date:"15 Sep, 24",
      tag:"RESIDENCES",
      fancybox:"17",
   },
   {
      id: 3,
      page: "project_3",
      thumb: projectThumb_18,
      category: "apartments",
      title:"Aaranya Sky Suites",
      date:"17 Sep, 24",
      tag:"APARTMENTS",
      fancybox:"18",
   },
   {
      id: 4,
      page: "project_3",
      thumb: projectThumb_19,
      category: "villa",
      title:"Casa Sol Private Villas",
      date:"19 Sep, 24",
      tag:"VILLA",
      fancybox:"19",
   },
   {
      id: 5,
      page: "project_3",
      thumb: projectThumb_20,
      category: "house",
      title:"Elysian Grand",
      date:"21 Sep, 24",
      tag:"PENTHOUSE",
      fancybox:"20",
   },
   {
      id: 6,
      page: "project_3",
      thumb: projectThumb_21,
      category: "apartments flat",
      title:"The Terraces Luxury Living",
      date:"23 Sep, 24",
      tag:"RESIDENCES",
      fancybox:"21",
   },

   // project_4
   
   {
      id: 1,
      page: "project_4",
      thumb: projectThumb_22,
      fancybox:"22",
      category: "house",
      title:"VELMORA Aria Worli",
      desc:"Contemporary residences designed around generous proportions, natural light and sea views in Mumbai.",
   },
   {
      id: 2,
      page: "project_4",
      thumb: projectThumb_23,
      fancybox:"23",
      category: "villa",
      title:"Casa Sol Assagao",
      desc:"Private courtyard villas nestled amidst lush tropical greenery in North Goa's most desirable enclave.",
   },
   {
      id: 3,
      page: "project_4",
      thumb: projectThumb_24,
      category: "apartments",
      fancybox:"24",
      title:"The Banyan Koramangala",
      desc:"Sophisticated urban homes offering serene garden vistas and curated wellness amenities in Bengaluru.",
   },
   {
      id: 4,
      page: "project_4",
      thumb: projectThumb_25,
      category: "flat",
      fancybox:"25",
      title:"Aaranya Residences Gurugram",
      desc:"Exclusive high-rise residences along Golf Course Road, built for modern executive living and comfort.",
   },
   {
      id: 5,
      page: "project_4",
      thumb: projectThumb_26,
      category: "house",
      fancybox:"26",
      title:"Elysian Jubilee Hills",
      desc:"Architecturally distinctive residences with panoramic ridge views in Hyderabad's premier address.",
   },
]

export default project_data;