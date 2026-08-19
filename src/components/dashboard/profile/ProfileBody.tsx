"use client"
import { useState, useEffect } from "react";
import DashboardHeaderTwo from "@/layouts/headers/dashboard/DashboardHeaderTwo";
import UserAvatarSetting from "./UserAvatarSetting";
import AddressAndLocation from "./AddressAndLocation";
import Link from "next/link";
import SocialMediaLink from "./SocialMediaLink";
import { API_BASE_URL } from "@/utils/api";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-toastify";

const getInitials = (name?: string) => {
   if (!name) return "V";
   const parts = name.trim().split(/\s+/);
   if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
   }
   return name.slice(0, 2).toUpperCase();
};

const ProfileBody = () => {
   const { user, refreshProfile } = useAuth();
   const [name, setName] = useState("");
   const [email, setEmail] = useState("");
   const [firstName, setFirstName] = useState("");
   const [lastName, setLastName] = useState("");
   const [phoneNumber, setPhoneNumber] = useState("");
   const [about, setAbout] = useState("");
   const [saving, setSaving] = useState(false);

   useEffect(() => {
      if (user) {
         setName(user.name || "");
         setEmail(user.email || "");
         setFirstName(user.firstName || "");
         setLastName(user.lastName || "");
         setPhoneNumber(user.phoneNumber || "");
         setAbout(user.about || "");
      }
   }, [user]);

   const handleSave = async () => {
      setSaving(true);
      try {
         const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
         const res = await fetch(`${API_BASE_URL}/api/profile`, {
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

         await refreshProfile();
         toast.success("Profile updated successfully!", { position: "top-center" });
      } catch (error: any) {
         toast.error(error.message || "Error updating profile");
      } finally {
         setSaving(false);
      }
   };

   return (
      <div className="dashboard-body">
         <div className="position-relative">
            <DashboardHeaderTwo title="Profile" />
            <h2 className="main-title d-block d-lg-none">Profile</h2>

            <div className="bg-white card-box border-20">
               <div className="user-avatar-setting d-flex align-items-center mb-30">
                  <div 
                     className="rounded-circle d-flex align-items-center justify-content-center fw-600 user-img"
                     style={{ width: "70px", height: "70px", backgroundColor: "#0D1A1C", color: "#D4AF37", fontSize: "22px", letterSpacing: "1px" }}
                  >
                     {getInitials(name || user?.name)}
                  </div>
                  <div className="ms-4">
                     <h5 className="mb-5 color-dark">{name || user?.name}</h5>
                     <p className="fs-14 text-muted m0">{email || user?.email}</p>
                  </div>
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
               <button className="dash-btn-two tran3s me-3" onClick={handleSave} disabled={saving}>
                  {saving ? "Saving..." : "Save"}
               </button>
               <Link href="/dashboard/dashboard-index" className="dash-cancel-btn tran3s">Cancel</Link>
            </div>
         </div>
      </div>
   );
};

export default ProfileBody;

