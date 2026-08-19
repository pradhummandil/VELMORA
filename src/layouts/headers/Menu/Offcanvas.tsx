import Image, { StaticImageData } from "next/image"
import Fancybox from "@/components/common/Fancybox"
import Link from "next/link"

import offcanvasLogo from "@/assets/images/logo/logo_02.svg"

import offcanvasThumb_1 from "@/assets/images/listing/img_69.jpg"
import offcanvasThumb_2 from "@/assets/images/listing/img_70.jpg"
import offcanvasThumb_3 from "@/assets/images/listing/img_71.jpg"
import offcanvasThumb_4 from "@/assets/images/listing/img_72.jpg"

interface DataType {
   id: number;
   title: string;
   tag: string;
   thumb: StaticImageData;
   carousel_thumb: string[];
   price: string;
   address: string;
   link: string;
}

const offcanvas_data: DataType[] = [
   {
      id: 1,
      title: "The Meridian Sky Suite",
      tag: "FOR SALE",
      thumb: offcanvasThumb_1,
      carousel_thumb: ["1", "2", "3"],
      price: "₹4.80 Cr",
      address: "Worli Sea Face, Mumbai",
      link: "/listing_details_01",
   },
   {
      id: 2,
      title: "The Aria Grand Penthouse",
      tag: "FOR SALE",
      thumb: offcanvasThumb_2,
      carousel_thumb: ["1", "2", "3"],
      price: "₹3.85 Cr",
      address: "Golf Course Rd, Gurugram",
      link: "/listing_details_02",
   },
   {
      id: 3,
      title: "Serein Sky Residence",
      tag: "FOR SALE",
      thumb: offcanvasThumb_3,
      carousel_thumb: ["1", "2", "3"],
      price: "₹3.25 Cr",
      address: "Indiranagar, Bengaluru",
      link: "/listing_details_03",
   },
   {
      id: 4,
      title: "Casa Sol Luxury Villa",
      tag: "FOR SALE",
      thumb: offcanvasThumb_4,
      carousel_thumb: ["1", "2", "3"],
      price: "₹6.80 Cr",
      address: "Assagao, Goa",
      link: "/listing_details_04",
   },
]

const Offcanvas = ({ offCanvas, setOffCanvas }: any) => {
   return (
      <>
         <div className={`offcanvas offcanvas-end sidebar-nav ${offCanvas ? "show" : ""}`} id="sideNav">
            <div className="offcanvas-header">
               <div className="logo order-lg-0">
                  <Link href="/" className="d-flex align-items-center" aria-label="VELMORA Home">
                     <Image src={offcanvasLogo} alt="VELMORA" />
                  </Link>
               </div>
               <button onClick={() => setOffCanvas(false)} type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close Navigation"></button>
            </div>

            <div className="wrapper mt-60">
               <div className="d-flex flex-column h-100">
                  <div className="property-block">
                     <h4 className="title pb-25">Featured Residences</h4>
                     <div className="row">
                        {offcanvas_data.map((item) => (
                           <div key={item.id} className="col-12">
                              <div className="listing-card-one shadow-none style-two mb-40">
                                 <div className="img-gallery">
                                    <div className="position-relative overflow-hidden">
                                       <div className="tag bg-white text-dark fw-500">{item.tag}</div>
                                       <Image src={item.thumb} className="w-100" alt={item.title} />

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
                                                <a key={index} className="d-block" data-fancybox="gallery2" href={`/assets/images/listing/img_large_0${thumb}.jpg`} aria-label={`View image ${index + 1}`}></a>
                                             ))}
                                          </Fancybox>
                                       </div>
                                    </div>
                                 </div>
                                 <div className="property-info d-flex justify-content-between align-items-end pt-30">
                                    <div>
                                       <strong className="price fw-500 color-dark fs-3">{item.price}</strong>
                                       <div className="address pt-5 m0">{item.address}</div>
                                    </div>
                                    <Link href={item.link} className="btn-four mb-5" aria-label={`View ${item.title}`}><i className="bi bi-arrow-up-right"></i></Link>
                                 </div>
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>

                  <div className="address-block mt-50">
                     <h4 className="title pb-15">VELMORA Private Office</h4>
                     <p>Dr Annie Besant Road, Worli, <br />Mumbai, Maharashtra 400018</p>
                     <p>Inquiries? Call our private advisory desk at <br /><Link href="tel:+912249876543">+91 22 4987 6543</Link></p>
                  </div>
                  <ul
                     className="style-none d-flex flex-wrap w-100 justify-content-between align-items-center social-icon pt-25 mt-auto">
                     <li><Link href="#" aria-label="WhatsApp"><i className="fa-brands fa-whatsapp"></i></Link></li>
                     <li><Link href="#" aria-label="X Twitter"><i className="fa-brands fa-x-twitter"></i></Link></li>
                     <li><Link href="#" aria-label="Instagram"><i className="fa-brands fa-instagram"></i></Link></li>
                     <li><Link href="#" aria-label="LinkedIn"><i className="fa-brands fa-linkedin-in"></i></Link></li>
                  </ul>
               </div>
            </div>
         </div>
         <div onClick={() => setOffCanvas(false)} className={`offcanvas-backdrop fade ${offCanvas ? "show" : ""}`}></div>
      </>
   )
}

export default Offcanvas
