import React, { useState } from 'react'
import { useAuth } from '../../utils/AuthContext';
import axios from 'axios';

function User() {

    const { isAuthenticated, jwtToken } = useAuth();

    const config = {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      };

    const [category, setCategory] = useState('');

    const submitCategory = (e) => {
        e.preventDefault();

        const data = {
            name : category
        }
        
        axios
          .post('http://localhost:8080/category', data, config)
          .then((res) => {
              console.log(res.data);
              alert('Category added successfully');
              setCategory('');
          })
          .catch((err) => {
              console.log(err);
          })
    }

  return (
    <div>
      <div className='flex h-screen bg-slate-300'>
        <div className='flex-none w-64'>

            <div className='bg-gray-100 m-3 pt-3 pb-3 rounded-md'>
                <form onSubmit={submitCategory}>
                    <div className='flex flex-col gap-2 m-2 ml-3 mr-3'>
                        <div>
                            <label className=' font-bold'>Category</label>
                        </div>
                        <div>
                            <input  className='bg-gray-300 items-center hover:bg-gray-400 py-1 px-2 rounded focus:outline-none'
                                    type="text" 
                                    placeholder="Category"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                     />
                        </div>
                        <div className='flex justify-center ml-3 mr-3 mt-5 bg-gray-500 items-center hover:bg-gray-700 text-white font-bold py-1 px-2 rounded'>
                            <button type='submit'>Add Category</button>
                        </div>
                    </div>
                </form>
            </div>
            
            <div>
                products
            </div>
        </div>
        <div className='flex-auto w-full bg-white'>
            all product
        </div>
      </div>
    </div>
  )
}

export default User
