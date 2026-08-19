"use client"
import Image from "next/image"
import Link from "next/link"
import LoginForm from "@/components/forms/LoginForm"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"
import { API_BASE_URL } from "@/utils/api"

import loginIcon_1 from "@/assets/images/icon/google.png"
import loginIcon_2 from "@/assets/images/icon/facebook.png"
import RegisterForm from "@/components/forms/RegisterForm"

const tab_title: string[] = ["Login", "Signup"];

const LoginModal = ({ loginModal, setLoginModal }: any) => {
   const router = useRouter();
   const [activeTab, setActiveTab] = useState(0);

   const handleTabClick = (index: any) => {
      setActiveTab(index);
   };

   useEffect(() => {
      // Load Google Identity Services script if not already present
      if (typeof window !== "undefined" && !document.getElementById("google-gsi-client")) {
         const script = document.createElement("script");
         script.id = "google-gsi-client";
         script.src = "https://accounts.google.com/gsi/client";
         script.async = true;
         script.defer = true;
         document.head.appendChild(script);
      }
   }, []);

   const handleGoogleSignIn = () => {
      const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

      if (!clientId) {
         toast.info("Google Sign-In requires NEXT_PUBLIC_GOOGLE_CLIENT_ID in environment settings.", {
            position: "top-center",
         });
         console.warn("Google Sign-In: NEXT_PUBLIC_GOOGLE_CLIENT_ID is not configured in environment variables.");
         return;
      }

      if (typeof window !== "undefined" && (window as any).google?.accounts?.oauth2) {
         try {
            const tokenClient = (window as any).google.accounts.oauth2.initTokenClient({
               client_id: clientId,
               scope: "email profile openid",
               callback: async (tokenResponse: any) => {
                  if (tokenResponse && tokenResponse.access_token) {
                     try {
                        const userInfoRes = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
                           headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
                        });
                        const userInfo = await userInfoRes.json();

                        if (userInfo && userInfo.email) {
                           const res = await fetch(`${API_BASE_URL}/api/auth/google`, {
                              method: "POST",
                              headers: { "Content-Type": "application/json" },
                              body: JSON.stringify({
                                 email: userInfo.email,
                                 name: userInfo.name || userInfo.email.split("@")[0],
                              }),
                           });
                           const data = await res.json();
                           if (res.ok && data.token) {
                              localStorage.setItem("token", data.token);
                              toast.success("Google Sign-In successful!", { position: "top-center" });
                              const closeBtn = document.querySelector("#loginModal .btn-close") as HTMLElement;
                              if (closeBtn) closeBtn.click();
                              router.push("/dashboard/dashboard-index");
                           } else {
                              toast.error(data.error || "Google Sign-In failed");
                           }
                        } else {
                           toast.error("Could not retrieve Google profile details.");
                        }
                     } catch (e) {
                        console.error("Google userinfo fetch error:", e);
                        toast.error("Unable to complete Google authentication");
                     }
                  } else if (tokenResponse && tokenResponse.error) {
                     console.warn("Google OAuth error:", tokenResponse.error);
                  }
               },
            });

            tokenClient.requestAccessToken({ prompt: "select_account" });
         } catch (err) {
            console.error("Google OAuth token client initialization error:", err);
            toast.error("Unable to initialize Google Sign-In dialog.");
         }
      } else if (typeof window !== "undefined" && (window as any).google?.accounts?.id) {
         // Fallback to GIS ID client
         (window as any).google.accounts.id.initialize({
            client_id: clientId,
            callback: async (response: any) => {
               try {
                  const res = await fetch(`${API_BASE_URL}/api/auth/google`, {
                     method: "POST",
                     headers: { "Content-Type": "application/json" },
                     body: JSON.stringify({ credential: response.credential }),
                  });
                  const data = await res.json();
                  if (res.ok && data.token) {
                     localStorage.setItem("token", data.token);
                     toast.success("Google Sign-In successful!", { position: "top-center" });
                     const closeBtn = document.querySelector("#loginModal .btn-close") as HTMLElement;
                     if (closeBtn) closeBtn.click();
                     router.push("/dashboard/dashboard-index");
                  } else {
                     toast.error(data.error || "Google Sign-In failed");
                  }
               } catch (e) {
                  toast.error("Unable to complete Google authentication");
               }
            },
         });
         (window as any).google.accounts.id.prompt();
      } else {
         toast.error("Google authentication service is initializing. Please try again in a moment.");
      }
   };

   const handleFacebookSignIn = () => {
      toast.info("Facebook authentication is in preview mode. Please use Email or Google.", { position: "top-center" });
   };

   return (
      <>
         <div className="modal fade" id="loginModal" tabIndex={-1} aria-hidden="true">
            <div className="modal-dialog modal-fullscreen modal-dialog-centered">
               <div className="container">
                  <div className="user-data-form modal-content">
                     <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                     <div className="form-wrapper m-auto">
                        <ul className="nav nav-tabs w-100">
                           {tab_title.map((tab, index) => (
                              <li key={index} onClick={() => handleTabClick(index)} className="nav-item">
                                 <button className={`nav-link ${activeTab === index ? "active" : ""}`}>{tab}</button>
                              </li>
                           ))}
                        </ul>
                        <div className="tab-content mt-30">
                           <div className={`tab-pane fade ${activeTab === 0 ? 'show active' : ''}`}>
                              <div className="text-center mb-20">
                                 <h2>Welcome to VELMORA</h2>
                                 <p className="fs-20 color-dark">Still don&apos;t have an account? <Link href="#" onClick={() => setActiveTab(1)}>Sign up</Link></p>
                              </div>
                              <LoginForm />
                           </div>

                           <div className={`tab-pane fade ${activeTab === 1 ? 'show active' : ''}`}>
                              <div className="text-center mb-20">
                                 <h2>Create your VELMORA account</h2>
                                 <p className="fs-20 color-dark">Already have an account? <Link href="#" onClick={() => setActiveTab(0)}>Login</Link></p>
                              </div>
                              <RegisterForm />
                           </div>
                        </div>

                        <div className="d-flex align-items-center mt-30 mb-10">
                           <div className="line"></div>
                           <span className="pe-3 ps-3 fs-6">OR</span>
                           <div className="line"></div>
                        </div>
                        <div className="row">
                           <div className="col-sm-6">
                              <button 
                                 type="button" 
                                 onClick={handleGoogleSignIn}
                                 className="social-use-btn d-flex align-items-center justify-content-center tran3s w-100 mt-10 border-0 bg-transparent"
                              >
                                 <Image src={loginIcon_1} alt="" />
                                 <span className="ps-3">Continue with Google</span>
                              </button>
                           </div>
                           <div className="col-sm-6">
                              <button 
                                 type="button"
                                 onClick={handleFacebookSignIn}
                                 className="social-use-btn d-flex align-items-center justify-content-center tran3s w-100 mt-10 border-0 bg-transparent"
                              >
                                 <Image src={loginIcon_2} alt="" />
                                 <span className="ps-3">Continue with Facebook</span>
                              </button>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </>
   )
}

export default LoginModal

