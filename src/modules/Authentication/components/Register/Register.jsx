import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Register() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

  return (
    <div className=''>
      <div className='title mb-4'>
        <h3 className='auth-title'>Register</h3>
        <span className='auth-sub-title'>Welcome Back! Please enter your details</span>
      </div>
      <form>
        <div className="row gx-md-5 gy-3">
          <div className='col-12 col-md-6'>
            <div className='auth-input-group'>
              <span className='input-icon'><i className="fa-solid fa-mobile-screen-button"></i></span>
              <div className="input-divider"></div>
              <input type="text" className="form-control" id="userName" placeholder="UserName" aria-describedby="userNameHelpBlock"></input>
            </div>
          </div>
          <div className='col-12 col-md-6 '>
            <div className='auth-input-group'>
              <span className='input-icon'><i className="fa fa-mobile-screen-button"></i></span>
              <div className="input-divider"></div>
              <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Enter your E-mail" aria-describedby="emailHelpBlock"></input>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className='auth-input-group'>
              <span className='input-icon'><i className="fa-solid fa-lock "></i></span>
              <div className="input-divider"></div>
              <input type="text" className="form-control" id="country" placeholder="Country" aria-describedby="passwordHelpBlock"></input>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className='auth-input-group'>
              <span className='input-icon'><i className="fa-solid fa-mobile-screen-button"></i></span>
              <div className="input-divider"></div>
              <input type="text" className="form-control" id="phoneNumber" placeholder="PhoneNumber" aria-describedby="passwordHelpBlock"></input>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className='auth-input-group'>
              <span className='input-icon'><i className="fa-solid fa-lock "></i></span>
              <div className="input-divider"></div>
              <input type={isPasswordVisible ? "text" : "password"} className="form-control" id="exampleInputPassword1" placeholder="Password" aria-describedby="passwordHelpBlock"></input>
              <button type="button" className="btn bg-transparent border-0 p-0 text-muted" onClick={() => setIsPasswordVisible(prev => !prev)}>
                <i className={`fa-solid ${isPasswordVisible ? "fa-eye-slash" : "fa-eye"}`}></i>
              </button>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className='auth-input-group'>
              <span className='input-icon'><i className="fa-solid fa-mobile-screen-button"></i></span>
              <div className="input-divider"></div>
              <input type={isConfirmPasswordVisible ? "text" : "password"} className="form-control" id="confirmPassword" placeholder="confirm-password" aria-describedby="passwordHelpBlock"></input>
              <button type="button" className="btn bg-transparent border-0 p-0 text-muted" onClick={() => setIsConfirmPasswordVisible(prev => !prev)}>
                <i className={`fa-solid ${isConfirmPasswordVisible ? "fa-eye-slash" : "fa-eye"}`}></i>
              </button>
            </div>
          </div>
        </div>
        <div className="links d-flex justify-content-end my-2">
          <Link to='/login' className='text-decoration-none text-success'>
            Login Now?
          </Link>
        </div>
        <div className="row justify-content-center mt-3">
          <div className="col-12 col-md-9">
            <button className='btn login-btn w-100 text-white fw-bold'>Register</button>
          </div>
        </div>
      </form>

    </div>


  )
}
