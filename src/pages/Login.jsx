import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../utils/AuthContext'
import axios from 'axios'

function Login() {

    const { login } = useAuth();
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();

        const data = {
            username: username,
            password: password
        }

        axios.post('http://localhost:8080/auth/login', data)
            .then(res => { 
                login(res.data);
                navigate('/home');
            })
            .catch(err => console.log(err))
    }


  return (
    <div className='bg-gradient-to-r from-green-400 to-green-800 container01 flex justify-center items-center h-lvh'>
      <div className=' container01 flex flex-col justify-center items-center w-96 h-96 gap-10 rounded-tl-3xl rounded-br-3xl '>
        <h1 className='text-white text-4xl font-bold'>Login</h1>
        <div>
            <form onSubmit={handleLogin}>
                <div>
                    <label htmlFor="username" className="block text-lg font-medium text-white">Username</label>
                    <input className='bg-gray-300 p-2 rounded-md focus:outline-none' 
                           type="text" 
                           placeholder='Username'
                           onChange={(e) => {
                            setUsername(e.target.value);
                            }} />
                </div>
                <div>
                    <label htmlFor="password" className="block text-lg font-medium text-white">Password</label>
                    <input className='bg-gray-300 p-2 rounded-md focus:outline-none' 
                           type="password" 
                           placeholder='Password'
                           onChange={(e) => {
                            setPassword(e.target.value)
                           }} />
                </div>
                <div>
                    <button type='submit' className='bg-green-500 p-2 rounded-md text-white mt-5 pl-8 pr-8'>Login</button>
                </div>
            </form>
            
        </div>
      </div>
    </div>
  )
}

export default Login
