import React from 'react'

export default function Search() {
  return (
        <div className="d-flex align-items-center bg-white rounded-3 px-3 search-nav">
              <i className="fa-solid fa-magnifying-glass text-muted"></i>
              <input type="text" className="form-control border-0 shadow-none bg-transparent" placeholder="Search Here" />
            </div>
  )
}
