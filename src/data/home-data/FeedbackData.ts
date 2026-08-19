import { StaticImageData } from "next/image";

import feedbackThumb_1 from "@/assets/images/media/img_01.jpg";
import feedbackThumb_2 from "@/assets/images/media/img_02.jpg";
import feedbackThumb_3 from "@/assets/images/media/img_03.jpg";

import feedback3Thumb_1 from "@/assets/images/media/img_01.jpg";
import feedback3Thumb_2 from "@/assets/images/media/img_02.jpg";
import feedback3Thumb_3 from "@/assets/images/media/img_03.jpg";

import quoteIcon from "@/assets/images/icon/icon_29.svg";

interface DataType {
  id: number;
  page: string;
  desc: string;
  title: string;
  country: string;
  thumb: StaticImageData;
  quote_icon: StaticImageData;
}

const feedback_data: DataType[] = [
  {
    id: 1,
    page: "home_3",
    desc: "VELMORA made our home search remarkably focused. The curated shortlist in Worli was precise and the advisory guidance was truly exceptional.",
    title: "Pradhum Mandil",
    country: "Mumbai",
    thumb: feedback3Thumb_1,
    quote_icon: quoteIcon,
  },
  {
    id: 2,
    page: "home_3",
    desc: "Found our dream residence in Indiranagar. Transparent documentation and professional guidance made the acquisition seamless.",
    title: "Vikram Malhotra",
    country: "Bengaluru",
    thumb: feedback3Thumb_2,
    quote_icon: quoteIcon,
  },
  {
    id: 3,
    page: "home_3",
    desc: "The team's deep understanding of Golf Course Road luxury developments helped us secure an extraordinary address with peace of mind.",
    title: "Pooja Hegde",
    country: "Gurugram",
    thumb: feedback3Thumb_3,
    quote_icon: quoteIcon,
  },
  {
    id: 4,
    page: "home_3",
    desc: "From initial viewings in Koregaon Park to completion, VELMORA's advisory standards and attention to detail were unmatched.",
    title: "Rohit Deshmukh",
    country: "Pune",
    thumb: feedback3Thumb_2,
    quote_icon: quoteIcon,
  },

  // home_5

  {
    id: 1,
    page: "home_5",
    desc: "VELMORA made our home search remarkably focused. The curated shortlist in Worli was precise and the advisory guidance was truly exceptional.",
    title: "Pradhum Mandil",
    country: "Mumbai",
    thumb: feedbackThumb_1,
    quote_icon: quoteIcon,
  },
  {
    id: 2,
    page: "home_5",
    desc: "Found our dream residence in Indiranagar. Transparent documentation and professional guidance made the acquisition seamless.",
    title: "Vikram Malhotra",
    country: "Bengaluru",
    thumb: feedbackThumb_2,
    quote_icon: quoteIcon,
  },
  {
    id: 3,
    page: "home_5",
    desc: "The team's deep understanding of Golf Course Road luxury developments helped us secure an extraordinary address with peace of mind.",
    title: "Pooja Hegde",
    country: "Gurugram",
    thumb: feedbackThumb_3,
    quote_icon: quoteIcon,
  },
];

export default feedback_data;
