import React, { useState, useEffect } from 'react'
import { Modal } from 'react-bootstrap'
import logo from '../../../../assets/logo.svg'
import { changePassword } from '../../../../api/modules/auth';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function ChangePasswordModal() {
  const navigate = useNavigate();
  let { register, formState: { errors }, handleSubmit, watch, trigger } = useForm();
  
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const onSubmit = async (data) => {
    try {
    
      await changePassword(data);
      toast.success("Password changed successfully");
    //   navigate('/dashboard');
    } catch (error) {
      console.log(error.response.data);
      toast.error(error?.response?.data.message || "Something went wrong");
    }
  }
  useEffect(() => {
    if (watch('confirmNewPassword')) {
      trigger('confirmNewPassword');
    }
  }, [watch('newPassword'), trigger, watch])

  return (
    <Modal show={true} onHide={() => navigate('/dashboard')} centered dialogClassName="change-pass-modal">
      <Modal.Body className='px-3 px-md-5 pb-4 pt-4'>
        <img src={logo} className="auth-logo-size my-2 mx-auto d-block" alt="logo" />

        <div className='title my-4'>
          <h3 className='change-pass-title'>Change Your Password</h3>
          <span className='auth-sub-title'>Enter your details below</span>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          
          <div className='auth-input-group mb-2 mt-4'>
            <span className='input-icon'><i className="fa-solid fa-lock"></i></span>
            <div className="input-divider"></div>
            <input 
              {...register('oldPassword', { required: "Old password is required" })} 
              type={showOld ? "text" : "password"} 
              className="form-control" 
              placeholder="Old Password" 
            />
            <button type="button" className="btn bg-transparent border-0 p-0 text-muted" onClick={() => setShowOld(prev => !prev)}>
              <i className={`fa-solid ${showOld ? "fa-eye-slash" : "fa-eye"}`}></i>
            </button>
          </div>
          {errors.oldPassword && <span className='text-danger d-block mb-2 small'>{errors.oldPassword.message}</span>}

          {/* New Password */}
          <div className='auth-input-group mb-2'>
            <span className='input-icon'><i className="fa-solid fa-lock"></i></span>
            <div className="input-divider"></div>
            <input 
              {...register('newPassword', {
                required: "New password is required", 
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/,
                  message: "Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character"
                }
              })} 
              type={showNew ? "text" : "password"} 
              className="form-control" 
              placeholder="New Password" 
            />
            <button type="button" className="btn bg-transparent border-0 p-0 text-muted" onClick={() => setShowNew(prev => !prev)}>
              <i className={`fa-solid ${showNew ? "fa-eye-slash" : "fa-eye"}`}></i>
            </button>
          </div>
          {errors.newPassword && <span className='text-danger d-block mb-2 small'>{errors.newPassword.message}</span>}

          
          <div className='auth-input-group mb-2'>
            <span className='input-icon'><i className="fa-solid fa-lock"></i></span>
            <div className="input-divider"></div>
            <input 
              {...register('confirmNewPassword', {
                required: "Confirm password is required",
                validate: (value) => value === watch('newPassword') || "Passwords do not match"
              })} 
              type={showConfirm ? "text" : "password"} 
              className="form-control" 
              placeholder="Confirm New Password" 
            />
            <button type="button" className="btn bg-transparent border-0 p-0 text-muted" onClick={() => setShowConfirm(prev => !prev)}>
              <i className={`fa-solid ${showConfirm ? "fa-eye-slash" : "fa-eye"}`}></i>
            </button>
          </div>
          {errors.confirmNewPassword && <span className='text-danger d-block mb-2 small'>{errors.confirmNewPassword.message}</span>}

          <button className='btn login-btn w-100 my-4 text-white fw-bold'>Change Password</button>
        </form>
      </Modal.Body>
    </Modal>
  )
}
