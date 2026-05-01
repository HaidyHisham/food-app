import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../../../../context/AuthContext/AuthContext'
import avatar from '../../../../assets/avatar.svg'
export default function Navbar() {
  const { loginData,setLoginData } = useContext(AuthContext);

  useEffect(() => {
    if (localStorage.getItem('LoginData')) {
      setLoginData((localStorage.getItem('LoginData')));
    }
  }, []);
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-light rounded-4 m-3 py-2 px-3">
        <div className="container-fluid">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">


            <div className="d-flex align-items-center bg-white rounded-3 px-3 search-nav">
              <i className="fa-solid fa-magnifying-glass text-muted"></i>
              <input type="text" className="form-control border-0 shadow-none bg-transparent" placeholder="Search Here" />
            </div>


            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 d-flex align-items-center gap-4 mt-3 mt-lg-0">
              <li className="nav-item d-flex align-items-center gap-2">
                <img className="profile-image rounded-circle" src={avatar} alt="profile-image" style={{ width: '40px', height: '40px', objectFit: 'cover' }} />
                <span className="notify-name">{loginData?.userName}</span>
                <i className="fa-solid fa-chevron-down notify-icon ms-4" ></i>
              </li>
              <li className="nav-item">
                <div className="position-relative">
                  <i className="fa-solid fa-bell fs-5 text-dark ms-4"></i>
                  <span className="position-absolute circle-notification rounded-circle">
                  </span>
                </div>
              </li>
            </ul>

          </div>
        </div>
      </nav>
    </>
  )
}