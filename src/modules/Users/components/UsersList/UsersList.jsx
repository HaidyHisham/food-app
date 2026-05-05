import React from 'react'
import Header from '../../../Shared/components/Header/Header'
import headerCategories from '../../../../assets/headerCategories.svg'
export default function UsersList() {
  return (
    <>
    <Header 
    title="Users" 
    titleSpan="list" 
    description="You can now add your items that any user can order it from the Application and you can edit" 
    imgUrl={headerCategories} />

        <div className='px-4 mt-4 '>
          <h4 className='title-categories-list'>Users Table Details</h4>
          <span className='sub-title-categories-list'>You can check all details</span>
        </div>
        

    </>

  )
}
