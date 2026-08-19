import Link from "next/link"

const SocialMediaLink = () => {
   return (
      <div className="bg-white card-box border-20 mt-40">
         <h4 className="dash-title-three">Social Media</h4>

         <div className="dash-input-wrapper mb-20">
            <label htmlFor="">LinkedIn</label>
            <input type="text" placeholder="https://linkedin.com/company/velmora" />
         </div>
         <div className="dash-input-wrapper mb-20">
            <label htmlFor="">X / Twitter</label>
            <input type="text" placeholder="https://x.com/velmorarealty" />
         </div>
         <Link href="#" className="dash-btn-one"><i className="bi bi-plus"></i> Add more link</Link>
      </div>
   )
}

export default SocialMediaLink
