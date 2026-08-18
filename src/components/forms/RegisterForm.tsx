"use client";
import { useState } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/navigation"; 


import OpenEye from "@/assets/images/icon/icon_68.svg";

interface FormData {
  name: string;
  email: string;
  password: string;
  termsAccepted: boolean;
}

const RegisterForm = () => {
  const router = useRouter(); 

  const schema = yup
  .object({
    name: yup.string().required("Name is required"),
    email: yup.string().required("Email is required").email("Invalid email"),
    password: yup.string().required("Password is required"),
    termsAccepted: yup
      .boolean()
      .oneOf([true], "You must accept the terms and conditions") 
      .required(),
  })
  .required();


  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const [isPasswordVisible, setPasswordVisibility] = useState(false);
  const [loading, setLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisibility(!isPasswordVisible);
  };

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/api/auth/signup", data);

      if (response.status === 201) {
        toast.success("Registration successful! Redirecting to login...", {
          position: "top-center",
        });

        reset();
        setTimeout(() => router.push("/dashboard/dashboard-index"), 2000); 
      }
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Error during registration", {
        position: "top-center",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="row">
        <div className="col-12">
          <div className="input-group-meta position-relative mb-25">
            <label>Name*</label>
            <input type="text" {...register("name")} placeholder="Your Name" />
            <p className="form_error">{errors.name?.message}</p>
          </div>
        </div>
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
            <input
              type={isPasswordVisible ? "text" : "password"}
              {...register("password")}
              placeholder="Enter Password"
              className="pass_log_id"
            />
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
              <input type="checkbox" id="termsAccepted" {...register("termsAccepted")} />
              <label htmlFor="termsAccepted">
                By hitting the &quot;Register&quot; button, you agree to the{" "}
                <Link href="#">Terms conditions</Link> & <Link href="#">Privacy Policy</Link>
              </label>
              <p className="form_error">{errors.termsAccepted?.message}</p>
            </div>
          </div>
        </div>
        <div className="col-12">
          <button type="submit" className="btn-two w-100 text-uppercase d-block mt-20" disabled={loading}>
            {loading ? "Signing up..." : "SIGN UP"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default RegisterForm;
