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
import { API_BASE_URL } from "@/utils/api";
import { useAuth, UserRole } from "@/context/AuthContext";
import OpenEye from "@/assets/images/icon/icon_68.svg";

interface FormData {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  termsAccepted: boolean;
}

const RegisterForm = () => {
  const router = useRouter(); 
  const { login } = useAuth();
  const [selectedRole, setSelectedRole] = useState<UserRole>("user");

  const schema = yup
    .object({
      name: yup.string().required("Name is required"),
      email: yup.string().required("Email is required").email("Invalid email"),
      password: yup.string().required("Password is required").min(6, "Password must be at least 6 characters"),
      role: yup.string().oneOf(["user", "agent", "property_owner"] as const).required(),
      termsAccepted: yup
        .boolean()
        .oneOf([true], "You must accept the terms and conditions") 
        .required(),
    })
    .required();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema) as any,
    defaultValues: {
      role: "user",
    },
  });

  const [isPasswordVisible, setPasswordVisibility] = useState(false);
  const [loading, setLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisibility(!isPasswordVisible);
  };

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    setValue("role", role);
  };

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const payload = {
        name: data.name,
        email: data.email,
        password: data.password,
        role: selectedRole,
        termsAccepted: data.termsAccepted,
      };

      const response = await axios.post(`${API_BASE_URL}/api/auth/signup`, payload);

      if (response.status === 201) {
        try {
          const loginRes = await axios.post(`${API_BASE_URL}/api/auth/login`, {
            email: data.email,
            password: data.password,
          });
          if (loginRes.data && loginRes.data.token) {
            await login(loginRes.data.token, loginRes.data.user);
          }
        } catch (loginErr) {
          console.warn("Auto-login error post-signup:", loginErr);
        }

        toast.success("Account created successfully! Welcome to VELMORA.", {
          position: "top-center",
        });

        reset();
        const closeBtn = document.querySelector("#loginModal .btn-close") as HTMLElement;
        if (closeBtn) closeBtn.click();
        router.push("/dashboard/dashboard-index"); 
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
        {/* Role Selection */}
        <div className="col-12 mb-25">
          <label className="fw-500 fs-15 color-dark mb-2 d-block">What are you joining VELMORA as?</label>
          <div className="row g-2">
            <div className="col-4">
              <button
                type="button"
                onClick={() => handleRoleSelect("user")}
                className={`w-100 p-2 text-center rounded-3 border tran3s d-flex flex-column align-items-center justify-content-center ${
                  selectedRole === "user" ? "bg-dark text-white border-dark shadow-sm" : "bg-light text-dark border-light"
                }`}
                style={{ minHeight: "75px" }}
              >
                <i className="fa-regular fa-compass fs-16 mb-1"></i>
                <span className="fw-600 fs-12 text-uppercase">Buyer / User</span>
                <span className="fs-10 opacity-75 d-none d-sm-block mt-1">Discover homes</span>
              </button>
            </div>
            <div className="col-4">
              <button
                type="button"
                onClick={() => handleRoleSelect("agent")}
                className={`w-100 p-2 text-center rounded-3 border tran3s d-flex flex-column align-items-center justify-content-center ${
                  selectedRole === "agent" ? "bg-dark text-white border-dark shadow-sm" : "bg-light text-dark border-light"
                }`}
                style={{ minHeight: "75px" }}
              >
                <i className="fa-regular fa-briefcase fs-16 mb-1"></i>
                <span className="fw-600 fs-12 text-uppercase">Agent</span>
                <span className="fs-10 opacity-75 d-none d-sm-block mt-1">Manage listings</span>
              </button>
            </div>
            <div className="col-4">
              <button
                type="button"
                onClick={() => handleRoleSelect("property_owner")}
                className={`w-100 p-2 text-center rounded-3 border tran3s d-flex flex-column align-items-center justify-content-center ${
                  selectedRole === "property_owner" ? "bg-dark text-white border-dark shadow-sm" : "bg-light text-dark border-light"
                }`}
                style={{ minHeight: "75px" }}
              >
                <i className="fa-regular fa-house-chimney fs-16 mb-1"></i>
                <span className="fw-600 fs-12 text-uppercase">Owner</span>
                <span className="fs-10 opacity-75 d-none d-sm-block mt-1">List & manage</span>
              </button>
            </div>
          </div>
        </div>

        <div className="col-12">
          <div className="input-group-meta position-relative mb-25">
            <label>Full Name*</label>
            <input type="text" {...register("name")} placeholder="Your Name" />
            <p className="form_error">{errors.name?.message}</p>
          </div>
        </div>
        <div className="col-12">
          <div className="input-group-meta position-relative mb-25">
            <label>Email Address*</label>
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
                By hitting &quot;Sign Up&quot;, you agree to the{" "}
                <Link href="#">Terms & Conditions</Link> & <Link href="#">Privacy Policy</Link>
              </label>
              <p className="form_error">{errors.termsAccepted?.message}</p>
            </div>
          </div>
        </div>
        <div className="col-12">
          <button type="submit" className="btn-two w-100 text-uppercase d-block mt-20" disabled={loading}>
            {loading ? "Creating Account..." : "SIGN UP"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default RegisterForm;
