import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';
import { verify } from '../../../../api/modules/auth';
import { toast } from 'react-toastify';

export default function VerifyAccount() {
  const navigate = useNavigate();
  let {register, formState: {errors}, handleSubmit}= useForm();

  const onSubmit= async(data)=>{
    try {
      let response = await verify(data);
      console.log(response);
      toast.success(response.data?.message || 'Account verified successfully');
      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || 'Verification failed');
    }
  }
  return (
    <div>
      <div className='title mb-4'>
        <h3 className='auth-title'>Verify Account</h3>
        <span className='auth-sub-title'>Please Enter Your Otp  or Check Your Inbox</span>
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
          <input {...register('code',{required:"otp is required"})} type="text" className="form-control" placeholder="OTP" aria-describedby="emailHelpBlock"></input>
        </div>
        {errors.code && <span className='text-danger'>{errors.code.message}</span>}
        <div className="row justify-content-center mt-3">
          <div className="col-12 col-md-9">
            <button type='submit' className='btn auth-btn w-100 text-white fw-bold '>send</button>
          </div>
        </div>
        
        </form>
    </div>
  )
}
