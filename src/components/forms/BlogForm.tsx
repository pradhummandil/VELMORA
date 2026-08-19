"use client"
import LoginModal from "@/modals/LoginModal";
import { toast } from 'react-toastify';
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from "react";

interface FormData {
   name: string;
   email: string;
   message: string;
}

const schema = yup
   .object({
      name: yup.string().required().label("Name"),
      email: yup.string().required().email().label("Email"),
      message: yup.string().required().label("Message"),
   })
   .required();

const BlogForm = () => {

   const { register, handleSubmit, reset, formState: { errors }, } = useForm<FormData>({ resolver: yupResolver(schema), });
   const onSubmit = (data: FormData) => {
      toast.success('Thank you! Your perspective has been submitted for review.', { position: 'top-center' });
      reset();
   };

   const [loginModal, setLoginModal] = useState<boolean>(false);

   return (
      <>
         <div className="blog-comment-form">
            <h3 className="blog-inner-title">Leave A Comment</h3>
            <p><a onClick={() => setLoginModal(true)} style={{ cursor: "pointer" }} className="text-decoration-underline fw-500">Sign in</a> to post your comment or signup
               if you don’t have an account.</p>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-30">
               <div className="input-wrapper mb-30">
                  <label htmlFor="comment_name">Name*</label>
                  <input id="comment_name" {...register("name")} type="text" placeholder="Vikram Malhotra" />
                  <p className="form_error">{errors.name?.message}</p>
               </div>
               <div className="input-wrapper mb-40">
                  <label htmlFor="comment_email">Email*</label>
                  <input id="comment_email" {...register("email")} type="email" placeholder="vikram.malhotra@gmail.com" />
                  <p className="form_error">{errors.email?.message}</p>
               </div>
               <div className="input-wrapper mb-30">
                  <label htmlFor="comment_msg">Your Comment*</label>
                  <textarea id="comment_msg" {...register("message")} placeholder="Share your insights on Indian luxury real estate, regulatory trends, or investment architecture..."></textarea>
                  <p className="form_error">{errors.message?.message}</p>
               </div>
               <button type="submit" aria-label="Post Comment" className="btn-five rounded-0">Post Comment</button>
            </form>
         </div>
         <LoginModal loginModal={loginModal} setLoginModal={setLoginModal} />
      </>
   )
}

export default BlogForm;
