import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../utils/AuthContext';
import axios from 'axios';
import '../../App.css'

function OrderItem() {

    const {id} = useParams();

    const navigate = useNavigate();

    const { isAuthenticated, jwtToken } = useAuth();

    const [order, setOrder] = useState("");
    const [products, setProducts] = useState(null);
    const [query, setQuery] = useState("");
    const [orderItems, setOrderItems] = useState("");
    const [qty, setQty] = useState("");
    const [price, setPrice] = useState(0);
    let totalP = 0;

    const config = {
        headers: {
            Authorization: `Bearer ${jwtToken}`
        }
    }

    useEffect(() => {

        if(isAuthenticated){
            getOrder();
            getProduct();
            getOrderItems();
        }
    }, [isAuthenticated])

    const getProduct = () => {
        axios.get('http://localhost:8080/item', config)
        .then((res) => {
            setProducts(res.data) 
            console.log(res.data)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    const getOrder = () => {
        axios.get(`http://localhost:8080/orders/${id}`, config)
        .then((res) => {
            setOrder(res.data)          
            console.log(res.data)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    const getOrderItems = () => {
        axios.get(`http://localhost:8080/orderitems/${id}`, config)
        .then((res) => {
            setOrderItems(res.data)          
            console.log(res.data)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    const PlaceOrder = () => {
        const data = {
            totalPrice : price,
        }

        axios.put(`http://localhost:8080/orders/${id}`, data, config)
        .then((res) => {
            if (res.status === 200) {
                navigate('/orders');
            }
            
        })
        .catch((err) => {
            console.log(err)
        })
    }

  return (
    <div className=' bg-slate-300'>
        <div className='flex justify-center text-3xl pt-10 pb-10'>
            Order Item ID : {id}
        </div>
      

      <div>

        {order && 
        <div  className='mb-2 mt-5 mr-5'>
            <div>
                <div className='pl-8'>
                    <div className='flex gap-5'>
                        <div className='font-bold'>Date and Time : </div>
                        <div>{order.orderDate}</div>
                    </div>
                    <div className='flex gap-5'>
                        <div className='font-bold'>Total Price (Rs) : </div>
                        <div>{price}</div>
                    </div>
                </div>
            </div>

            <div className="flex justify-between">

                <div className="product w-full bg-[#869186ce] p-4 rounded-md m-9">
                    <table className="table table-striped min-w-full">
                        <thead>
                            <tr>
                                <th className='py-2 px-4 border-b border-gray-500'>#</th>
                                <th className='py-2 px-4 border-b border-gray-500'>Name</th>
                                <th className='py-2 px-4 border-b border-gray-500'>Quantity</th>
                                <th className='py-2 px-4 border-b border-gray-500'>Price</th>
                                <th className='py-2 px-4 border-b border-gray-500'>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orderItems && orderItems.map((product) => (

                                <tr key={product.id}>
                                    <td className='py-2 px-4 border-b border-gray-500'>{product.id}</td>
                                    <td className='py-2 px-4 border-b border-gray-500'>{product.item.itemName}</td>
                                    <td className='py-2 px-4 border-b border-gray-500'>{product.orderQty}</td>
                                    <td className='py-2 px-4 border-b border-gray-500'>{product.itemPrice}</td>
                                     
                                    <td className='py-2 px-4 border-b border-gray-500'>
                                        <button type="button"
                                                className='bg-red-500 text-white text-sm px-2 py-1 rounded-md hover:bg-red-600'
                                                onClick={() => {
                                                    axios.delete(`http://localhost:8080/orderitems/${product.id}`, config)
                                                        .then(function (response) {
                                                            getOrderItems();
                                                        }).catch(function (error) {
                                                            console.log(error);
                                                        })

                                                }} 
                                                >Remove</button>
                                    </td>
                                </tr>
                            
                            ))}
                        </tbody>
                    </table>
                    <div className='mt-8'>
                        <button     onClick={PlaceOrder}
                                    className='bg-green-500 text-white p-2 pl-6 pr-6 rounded-md' >Submit</button>
                    </div>
                </div>

                <div className="w-1/3 bg-[#869186ce] p-4 rounded-md m-9">
                        <div className="products">
                            <div className='flex gap-2 mb-4'>
                                <div>
                                    <input  type="text" 
                                            placeholder='Search Product here....' 
                                            className='hover:bg-[#385436] text-[#b9f7b5] pl-3 pt-1 pb-1 rounded-md focus:outline-none'
                                            onChange={(e) => setQuery(e.target.value)}  />
                                </div>
                                <div>
                                    <input  type="text" 
                                            placeholder='Quntity'
                                            className='hover:bg-[#385436] text-[#b9f7b5] pl-3 pt-1 pb-1 rounded-md focus:outline-none'
                                            value={qty}
                                            onChange={(e) => setQty(e.target.value)} />
                                </div>
                            </div>
                            {products && products.filter(product => product.itemName.toLowerCase().includes(query)).map((product) => (
                                <div key={product.id} className="mt-4 p-3 rounded-md bg-[#4c8c48]">
                                    <div className='flex gap-6'>
                                        <h5>{product.itemName}</h5>
                                        <div>Rs :  {product.price}</div>
                                        <div>Quantity : {product.qty
                                            }</div>
                                    </div>

                                    <div>
                                        <div>
                                            <button type="button" 
                                                    className='bg-green-500 text-white  pl-6 pr-6 rounded-md'
                                                    onClick={() => {

                                                const data = {
                                                    itemId: product.id,
                                                    orderQty: qty
                                                }

                                                axios.post(`http://localhost:8080/orderitems/${id}`, data, config)
                                                    .then(function (response) {
                                                        setOrder(response.data);
                                                        setPrice(price + product.price * qty);
                                                        getOrderItems();
                                                        setQty("");

                                                    }).catch(function (error) {
                                                        console.log(error);
                                                    });

                                            }}>Add</button>
                                        </div>
                                    </div>

                                    
                                </div>
                            ))}

                        </div>
                </div>

            </div>

  
        </div>
        }
      </div>
    </div>
  )
}

export default OrderItem
