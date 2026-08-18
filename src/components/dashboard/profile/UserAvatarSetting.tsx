"use client"
import NiceSelect from "@/ui/NiceSelect";
import { Dispatch, SetStateAction } from "react";

interface UserAvatarSettingProps {
   firstName: string;
   setFirstName: Dispatch<SetStateAction<string>>;
   lastName: string;
   setLastName: Dispatch<SetStateAction<string>>;
   phoneNumber: string;
   setPhoneNumber: Dispatch<SetStateAction<string>>;
   about: string;
   setAbout: Dispatch<SetStateAction<string>>;
   name: string;
   email: string;
}

const UserAvatarSetting: React.FC<UserAvatarSettingProps> = ({
   firstName, setFirstName,
   lastName, setLastName,
   phoneNumber, setPhoneNumber,
   about, setAbout,
   name, email
}) => {

   const selectHandler = (e: any) => { };

   return (
      <div className="row">
         <div className="col-12">
            <div className="dash-input-wrapper mb-30">
               <label htmlFor="">Username*</label>
               <input type="text" value={name} disabled />
            </div>
         </div>
         <div className="col-sm-6">
            <div className="dash-input-wrapper mb-30">
               <label htmlFor="">First Name*</label>
               <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            </div>
         </div>
         <div className="col-sm-6">
            <div className="dash-input-wrapper mb-30">
               <label htmlFor="">Last Name*</label>
               <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
            </div>
         </div>
         <div className="col-sm-6">
            <div className="dash-input-wrapper mb-30">
               <label htmlFor="">Email*</label>
               <input type="email" value={email} disabled />
            </div>
         </div>
         <div className="col-sm-6">
            <div className="dash-input-wrapper mb-30">
               <label htmlFor="">Position*</label>
               <NiceSelect className="nice-select"
                  options={[
                     { value: "1", text: "Agent" },
                     { value: "2", text: "Agency" },
                  ]}
                  defaultCurrent={0}
                  onChange={selectHandler}
                  name=""
                  placeholder="" />
            </div>
         </div>
         <div className="col-sm-6">
            <div className="dash-input-wrapper mb-30">
               <label htmlFor="">Phone Number*</label>
               <input type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
            </div>
         </div>
         <div className="col-sm-6">
            <div className="dash-input-wrapper mb-30">
               <label htmlFor="">Website*</label>
               <input type="text" placeholder="http://somename.com" />
            </div>
         </div>
         <div className="col-12">
            <div className="dash-input-wrapper">
               <label htmlFor="">About*</label>
               <textarea className="size-lg" value={about} onChange={(e) => setAbout(e.target.value)}></textarea>
               <div className="alert-text">Brief description for your profile. URLs are hyperlinked.</div>
            </div>
         </div>
      </div>
   )
}

export default UserAvatarSetting;
