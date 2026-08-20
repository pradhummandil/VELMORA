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

import qouteIcon from "@/assets/images/icon/icon_38.svg"
import ShapeIcon from "@/assets/images/shape/shape_62.svg"

const Feedback = () => {
   return (
      <div className="feedback-section-seven mt-170 xl-mt-120 md-mt-80">
         <div className="container container-large">
            <div className="position-relative z-1">
               <div className="row">
                  <div className="col-lg-5">
                     <div className="title-one mt-30 md-mb-50 pe-xxl-4 wow fadeInLeft">
                        <div className="upper-title">CLIENT Feedback</div>
                        <h3>Rely on Clients, Not Just Our Claims.</h3>
                     </div>
                  </div>
                  <div className="col-lg-7">
                     <div className="content-wrapper position-relative z-1 ms-xxl-3">
                        <div className="icon d-flex align-items-center justify-content-center rounded-circle mb-35"><Image src={qouteIcon} alt="" className="lazy-img" /></div>
                        <Slider {...setting} className="feedback-slider-one">
                           {feedback_data.map((item) => (
                              <div key={item.id} className="item">
                                 <div className="feedback-block-five">
                                    <blockquote>{item.blockquote}</blockquote>
                                    <div className="d-flex align-items-center justify-content-end ct-info">
                                       <Image src={item.img} alt="" className="rounded-circle avatar" />
                                       <div className="ps-3">
                                          <h6 className="fs-20 m0">{item.name}</h6>
                                          <span className="fs-16 opacity-50">{item.country}</span>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           ))}
                        </Slider>
                     </div>
                  </div>
               </div>
               <div className="rating-box">
                  <Image src={ShapeIcon} alt="" className="lazy-img" />
                  <div className="rate fw-500">9.3 <br /><span>Rating</span></div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default Feedback
