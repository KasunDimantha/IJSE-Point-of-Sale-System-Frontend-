import React from 'react'
import { Link } from 'react-router-dom'

function HomeBill() {
  return (
    <div className='homeContainer'>
      <div className='flex justify-center items-center'>
        <div className='container02 rounded-tl-3xl rounded-br-3xl mr-8 ml-8 p-10 hover:p-12 hover:mr-6 hover:ml-6 ease-in-out duration-300'>
          <h1 className='mb-3 text-white text-3xl font-bold'>
            <Link to='/users'>User</Link>
          </h1>
        </div>
        <div className='container02 rounded-tl-3xl rounded-br-3xl mr-8 ml-8 p-10 hover:p-12 hover:mr-6 hover:ml-6 ease-in-out duration-300'>
          <h1 className='mb-3 text-white text-3xl font-bold'>
            <Link to='/product'>Product</Link>
          </h1>
        </div>
        <div className='container02 rounded-tl-3xl rounded-br-3xl mr-8 ml-8 p-10 hover:p-12 hover:mr-6 hover:ml-6 ease-in-out duration-300'>
          <h1 className='mb-3 text-white text-3xl font-bold'>
            <Link to='/orders'>Orders</Link>
          </h1>
        </div>
      </div>
    </div>
  )
}

export default HomeBill
