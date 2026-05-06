
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
     <div className='notFound p-5 d-flex justify-content-center align-items-start flex-column'>
   <h2 className='fw-bold'>Oops.... </h2>
   <h3 className='notFound-text'>Page  not found </h3>
   <p>This Page doesn’t exist or was removed!
We suggest you  back to home.</p>
<Link to={'/dashboard'} className='btn btn-success '><i className="fa-solid fa-arrow-left mx-2"></i> Back To Home</Link>
    </div>
   
   
  )
}