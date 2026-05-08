import React from 'react'
import { Pagination } from 'react-bootstrap'

export default function CustomPagination({ 
  totalNumberOfPages, 
  currentPage, 
  onPageChange 
}) {
  if (totalNumberOfPages <= 1) return null;

  let items = [];
  for (let number = 1; number <= totalNumberOfPages; number++) {
    items.push(
      <Pagination.Item 
        key={number} 
        active={number === currentPage}
        onClick={() => onPageChange(number)}
      >
        {number}
      </Pagination.Item>,
    );
  }

  return (
    <div className="d-flex justify-content-center mt-4">
      <Pagination className="custom-pagination">
        <Pagination.Prev 
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        />
        {items}
        <Pagination.Next 
          disabled={currentPage === totalNumberOfPages}
          onClick={() => onPageChange(currentPage + 1)}
        />
      </Pagination>
    </div>
  )
}
