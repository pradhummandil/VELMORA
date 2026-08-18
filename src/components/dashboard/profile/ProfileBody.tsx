"use client"
import { useState, useEffect } from "react";
import DashboardHeaderTwo from "@/layouts/headers/dashboard/DashboardHeaderTwo";
import Image from "next/image";
import UserAvatarSetting from "./UserAvatarSetting";
import AddressAndLocation from "./AddressAndLocation";
import Link from "next/link";
import SocialMediaLink from "./SocialMediaLink";

import avatar_1 from "@/assets/images/dashboard/avatar_02.jpg";

const ProfileBody = () => {
   const [name, setName] = useState("");
   const [email, setEmail] = useState("");
   const [firstName, setFirstName] = useState("");
   const [lastName, setLastName] = useState("");
   const [phoneNumber, setPhoneNumber] = useState("");
   const [about, setAbout] = useState("");
   const token = localStorage.getItem("token"); 

   useEffect(() => {
      const fetchUserData = async () => {
         try {
            const res = await fetch("http://localhost:5000/api/profile", {
               headers: {
                  Authorization: `Bearer ${token}`,
               },
            });

            if (!res.ok) {
               throw new Error("Failed to fetch user data");
            }

            const userData = await res.json();
            setName(userData.name);
            setEmail(userData.email);
            setFirstName(userData.firstName || "");
            setLastName(userData.lastName || "");
            setPhoneNumber(userData.phoneNumber || "");
            setAbout(userData.about || "");
         } catch (error) {
            console.error("Error fetching user data:", error);
         }
      };

      fetchUserData();
   }, []);

   const handleSave = async () => {
      try {
         const res = await fetch("http://localhost:5000/api/profile", {
            method: "PUT",
            headers: {
               "Content-Type": "application/json",
               Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
               firstName,
               lastName,
               phoneNumber,
               about,
            }),
         });

         if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.error || "Failed to update profile");
         }

         alert("Profile updated successfully!");
      } catch (error) {
         console.error("Error updating profile:", error);
      }
   };

   return (
      <div className="dashboard-body">
         <div className="position-relative">
            <DashboardHeaderTwo title="Profile" />
            <h2 className="main-title d-block d-lg-none">Profile</h2>

            <div className="bg-white card-box border-20">
               <div className="user-avatar-setting d-flex align-items-center mb-30">
                  <Image src={avatar_1} alt="" className="lazy-img user-img" />
                  <div className="upload-btn position-relative tran3s ms-4 me-3">
                     Upload new photo
                     <input type="file" id="uploadImg" name="uploadImg" placeholder="" />
                  </div>
                  <button className="delete-btn tran3s">Delete</button>
               </div>

               <UserAvatarSetting
                  name={name}
                  email={email}
                  firstName={firstName} setFirstName={setFirstName}
                  lastName={lastName} setLastName={setLastName}
                  phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber}
                  about={about} setAbout={setAbout}
               />
            </div>
            <SocialMediaLink />
            <AddressAndLocation />

            <div className="button-group d-inline-flex align-items-center mt-30">
               <button className="dash-btn-two tran3s me-3" onClick={handleSave}>Save</button>
               <Link href="#" className="dash-cancel-btn tran3s">Cancel</Link>
            </div>
         </div>
      </div>
   );
};

export default ProfileBody;
