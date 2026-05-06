import React, { useEffect } from 'react'
import Modal from 'react-bootstrap/Modal';
import { useForm } from 'react-hook-form';


export default function CategoryData({ show, onClose, onSubmit, title = "Add Category", categoryData = null }) {

  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();

  /**
   * Every time the modal opens ('show') or the data changes, 
   * we decide whether to pre-fill the form (Edit) or clear it (Add).
   */

  useEffect(() => {
    if (show) {
      if (categoryData) {
        setValue('name', categoryData.name);
      }
    }
    return () => reset();
  }, [show, categoryData]);

  return (
    <Modal show={show} onHide={onClose} centered>
       <form onSubmit={handleSubmit(onSubmit)}>
      <Modal.Body className='px-4 pt-4 pb-3 position-relative'>
        <h5 className='fw-bold mb-4'>{title}</h5>
        <button
          type="button"
          onClick={onClose}
          className='btn position-absolute d-flex align-items-center justify-content-center delete-modal-close-btn'
          aria-label="Close"
        >
          <i className="fa-solid fa-xmark"></i>
        </button>

       
          <div className='auth-input-group'>
            <input
              {...register('name', { required: 'Category name is required' })}
              type="text"
              className="form-control bg-transparent border-0"
              placeholder="Category Name"
            />
          </div>
          {errors.name && <span className='text-danger small mt-1 d-block'>{errors.name.message}</span>}
        
      </Modal.Body>
      
      <Modal.Footer className='delete-modal-footer justify-content-end pt-3 pb-3 px-4'>
        <button
          type="submit"
          // form="category-form"
          className='btn btn-success px-4 py-2 fw-bold'
        >
          Save
        </button>
      </Modal.Footer>
      </form>
    </Modal>
  )
}
