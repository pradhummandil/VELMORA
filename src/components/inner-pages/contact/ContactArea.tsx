import Link from "next/link"
import Image from "next/image"

import circleImg from "@/assets/images/icon/icon_39.svg"
import ContactForm from "@/components/forms/ContactForm";

interface DataType {
   id: number;
   class_name?: string;
   title: string;
   address_1: string;
   address_2?: string;
}

const address_data: DataType[] = [
   {
      id: 1,
      title: "Advisory Desk",
      address_1: "advisory@velmora.in"
   },
   {
      id: 2,
      class_name: "skew-line",
      title: "Direct Client Line",
      address_1: "+91 98200 12345,",
      address_2: "+91 22 6100 4500",
   },
   {
      id: 3,
      title: "Private Office",
      address_1: "Worli Sea Face, Mumbai"
   },
]

const ContactArea = () => {
   return (
      <div className="contact-us border-top mt-130 xl-mt-100 pt-80 lg-pt-60">
         <div className="container">
            <div className="row">
               <div className="col-xxl-9 col-xl-8 col-lg-10 m-auto">
                  <div className="title-one text-center wow fadeInUp">
                     <div className="fs-14 fw-semibold text-uppercase mb-10" style={{ color: "#B89B5E", letterSpacing: "2px" }}>CONNECT WITH VELMORA</div>
                     <h2 className="font-garamond">Start Your Property Journey</h2>
                     <p className="fs-22 mt-xs">Tell us what you&apos;re looking for and a VELMORA advisor will guide your next step.</p>
                  </div>
               </div>
            </div>
         </div>

         <div className="address-banner wow fadeInUp mt-60 lg-mt-40">
            <div className="container">
               <div className="d-flex flex-wrap justify-content-center justify-content-lg-between">
                  {address_data.map((item) => (
                     <div key={item.id} className={`block position-relative ${item.class_name} z-1 mt-25`}>
                        <div className="d-xl-flex align-items-center">
                           <div className="icon rounded-circle d-flex align-items-center justify-content-center">
                              <Image src={circleImg} alt="" className="lazy-img" /></div>
                           <div className="text">
                              <p className="fs-22">{item.title}</p>
                              <Link href="#" className="tran3s">{item.address_1}</Link>
                              {item.address_2 && <> { " " } <Link href="#" className="tran3s">{item.address_2}</Link></>}
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </div>

         <div className="bg-pink mt-150 xl-mt-120 md-mt-80">
            <div className="row">
               <div className="col-xl-7 col-lg-6">
                  <div className="form-style-one wow fadeInUp">
                     <ContactForm />
                  </div>
               </div>
               <div className="col-xl-5 col-lg-6 d-flex order-lg-first">
                  <div className="contact-map-banner w-100">
                     <div className="gmap_canvas h-100 w-100">
                        <iframe className="gmap_iframe h-100 w-100" src="https://maps.google.com/maps?width=600&amp;height=400&amp;hl=en&amp;q=Worli+Mumbai&amp;t=&amp;z=12&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"></iframe>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default ContactArea
