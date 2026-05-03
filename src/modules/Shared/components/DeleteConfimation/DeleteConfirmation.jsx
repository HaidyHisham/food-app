import React from 'react'
import Modal from 'react-bootstrap/Modal';
import noData from '../../../../assets/noData.svg';

export default function DeleteConfirmation({ show, onClose, onConfirm }) {
  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Body className='text-center px-4 pt-4 pb-2 position-relative'>

       
        <button
          onClick={onClose}
          className='btn position-absolute d-flex align-items-center justify-content-center delete-modal-close-btn'
          aria-label="Close"
        >
          <i className="fa-solid fa-xmark"></i>
        </button>

        <img
          className='img-fluid mb-3 delete-modal-img'
          src={noData}
          alt="Delete"
        />
        <h5 className='fw-bold mb-2'>Delete This Category ?</h5>
        <p className='text-muted delete-modal-desc'>
          are you sure you want to delete this item ? if you are sure just click on delete it
        </p>
      </Modal.Body>

      <Modal.Footer className='delete-modal-footer justify-content-end pt-3 pb-3 px-4'>
        <button
          className='btn px-3 py-2 delete-modal-btn'
          onClick={onConfirm}
        >
          Delete this item
        </button>
      </Modal.Footer>
    </Modal>
  )
}
