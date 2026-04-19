import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import logo from '../../../../assets/logo.svg'
export default function AuthLayout() {

  const location = useLocation();
  const isRegister = location.pathname === "/register"

  return (
    <>
      <div className={`auth-container ${isRegister ? "bg-none" : ""}`}>
        <div className="container-fluid bg-overlay">
          <div className="row min-vh-100 justify-content-center align-items-center">
            <div className={`col-11 ${isRegister ? "col-md-8 col-lg-7" : "col-md-7 col-lg-5"} bg-white rounded-4 px-5 py-5`}>
              <div className="logo-container text-center">
                <img className={`${isRegister ? "auth-logo-size" : "w-50"}`} src={logo} alt="logo" />
              </div>
              <Outlet/>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
