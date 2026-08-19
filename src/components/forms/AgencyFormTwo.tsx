"use client"
import { toast } from 'react-toastify';

import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';

interface FormData {
   email: string;
   phone: string;
   message: string;
}

const schema = yup
   .object({
      phone: yup.string().required('Phone number is required'),
      email: yup.string().required().email().label("Email"),
      message: yup.string().required().label("Message"),
   })
   .required();

const AgencyFormTwo = () => {

   const { register, handleSubmit, reset, formState: { errors }, } = useForm<FormData>({ resolver: yupResolver(schema), });
   const onSubmit = (data: FormData) => {
      toast.success('Thank you! Your inquiry has been sent to our private advisory team.', { position: 'top-center' });
      reset();
   };

   return (
      <form onSubmit={handleSubmit(onSubmit)}>
         <div className="input-box-three mb-25">
            <div className="label">Your Email*</div>
            <input type="email" {...register("email")} placeholder="advisory@velmora.in" className="type-input rounded-0" />
            <p className="form_error">{errors.email?.message}</p>
         </div>
         <div className="input-box-three mb-25">
            <div className="label">Your Phone*</div>
            <input type="tel" {...register("phone")} placeholder="+91 98200 12345" className="type-input rounded-0" />
            <p className="form_error">{errors.phone?.message}</p>
         </div>
         <div className="input-box-three mb-15">
            <div className="label">Message*</div>
            <textarea {...register("message")} placeholder="Hello, I am interested in [The Meridian Residences, Worli]" className="rounded-0"></textarea>
            <p className="form_error">{errors.message?.message}</p>
         </div>
         <button type='submit' className="btn-nine text-uppercase w-100 mb-20" aria-label="Send Inquiry">Send Inquiry</button>
      </form>
   )
}

export default AgencyFormTwo
