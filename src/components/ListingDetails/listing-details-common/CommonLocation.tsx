
const CommonLocation = () => {
   return (
      <>
         <h4 className="mb-40">Location</h4>
         <div className="bg-white shadow4 border-20 p-30">
            <div className="map-banner overflow-hidden border-15">
               <div className="gmap_canvas h-100 w-100">
                  <iframe
                     src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15088.35!2d72.815!3d19.015!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7ceeb83296c0d%3A0x6b3017a44f9c73a2!2sWorli%2C%20Mumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                     width="600" height="450" style={{ border: 0 }} allowFullScreen={true} loading="lazy"
                     referrerPolicy="no-referrer-when-downgrade" className="w-100 h-100" title="Worli Mumbai Location Map">
                  </iframe>
               </div>
            </div>
         </div>
      </>
   )
}

export default CommonLocation;
