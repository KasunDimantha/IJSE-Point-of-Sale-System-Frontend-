import React, { useEffect, useState } from 'react'
import { useAuth } from '../../utils/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Order() {

    const [orders, setOrders] = useState([])
    const [query, setQuery] = useState("")
    let count = 1;


    const navigate = useNavigate();

    const { isAuthenticated, jwtToken } = useAuth();

    const config = {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      };

    useEffect(() => {
        if(isAuthenticated){
            getOrders();
        }
    }, [isAuthenticated])

    const getOrders = () => {
        
        axios.get('http://localhost:8080/orders', config)
        .then((res) => {
            setOrders(res.data)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    

    const createOrder = () => {
        axios.post('http://localhost:8080/orders', "" ,config)
        .then((res) => {
           navigate(`/orders/${res.data.id}/editorder`)
           console.log(res.data)
        })
        .catch((err) => {
            console.log(err)
        })
    }

  return (
    <div>
        <div className='flex justify-end mb-2 mt-5 mr-32'>
            <button onClick={createOrder} className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none'>Create Order</button>
        </div>
      <div className='flex justify-center mb-2 mt-5'>
        <div></div>

        <div className='w-1/2'>
            <div className='ml-3 mr-3 '>
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
                                    <th className='py-2 px-4 border-b border-gray-500'>Total Price</th>
                                    <th className='py-2 px-4 border-b border-gray-500'>Order Date</th>
                                    <th className='py-2 px-4 border-b border-gray-500'>Action</th>

                                </tr>
                            </thead>
                            <tbody>
                                {orders && orders.filter(order => order.orderDate.toLowerCase().includes(query)).map((order) => (
                                    <tr key={order.id}>
                                        <td className='py-2 px-4 border-b border-gray-500'>{count++}</td>
                                        <td className='py-2 px-4 border-b border-gray-500'>{order.totalPrice}</td>
                                        <td className='py-2 px-4 border-b border-gray-500'>{order.orderDate}</td>
                                        <td className='py-2 px-4 border-b border-gray-500'><button type="button"
                                                                                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                                                                                                    >View</button></td>
                                    </tr>
                                )
                                )}
                            </tbody>
                        </table>
                </div>
        </div>

        <div></div>
      </div>
    </div>
  )
}

export default Order
