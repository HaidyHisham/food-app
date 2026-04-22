import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function Sidebar() {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  }
  return (

    <div className='text-center'>

      <button className='btn btn-danger' onClick={logout}>Logout</button>
    </div>
  )
}
