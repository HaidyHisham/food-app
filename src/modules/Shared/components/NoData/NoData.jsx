import React from 'react'
import noData from '../../../../assets/NoData.svg'
export default function NoData() {
  return (
  <div className=' d-flex justify-content-center align-items-center flex-column py-5 text-center'>
      <img src={noData} alt="no-data" />
      <h2 className='mt-4 fw-bold nodata'>No Data !</h2>
      <p className='nodata-p'>No data available at the moment. Please check back later or add new items.</p>
    </div>  )
}
