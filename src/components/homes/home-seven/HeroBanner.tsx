import DropdownSeven from "@/components/search-dropdown/home-dropdown/DropdownSeven"

const HeroBanner = () => {
   return (
      <div className="hero-banner-seven position-relative mt-120 lg-mt-100">
         <div id="" className="h-100">
            <div className="google-map-home" id="contact-google-map" data-map-lat="19.015" data-map-lng="72.815" data-icon-path="/assets/images/logo/logo_01.svg" data-map-title="VELMORA Residences" data-map-zoom="12"></div>
            <iframe
               src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15088.35!2d72.815!3d19.015!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7ceeb83296c0d%3A0x6b3017a44f9c73a2!2sWorli%2C%20Mumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
               width="600" height="450" style={{ border: 0 }} allowFullScreen={true} loading="lazy"
               referrerPolicy="no-referrer-when-downgrade" className="w-100 h-100">
            </iframe>
         </div>

         <div className="search-wrapper-overlay">
            <div className="container container-large">
               <div className="position-relative">
                  <div className="row">
                     <div className="col-12">
                        <DropdownSeven />
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default HeroBanner
