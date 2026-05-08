import React from 'react'

export default function Loading() {
  return (
    <div className="d-flex justify-content-center align-items-center py-5 w-100 h-100">
      <div className="spinner-border text-success" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  )
}
