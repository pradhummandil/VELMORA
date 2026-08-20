"use client"
import Image, { StaticImageData } from "next/image";
import Slider from "react-slick";

import feedbackImg_1 from "@/assets/images/media/img_01.jpg";
import feedbackImg_2 from "@/assets/images/media/img_02.jpg";
import feedbackImg_3 from "@/assets/images/media/img_03.jpg";

interface DataType {
   id: number;
   blockquote: JSX.Element;
   name: string;
   country: string;
   img: StaticImageData;
}

const feedback_data: DataType[] = [
   {
      id: 1,
      blockquote: (<>VELMORA made our home search remarkably focused. The curated shortlist in Worli was precise and the advisory guidance was <span>extraordinary</span>.</>),
      name: "Vikram Singhania",
      country: "Worli, Mumbai",
      img: feedbackImg_1,
   },
   {
      id: 2,
      blockquote: (<>Found our dream residence in Indiranagar. Transparent documentation and professional guidance made the acquisition <span>seamless</span>.</>),
      name: "Ananya Deshmukh",
      country: "Indiranagar, Bengaluru",
      img: feedbackImg_2,
   },
   {
      id: 3,
      blockquote: (<>The team&apos;s deep understanding of Golf Course Road developments helped us secure an <span>exceptional</span> property with total confidence.</>),
      name: "Rohan Malhotra",
      country: "Golf Course Rd, Gurugram",
      img: feedbackImg_3,
   },
]

const setting = {
   dots: true,
   arrows: false,
   centerPadding: '0px',
   slidesToShow: 1,
   slidesToScroll: 1,
   fade: true,
   autoplay: true,
   autoplaySpeed: 300000
}

const FeedbackOne = () => {
   return (
      <Slider {...setting} className="feedback-slider-one">
         {feedback_data.map((item) => (
            <div key={item.id} className="item">
               <div className="feedback-block-five">
                  <blockquote>{item.blockquote}</blockquote>
                  <div className="d-flex align-items-center justify-content-end">
                     <div className="pe-3 text-end">
                        <h6 className="fs-20 m0">{item.name}</h6>
                        <span className="fs-16 opacity-50">{item.country}</span>
                     </div>
                     <Image src={item.img} alt="" className="rounded-circle avatar" />
                  </div>
               </div>
            </div>
         ))}
      </Slider>
   )
}

export default FeedbackOne
