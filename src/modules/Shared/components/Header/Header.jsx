import React from 'react'

export default function Header({ title, titleSpan, description, imgUrl }) {
  return (
    <div className='m-3 text-white header-bg d-flex align-items-center'>
      <div className="container-fluid px-5">
        <div className="row align-items-center w-100">
          <div className="col-12 col-md-8">
            <div>
              <h3>
                <span className="fw-bold">{title}</span> 
                {titleSpan && <span className='header-name'> {titleSpan}</span>}
              </h3>
              <p className='py-2 w-75 fw-light'>{description}</p>
            </div>
          </div>
          <div className="col-md-4 text-end d-none d-md-block">
            <img className='img-fluid' src={imgUrl} alt="header-img" />
          </div>
        </div>
      </div>
    </div>
  )
}
