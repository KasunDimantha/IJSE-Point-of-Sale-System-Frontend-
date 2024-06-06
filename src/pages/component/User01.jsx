import React, { useEffect, useState } from 'react'
import { useAuth } from '../../utils/AuthContext'
import axios from 'axios'
import '../../App.css'

function User01() {


    const [users, setUsers] = useState([])
    const [query, setQuery] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [edit, setEdit] = useState(false)
    const [id, setId] = useState('')
    let count = 1

    const { isAuthenticated, jwtToken } = useAuth();

    const config = {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      };


    useEffect(() => {
        if(isAuthenticated) {
            getUser();
        }
    }, [isAuthenticated])


    const getUser = () => {
        axios
          .get("http://localhost:8080/users", config)
          .then((response) => {
            setUsers(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      };

      const submitUser = (e) => {
        e.preventDefault();
    
        const userData = {
          username,
          email,
          password,
        };
    
    
        axios.post("http://localhost:8080/users", userData, config)
          .then((response) => {
            console.log(response.data);
            alert("User created Successfully");
            getUser();
            setUsername("");
            setEmail("");
            setPassword("");
          })
          .catch((error) => {
            console.log(error);
          });
      };


      const updateUser = (e) => {
        e.preventDefault();
    
        const userData = {
          username,
          email,
          password,
        };
    
        axios
          .put(`http://localhost:8080/users/${id}`, userData, config)
          .then((response) => {
            alert("User updated");
            getUser();
            setEdit(false);
            setUsername("");
            setEmail("");
            setPassword("");
        })
        .catch((error) => {
            console.log(error);
        })
      }


  return (
    <div>
      <div>
        <div className='flex h-screen bg-slate-300'>
            <div className='w-1/3'>

                {!edit && (
                    <div className='bg-gray-100 m-3 pt-3 pb-3 rounded-md'>
                    <form onSubmit={submitUser}>
                        <div className='flex flex-col gap-2 m-2 ml-3 mr-3'>
                            <div>
                                <div>
                                    <label className=' font-bold'>UserName</label>
                                </div>
                                <div>
                                    <input  className='bg-gray-300 items-center hover:bg-gray-400 py-1 px-2 rounded focus:outline-none'
                                            type="text" 
                                            placeholder="Username"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                            />
                                </div>
                            </div>
                            <div>
                                <div>
                                    <label className=' font-bold'>Email</label>
                                </div>
                                <div>
                                    <input  className='bg-gray-300 items-center hover:bg-gray-400 py-1 px-2 rounded focus:outline-none'
                                            type="email" 
                                            placeholder="Email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            />
                                </div>
                            </div>
                            <div>
                                <div>
                                    <label className=' font-bold'>Password</label>
                                </div>
                                <div>
                                    <input  className='bg-gray-300 items-center hover:bg-gray-400 py-1 px-2 rounded focus:outline-none'
                                            type="password" 
                                            placeholder="Password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            />
                                </div>
                            </div>
                            
                            <div className='flex justify-center ml-3 mr-3 mt-5 bg-gray-500 items-center hover:bg-gray-700 text-white font-bold py-1 px-2 rounded'>
                                <button type='submit'>Add User</button>
                            </div>
                        </div>
                    </form>
                    </div>
                )}

                {edit && (
                    <div className='bg-gray-100 m-3 pt-3 pb-3 rounded-md'>
                    <form onSubmit={updateUser}>
                        <div className='flex flex-col gap-2 m-2 ml-3 mr-3'>
                            <div>
                                <div>
                                    <label className=' font-bold'>UserName</label>
                                </div>
                                <div>
                                    <input  className='bg-gray-300 items-center hover:bg-gray-400 py-1 px-2 rounded focus:outline-none'
                                            type="text" 
                                            placeholder="Username"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                            />
                                </div>
                            </div>
                            <div>
                                <div>
                                    <label className=' font-bold'>Email</label>
                                </div>
                                <div>
                                    <input  className='bg-gray-300 items-center hover:bg-gray-400 py-1 px-2 rounded focus:outline-none'
                                            type="email" 
                                            placeholder="Email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            />
                                </div>
                            </div>
                            
                            <div className='flex justify-center ml-3 mr-3 mt-5 bg-gray-500 items-center hover:bg-gray-700 text-white font-bold py-1 px-2 rounded'>
                                <button type='submit'>Update User</button>
                            </div>
                        </div>
                    </form>
                    </div>
                )}
                

            </div>
            <div  className='product flex-auto w-full bg-white m-3 pt-3 pb-3  rounded-md'>
                <div className='ml-3 mr-3'>
                    <div className='flex justify-center mb-2'>
                        <input type="text" 
                            placeholder='Search Product here....' 
                            className='bg-gray-200 items-center hover:bg-gray-300 py-1 px-2 rounded focus:outline-none'
                            onChange={(e) => setQuery(e.target.value)}  />
                    </div>
                    <table className='min-w-full bg-white border border-gray-500 '>
                        <thead>
                            <tr>
                                <th className='py-2 px-4 border-b border-gray-500'>No.</th>
                                <th className='py-2 px-4 border-b border-gray-500'>User Name</th>
                                <th className='py-2 px-4 border-b border-gray-500'>Email</th>
                                <th className='py-2 px-4 border-b border-gray-500'>Action</th>

                            </tr>
                        </thead>
                        <tbody>
                            {users && users.filter(user => user.username.toLowerCase().includes(query)).map((user) => (
                                <tr key={user.id}>
                                    <td className='py-2 px-4 border-b border-gray-500'>{count++}</td>
                                    <td className='py-2 px-4 border-b border-gray-500'>{user.username}</td>
                                    <td className='py-2 px-4 border-b border-gray-500'>{user.email}</td>
                                    <td className='py-2 px-4 border-b border-gray-500'><button type="button"
                                                                                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                                                                                                onClick={() => {
                                                                                                setEdit(true);
                                                                                                setId(user.id);
                                                                                                setUsername(user.username);
                                                                                                setEmail(user.email);
                                                                                                }}>Edit</button></td>
                                </tr>
                            )
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default User01
