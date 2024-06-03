import React, { useEffect } from 'react'
import { useAuth } from '../../utils/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/download.png'

function Header() {

    const {isAuthenticated, logout} = useAuth();
    const navigate = useNavigate();
  
    useEffect(() => {
      console.log(isAuthenticated)
    })
  
    const logoutbtn = () => {
      logout
      localStorage.removeItem('token');
      navigate('/');
  
    }
  return (
    <div>
      <div className='flex justify-between items-center h-12 pr-12 pl-12 bg-[#0b2f00]'>
        <div>
            <Link to='/home'>
                <img src={logo} />
            </Link>
        </div>
        <div>
          {isAuthenticated && 
            <button className='text-white text-lg font-bold'
                    onClick={logoutbtn}>
              Logout
            </button>
          }
        </div>
      </div>
    </div>
  )
}

export default Header
