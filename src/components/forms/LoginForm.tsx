"use client"
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; 
import { toast } from 'react-toastify';
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import Image from "next/image";

import OpenEye from "@/assets/images/icon/icon_68.svg";
import { API_BASE_URL } from "@/utils/api";
import { useAuth } from "@/context/AuthContext";


interface FormData {
   email: string;
   password: string;
}

const LoginForm = () => {
   const router = useRouter(); 
   const { login } = useAuth();
   const schema = yup
      .object({
         email: yup.string().required().email().label("Email"),
         password: yup.string().required().label("Password"),
      })
      .required();

   const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver: yupResolver(schema) });

   const onSubmit = async (data: FormData) => {
      try {
         const response = await fetch(`${API_BASE_URL}/api/auth/login`, { 
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
         });

         const result = await response.json();

         if (response.ok) {
            await login(result.token, result.user);
            toast.success("Login successful!", { position: "top-center" });
            reset();
            const closeBtn = document.querySelector("#loginModal .btn-close") as HTMLElement;
            if (closeBtn) closeBtn.click();
            router.push("/dashboard/dashboard-index"); 
         } else {
            toast.error(result.error || result.message || "Invalid email or password");
         }
      } catch (error) {
         toast.error("Unable to connect to authentication service. Please try again.");
      }
   };


   const [isPasswordVisible, setPasswordVisibility] = useState(false);
   const togglePasswordVisibility = () => setPasswordVisibility(!isPasswordVisible);

   return (
      <form onSubmit={handleSubmit(onSubmit)}>
         <div className="row">
            <div className="col-12">
               <div className="input-group-meta position-relative mb-25">
                  <label>Email*</label>
                  <input type="email" {...register("email")} placeholder="Youremail@gmail.com" />
                  <p className="form_error">{errors.email?.message}</p>
               </div>
            </div>
            <div className="col-12">
               <div className="input-group-meta position-relative mb-20">
                  <label>Password*</label>
                  <input type={isPasswordVisible ? "text" : "password"} {...register("password")} placeholder="Enter Password" className="pass_log_id" />
                  <span className="placeholder_icon">
                     <span className={`passVicon ${isPasswordVisible ? "eye-slash" : ""}`}>
                        <Image onClick={togglePasswordVisibility} src={OpenEye} alt="" />
                     </span>
                  </span>
                  <p className="form_error">{errors.password?.message}</p>
               </div>
            </div>
            <div className="col-12">
               <div className="agreement-checkbox d-flex justify-content-between align-items-center">
                  <div>
                     <input type="checkbox" id="remember" />
                     <label htmlFor="remember">Keep me logged in</label>
                  </div>
                  <Link href="#">Forget Password?</Link>
               </div>
            </div>
            <div className="col-12">
               <button type="submit" className="btn-two w-100 text-uppercase d-block mt-20">Login</button>
            </div>
         </div>
      </form>
   )
}

export default LoginForm;
