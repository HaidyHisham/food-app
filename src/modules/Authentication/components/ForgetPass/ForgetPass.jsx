import React from 'react'
import axios from 'axios';
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function ForgetPass() {
  let navigate = useNavigate();
  let { register, formState: { errors }, handleSubmit } = useForm();
  const onSubmit = async (data) => {
    try {
      const response = await axios.post("https://upskilling-egypt.com:3006/api/v1/Users/Reset/Request", data);
      toast.success('Email sent successfully');
      navigate('/reset-password');
    } catch (error) {
      toast.error(error?.response?.data.message || "Something went wrong");
    }
  }
  return (
    <div>
      <div className='title my-3'>
        <h3 className='auth-title'>Forgot Your Password?</h3>
        <span className='auth-sub-title'>No worries! Please enter your email and we will send a password reset link </span>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='auth-input-group mb-2'>
          <span className='input-icon '><i className="fa-solid fa-mobile-screen-button"></i></span>
          <div className="input-divider"></div>
          <input {...register('email', {
            required: "Email is required",
            pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
          })}
            type="email" className="form-control" placeholder="Enter your E-mail" aria-describedby="emailHelpBlock"></input>
        </div>
        {errors.email && <span className='text-danger'>{errors.email.message}</span>}
 <button className='btn login-btn w-100 my-4 text-white fw-bold'>Submit</button>
      </form>
     

    </div>

  )
}
