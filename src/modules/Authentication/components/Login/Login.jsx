import axios from 'axios';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

export default function Login() {
  let navigate = useNavigate();
  let {register,formState: {errors}, handleSubmit} = useForm();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const onSubmit=async(data)=>{
    try{
      const response = await axios.post("https://upskilling-egypt.com:3006/api/v1/Users/Login",data);
      console.log("Full login response:", response.data);
      const token = response.data.token;
      if (!token) {
        toast.error("Login failed: no token received. Check console for response structure.");
        return;
      }
      localStorage.setItem("token", token);
      toast.success('Welcome back!');
      navigate('/dashboard');
    }catch(error){
      toast.error(error?.response?.data.message || "Something went wrong");
    }
  }

  return (
    <div>
   <div className='title my-4'>
     <h3 className='auth-title '>Log In</h3>
     <span className='auth-sub-title'>Welcome Back! Please enter your details</span>
   </div>
    <form onSubmit={handleSubmit(onSubmit)}>
    <div className='auth-input-group mb-2'>
      <span className='input-icon'><i className="fa-solid fa-mobile-screen-button"></i></span>
      <div className="input-divider"></div>
  <input {...register('email',{
    required:"Email is required",
    pattern:/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
  
  })} 
  type="email" className="form-control" placeholder="Enter your E-mail" aria-describedby="emailHelpBlock"></input>
    </div>
    {errors.email && <span className='text-danger'>{errors.email.message}</span>}
    <div className='auth-input-group mb-2'>
      <span className='input-icon'><i className="fa-solid fa-lock "></i></span>
      <div className="input-divider"></div>
  <input {...register('password', {required:"Password is required",
    pattern:{
      value:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/,
      message:"Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character"
    }
  })} type={isPasswordVisible ? "text" : "password"} className="form-control" placeholder="Password" aria-describedby="passwordHelpBlock"></input>
      <button type="button" className="btn bg-transparent border-0 p-0 text-muted" onClick={() => setIsPasswordVisible(prev => !prev)}>
        <i className={`fa-solid ${isPasswordVisible ? "fa-eye-slash" : "fa-eye"}`}></i>
      </button>
    </div>
    {errors.password && <span className='text-danger'>{errors.password.message}</span>}
    <div className="links d-flex justify-content-between my-2">
      <Link to='/register' className='text-muted text-decoration-none'>
      Register Now?
     </Link>
      <Link to='/forgot-password' className='text-decoration-none text-success'>
      Forgot Password?
     </Link>
    </div>
    <button type='submit' className='btn auth-btn w-100 my-4 text-white fw-bold '>Login</button>
   </form>

   </div>

   
  )
}
