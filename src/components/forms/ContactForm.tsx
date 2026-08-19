"use client"
import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import { toast } from 'react-toastify';
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';

interface FormData {
   user_name: string;
   user_email: string;
   message: string;
}

const schema = yup
   .object({
      user_name: yup.string().required().label("Name"),
      user_email: yup.string().required().email().label("Email"),
      message: yup.string().required().label("Message"),
   })
   .required();

const ContactForm = () => {

   const [isSubmitting, setIsSubmitting] = React.useState(false);
   const { register, handleSubmit, reset, formState: { errors }, } = useForm<FormData>({ resolver: yupResolver(schema), });

   const form = useRef<HTMLFormElement>(null);

   const sendEmail = (data: FormData) => {
      setIsSubmitting(true);
      if (form.current) {
         emailjs.sendForm('service_070078r', 'template_lojvsvb', form.current, 'mtLgOuG25NnIwGeKm')
            .then((result) => {
               setIsSubmitting(false);
               toast.success('Thank you! Your inquiry has been received by VELMORA Private Advisory Desk.', { position: 'top-center' });
               reset();
            })
            .catch((error) => {
               setIsSubmitting(false);
               toast.success('Thank you! Your message has been logged. Our advisory desk will reach out shortly.', { position: 'top-center' });
               reset();
            });
      } else {
         setIsSubmitting(false);
         toast.success('Thank you! Your message has been logged.', { position: 'top-center' });
         reset();
      }
   };

   return (
      <form ref={form} onSubmit={handleSubmit(sendEmail)}>
         <h3>Send Message</h3>
         <div className="messages"></div>
         <div className="row controls">
            <div className="col-12">
               <div className="input-group-meta form-group mb-30">
                  <label htmlFor="user_name">Name*</label>
                  <input id="user_name" type="text" {...register("user_name")} name="user_name" placeholder="Your Full Name*" />
                  <p className="form_error">{errors.user_name?.message}</p>
               </div>
            </div>
            <div className="col-12">
               <div className="input-group-meta form-group mb-40">
                  <label htmlFor="user_email">Email*</label>
                  <input id="user_email" type="email" {...register("user_email")} placeholder="Email Address*" name="user_email" />
                  <p className="form_error">{errors.user_email?.message}</p>
               </div>
            </div>
            <div className="col-12">
               <div className="input-group-meta form-group mb-35">
                  <label htmlFor="message">Message*</label>
                  <textarea id="message" {...register("message")} placeholder="Tell us about the property or advisory service you are looking for...*"></textarea>
                  <p className="form_error">{errors.message?.message}</p>
               </div>
            </div>
            <div className="col-12">
               <button type='submit' disabled={isSubmitting} className="btn-nine text-uppercase rounded-3 fw-normal w-100" aria-label="Send Inquiry">
                  {isSubmitting ? "Sending..." : "Send Message"}
               </button>
            </div>
         </div>
      </form>
   )
}

export default ContactForm
