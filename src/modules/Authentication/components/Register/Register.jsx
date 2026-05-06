import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { registerApi } from '../../../../api/modules/auth';


export default function Register() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const navigate = useNavigate();
  let{register,formState: {errors}, handleSubmit,watch, trigger}= useForm();
  const onSubmit= async(data)=>{
    try {
      const formData = new FormData();
      formData.append('userName', data.userName);
      formData.append('email', data.email);
      formData.append('country', data.country);
      formData.append('phoneNumber', data.phoneNumber);
      formData.append('password', data.password);
      formData.append('confirmPassword', data.confirmPassword);
      
      let response = await registerApi(formData);
      console.log(response);
      toast.success(response.data?.message || 'Account registered successfully');
      navigate("/verify-account");
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || 'Registration failed');
    }
  }
  useEffect(()=>{
    if(watch('confirmPassword')) {
      trigger('confirmPassword')
    }
  
  },[watch('password')])

  return (
    <div className=''>
      <div className='title mb-4'>
        <h3 className='auth-title'>Register</h3>
        <span className='auth-sub-title'>Welcome Back! Please enter your details</span>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row gx-md-5 gy-3">
          <div className='col-12 col-md-6'>
            <div className='auth-input-group'>
              <span className='input-icon'><i className="fa-solid fa-mobile-screen-button"></i></span>
              <div className="input-divider"></div>
              <input {...register('userName' ,{
                required:"User name is required",
                pattern: {
                  value: /^[a-zA-Z0-9]+$/,
                  message: "User name can only contain letters and numbers"
                }
              })} type="text" className="form-control" id="userName" placeholder="UserName" aria-describedby="userNameHelpBlock"></input>
            </div>
            {errors.userName && <span className='text-danger'>{errors.userName.message}</span>}
          </div>
          <div className='col-12 col-md-6 '>
            <div className='auth-input-group'>
              <span className='input-icon'><i className="fa fa-mobile-screen-button"></i></span>
              <div className="input-divider"></div>
              <input {...register('email' ,{
                required:"Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Invalid email address"
                }
              })} type="email" className="form-control" id="exampleInputEmail1" placeholder="Enter your E-mail" aria-describedby="emailHelpBlock"></input>
            </div>
            {errors.email && <span className='text-danger'>{errors.email.message}</span>}
          </div>
          <div className="col-12 col-md-6">
            <div className='auth-input-group'>
              <span className='input-icon'><i className="fa-solid fa-lock "></i></span>
              <div className="input-divider"></div>
              <input {...register('country' ,{
                required:"Country is required",
              })} type="text" className="form-control" id="country" placeholder="Country" aria-describedby="passwordHelpBlock"></input>
            </div>
            {errors.country && <span className='text-danger'>{errors.country.message}</span>}
          </div>
          <div className="col-12 col-md-6">
            <div className='auth-input-group'>
              <span className='input-icon'><i className="fa-solid fa-mobile-screen-button"></i></span>
              <div className="input-divider"></div>
              <input {...register('phoneNumber' ,{
                required:"Phone number is required",
                pattern: {
                  value: /^01[0-9]{9}$/,
                  message: "Valid Egyptian phone number is required (e.g. 010...)"
                }
              })} type="text" className="form-control" id="phoneNumber" placeholder="PhoneNumber" aria-describedby="passwordHelpBlock"></input>
            </div>
            {errors.phoneNumber && <span className='text-danger'>{errors.phoneNumber.message}</span>}
          </div>
          <div className="col-12 col-md-6">
            <div className='auth-input-group'>
              <span className='input-icon'><i className="fa-solid fa-lock "></i></span>
              <div className="input-divider"></div>
              <input {...register('password' ,{
                required:"Password is required",
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/,
                  message: "Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character"
                }
              })} type={isPasswordVisible ? "text" : "password"} className="form-control" id="exampleInputPassword1" placeholder="Password" aria-describedby="passwordHelpBlock"></input>
              <button type="button" className="btn bg-transparent border-0 p-0 text-muted" onClick={() => setIsPasswordVisible(prev => !prev)}>
                <i className={`fa-solid ${isPasswordVisible ? "fa-eye-slash" : "fa-eye"}`}></i>
              </button>
            </div>
            {errors.password && <span className='text-danger'>{errors.password.message}</span>}
          </div>
          <div className="col-12 col-md-6">
            <div className='auth-input-group'>
              <span className='input-icon'><i className="fa-solid fa-mobile-screen-button"></i></span>
              <div className="input-divider"></div>
              <input {...register('confirmPassword' ,{
                required:"Confirm password is required",
                validate: (value) => value === watch('password') || "Passwords do not match",
              })} type={isConfirmPasswordVisible ? "text" : "password"} className="form-control" id="confirmPassword" placeholder="confirm-password" aria-describedby="passwordHelpBlock"></input>
              <button type="button" className="btn bg-transparent border-0 p-0 text-muted" onClick={() => setIsConfirmPasswordVisible(prev => !prev)}>
                <i className={`fa-solid ${isConfirmPasswordVisible ? "fa-eye-slash" : "fa-eye"}`}></i>
              </button>
            </div>
            {errors.confirmPassword && <span className='text-danger'>{errors.confirmPassword.message}</span>}
          </div>
        </div>
        <div className="links d-flex justify-content-end my-2">
          <Link to='/login' className='text-decoration-none text-success'>
            Login Now?
          </Link>
        </div>
        <div className="row justify-content-center mt-3">
          <div className="col-12 col-md-9">
            <button type='submit' className='btn auth-btn w-100 text-white fw-bold'>Register</button>
          </div>
        </div>
      </form>

    </div>


  )
}
