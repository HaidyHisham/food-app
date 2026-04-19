import React from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
export default function ResetPass() {
  let navigate = useNavigate();
  let {register, formState: {errors}, handleSubmit,watch,trigger}= useForm();

  const onSubmit= async(data)=>{
    try {
      const response = await axios.post("https://upskilling-egypt.com:3006/api/v1/Users/Reset", data);
      navigate('/login');
       toast.success("Password reset successful");
    } catch (error) {
      toast.error(error?.response?.data.message || "Something went wrong");
    }
  }
   useEffect(()=>{
    if(watch('confirmPassword')) {
      trigger('confirmPassword')

    }
  },[watch('password')])

  return (
     <div>
      <div className='title my-3'>
        <h3 className='auth-title'>Reset Password</h3>
        <span className='auth-sub-title'>Please Enter Your Otp  or Check Your Inbox </span>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='auth-input-group mb-1 mt-4'>
          <span className='input-icon '><i className="fa-solid fa-envelope"></i></span>
          <div className="input-divider"></div>
          <input {...register('email',{required:"Email is required", pattern:{
            value:/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
            message:"Please enter a valid email address"
          }})} type="email" className="form-control" placeholder="Email" aria-describedby="emailHelpBlock"></input>
        </div>
        {errors.email && <span className='text-danger'>{errors.email.message}</span>}
        <div className='auth-input-group mb-2'>
          <span className='input-icon '><i className="fa-solid fa-lock"></i></span>
          <div className="input-divider"></div>
          <input {...register('seed',{required:"otp is required"})} type="text" className="form-control" placeholder="OTP" aria-describedby="emailHelpBlock"></input>
        </div>
        {errors.seed && <span className='text-danger'>{errors.seed.message}</span>}
        <div className='auth-input-group mb-2'>
          <span className='input-icon '><i className="fa-solid fa-lock"></i></span>
          <div className="input-divider"></div>
          <input {...register('password',{required:"Password is required", pattern:{
            value:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/,
            message:"Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character"
          }})} type="password" className="form-control" placeholder="New Password" aria-describedby="emailHelpBlock"></input>
        </div>
        {errors.password && <span className='text-danger'>{errors.password.message}</span>}
        <div className='auth-input-group mb-2'>
          <span className='input-icon '><i className="fa-solid fa-lock"></i></span>
          <div className="input-divider"></div>
          <input {...register('confirmPassword',{required:"Password is required",
          validate:(value)=>{
            return value === watch('password') || "Passwords do not match";
          }
        })} type="password" className="form-control" placeholder="Confirm New Password" aria-describedby="emailHelpBlock"></input>
        </div>
        {errors.confirmPassword && <span className='text-danger'>{errors.confirmPassword.message}</span>}
      
        <button className='btn login-btn w-100 my-4 text-white fw-bold '>Reset Password</button>
      </form>
     </div>
   
  )
}
