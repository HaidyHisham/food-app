import React, { useContext } from 'react'
import Header from '../../../Shared/components/Header/Header'
import HeaderDashImg from '../../../../assets/headerDash.svg'
import { AuthContext } from '../../../../context/AuthContext/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function Dashboard() {
  const { loginData } = useContext(AuthContext);
  let navigate = useNavigate();

  return (
    <>
      <Header title="Welcome" titleSpan={`${loginData?.userName} !`} description='This is a welcoming screen for the entry of the application , you can now see the options' imgUrl={HeaderDashImg} />
      <div className='container '>
        <div className='card p-4 rounded-4 mt-2 dashboard-card '>
          <div className='px-4 card-body d-flex justify-content-between align-items-center '>
            <div>
              <h5 className='card-title fw-semibold'>Fill the <span className='fw-semibold'>Recipes</span> !</h5>
              <p className='card-text w-75 '>you can now fill the meals easily using the table and form , click here and sill it with the table !</p>
            </div>
            <button onClick={()=>{navigate('/recipes-list')}} className='btn btn-success px-4 py-2 fw-semibold '>Fill Recipes<i className='fa fa-arrow-right ms-2'></i></button>
          </div>
        </div>
      </div>
    </>
  )
}
