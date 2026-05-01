import React from 'react'
import Header from '../../../Shared/components/Header/Header'
import headerCategories from '../../../../assets/headerCategories.svg'
export default function CategoriesList() {
  return (
    <>
      <Header title="Categories" titleSpan="item" description="You can now add your items that any user can order it from the Application and you can edit" imgUrl={headerCategories} />
    </>

  )
}
