import React from 'react'
import '../App.css'
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className='container'>
      <div className=' container01 flex justify-center items-center w-96 h-96 gap-10 rounded-tl-3xl rounded-br-3xl '>
        <div>
            <div className='mb-3 text-white text-3xl font-bold'>
                <h1>Wellcome to</h1>
            </div>
            <div className='mb-3 text-white text-3xl font-bold'>
                <h1>Supermarket,</h1>
            </div>
            <div className='mb-3 text-white text-2xl font-bold'>
                <h1>Login to your</h1>
            </div>
            <div className='mb-3 text-white text-2xl font-bold'>
                <h1>account</h1>
            </div>
        </div>
        <div>
          <Link to="/login">
            <button className='bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-2 rounded'>Login</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home
