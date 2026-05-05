import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import logo from '../../../../assets/logo-sidebar.svg';

export default function SideBar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const toggleCollapsed = () => {
    setIsCollapsed(!isCollapsed);
  }
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  }
  return (
    <div className='sidebar-container'>
      <Sidebar collapsed={isCollapsed} >
        <div onClick={() => toggleCollapsed()} className="my-4">
          <img className='img-fluid' src={logo} alt="logo" />
        </div>
        <Menu>
          <MenuItem component={<Link to="/dashboard" />} icon={<i className='fa fa-home'></i>} > Home </MenuItem>
          <MenuItem component={<Link to="/users-list" />} icon={<i className='fa fa-users'></i>} > Users </MenuItem>
          <MenuItem component={<Link to="/recipes-list" />} icon={<i className='fa fa-utensils'></i>} > Recipes </MenuItem>
          <MenuItem component={<Link to="/categories-list" />} icon={<i className='fa fa-table-cells-large'></i>} > Categories </MenuItem>
          <MenuItem component={<Link to="/change-password" />} icon={<i className='fa fa-lock'></i>} > Change Password</MenuItem>
          <MenuItem component={<Link to="/login" />} onClick={logout} icon={<i className='fa fa-sign-out'></i>} > Logout </MenuItem>
        </Menu>
      </Sidebar>
    </div>

  )
}
