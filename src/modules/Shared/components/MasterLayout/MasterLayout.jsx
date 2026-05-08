import React from 'react'
import Sidebar from '../Sidebar/Sidebar'
import Navbar from '../Navbar/Navbar'
import Header from '../Header/Header'
import { Outlet } from 'react-router-dom'

export default function MasterLayout() {
  return (
    <div className="d-flex mt-2">
      <div>
        <Sidebar />
      </div>
      <div className='flex-grow-1 overflow-hidden'>
        <Navbar />
        <Outlet />
      </div>
    </div>

  )
}

