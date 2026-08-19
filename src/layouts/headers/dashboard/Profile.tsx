"use client";

import Link from "next/link";
import Image from "next/image";
import DeleteModal from "@/modals/DeleteModal";
import { useAuth } from "@/context/AuthContext";

import profileIcon_1 from "@/assets/images/dashboard/icon/icon_23.svg";
import profileIcon_2 from "@/assets/images/dashboard/icon/icon_24.svg";
import profileIcon_3 from "@/assets/images/dashboard/icon/icon_25.svg";

const Profile = () => {
   const { user, logout } = useAuth();

   return (
      <>
         <div className="user-name-data">
            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="profile-dropdown">
               {user && (
                  <li className="px-3 py-2 border-bottom">
                     <div className="fw-600 color-dark text-truncate" style={{ maxWidth: "200px" }}>{user.name}</div>
                     <div className="fs-12 text-muted text-truncate" style={{ maxWidth: "200px" }}>{user.email}</div>
                  </li>
               )}
               <li>
                  <Link className="dropdown-item d-flex align-items-center mt-1" href="/dashboard/profile">
                     <Image src={profileIcon_1} alt="" className="lazy-img" />
                     <span className="ms-2 ps-1">Profile</span>
                  </Link>
               </li>
               <li>
                  <Link className="dropdown-item d-flex align-items-center" href="/dashboard/account-settings">
                     <Image src={profileIcon_2} alt="" className="lazy-img" />
                     <span className="ms-2 ps-1">Account Settings</span>
                  </Link>
               </li>
               <li>
                  <button 
                     type="button" 
                     onClick={logout} 
                     className="dropdown-item d-flex align-items-center text-danger border-0 bg-transparent"
                  >
                     <i className="fa-regular fa-arrow-right-from-bracket me-2 ps-1 fs-15"></i>
                     <span className="ms-1">Logout</span>
                  </button>
               </li>
               <li>
                  <hr className="dropdown-divider my-1" />
               </li>
               <li>
                  <Link className="dropdown-item d-flex align-items-center text-muted fs-13" href="#" data-bs-toggle="modal" data-bs-target="#deleteModal">
                     <Image src={profileIcon_3} alt="" className="lazy-img"/>
                     <span className="ms-2 ps-1">Delete Account</span>
                  </Link>
               </li>
            </ul>
         </div>
         <DeleteModal />
      </>
   );
};

export default Profile;

