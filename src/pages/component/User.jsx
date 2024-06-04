import React, { useEffect, useState } from 'react'
import { useAuth } from '../../utils/AuthContext';
import axios from 'axios';
import '../../App.css'

function User() {

    const { isAuthenticated, jwtToken } = useAuth();

    const config = {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      };

    const [category, setCategory] = useState('');
    const [itemName, setItemName] = useState('');
    const [itemPrice, setItemPrice] = useState('');
    const [itemQty, setItemQty] = useState('');
    const [itemCategory, setItemCategory] = useState('');
    const [categories, setCategories] = useState([]);
    const [item, setItem] = useState([]);
    const [pId, setPId] = useState('');
    const [edit, setEdit] = useState(false);
    const [query, setQuery] = useState('');
    let count = 1;

    useEffect(() => {
        console.log(isAuthenticated);
        if (isAuthenticated) {
          getCategories();
          getProducts();
        }
      }, [isAuthenticated]);

      const getProducts = async () => {
        axios
          .get("http://localhost:8080/item", config)
          .then((response) => {
            setItem(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      };

      const submitProduct = async (e) => {
        e.preventDefault();

        const data = {
        itemName: itemName,
        price: itemPrice,
        qty: itemQty,
        categoryId: itemCategory,
        };

        console.log(data);

        axios
        .post("http://localhost:8080/item", data, config)
        .then((res) => {
            console.log(res.data);
            alert("Product added successfully");
            getProducts();
            setItemName('');
            setItemPrice('');
            setItemQty('');
            setItemCategory('');
        })
        .catch((err) => {
            console.log(err);
        });
      }

      const getCategories = async () => {
        axios
          .get("http://localhost:8080/category", config)
          .then((response) => {
            setCategories(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      };

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
              getCategories();
              setCategory('');
          })
          .catch((err) => {
              console.log(err);
          })
    }

    const updateProduct = async (e) => {
        e.preventDefault();

        const data = {
        itemName: itemName,
        price: itemPrice,
        qty: itemQty,
        categoryId: itemCategory,
        };

        console.log(data);

        axios
        .put(`http://localhost:8080/item/${pId}`, data, config)
        .then((res) => {
            console.log(res.data);
            alert("Product updated successfully");
            getProducts();
            setItemName('');
            setItemPrice('');
            setItemQty('');
            setItemCategory('');
        })
        .catch((err) => {
            console.log(err);
        });
    }

  return (
    <div>
      <div className='flex h-screen bg-slate-300'>
        <div className='flex-none w-1/3'>

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

            {!edit && (
                <div className='bg-gray-100 m-3 pt-3 pb-3 rounded-md'>
                    <form onSubmit={submitProduct}>
                        <div className='flex flex-col gap-2 m-2 ml-3 mr-3 gap-4'>
                            <div>
                                <div>
                                    <div>
                                        <label className=' font-bold'>Product Name</label>
                                    </div>
                                    <div>
                                        <input  className='bg-gray-300 items-center hover:bg-gray-400 py-1 px-2 rounded focus:outline-none'
                                                type="text" 
                                                placeholder="product name"
                                                value={itemName}
                                                onChange={(e) => setItemName(e.target.value)}
                                                />
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <label className=' font-bold'>Category</label>
                                    </div>
                                    <div className='text-sm'>
                                        <select
                                        
                                            name="category"
                                            onChange={(e) => setItemCategory(e.target.value)}
                                            required
                                            value={itemCategory}
                                            >
                                            <option value="" >Select Category</option>
    
                                            {categories &&
                                                categories.map((item) => (
                                                <option
                                                    key={item.id}
                                                    value={item.id}
                                                    selected={itemCategory === item.id}
                                                >
                                                    {item.name}
                                                </option>
                                                ))}
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <label className=' font-bold'>Item Quantity</label>
                                    </div>
                                    <div>
                                        <input  className='bg-gray-300 items-center hover:bg-gray-400 py-1 px-2 rounded focus:outline-none'
                                                type="text" 
                                                placeholder="quentity"
                                                value={itemQty}
                                                onChange={(e) => setItemQty(e.target.value)}
                                                />
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <label className=' font-bold'>Item Price</label>
                                    </div>
                                    <div>
                                        <input  className='bg-gray-300 items-center hover:bg-gray-400 py-1 px-2 rounded focus:outline-none'
                                                type="text" 
                                                placeholder="price"
                                                value={itemPrice}
                                                onChange={(e) => setItemPrice(e.target.value)}
                                                />
                                    </div>
                                </div>
                            </div>
                            <div className='flex justify-center ml-3 mr-3 mt-5 bg-gray-500 items-center hover:bg-gray-700 text-white font-bold py-1 px-2 rounded'>
                                <button type='submit'>Add Product</button>
                            </div>
                        </div>
                    </form>
                </div>
            )}

            {edit && (
                <div className='bg-gray-100 m-3 pt-3 pb-3 rounded-md'>
                <form onSubmit={updateProduct}>
                    <div className='flex flex-col gap-2 m-2 ml-3 mr-3'>
                        <div>
                            <div>
                                <div>
                                    <label className=' font-bold'>Product Name</label>
                                </div>
                                <div>
                                    <input  className='bg-gray-300 items-center hover:bg-gray-400 py-1 px-2 rounded focus:outline-none'
                                            type="text" 
                                            placeholder="product name"
                                            value={itemName}
                                            onChange={(e) => setItemName(e.target.value)}
                                            />
                                </div>
                            </div>
                            <div>
                                <div>
                                    <label className=' font-bold'>Category</label>
                                </div>
                                <div>
                                    <select
                                        name="category"
                                        onChange={(e) => setItemCategory(e.target.value)}
                                        required
                                        value={itemCategory}
                                        >
                                        <option value="">Select Category</option>

                                        {categories &&
                                            categories.map((item) => (
                                            <option
                                                key={item.id}
                                                value={item.id}
                                                selected={itemCategory === item.id}
                                            >
                                                {item.name}
                                            </option>
                                            ))}
                                    </select>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <label className=' font-bold'>Item Quantity</label>
                                </div>
                                <div>
                                    <input  className='bg-gray-300 items-center hover:bg-gray-400 py-1 px-2 rounded focus:outline-none'
                                            type="text" 
                                            placeholder="quentity"
                                            value={itemQty}
                                            onChange={(e) => setItemQty(e.target.value)}
                                            />
                                </div>
                            </div>
                            <div>
                                <div>
                                    <label className=' font-bold'>Item Price</label>
                                </div>
                                <div>
                                    <input  className='bg-gray-300 items-center hover:bg-gray-400 py-1 px-2 rounded focus:outline-none'
                                            type="text" 
                                            placeholder="price"
                                            value={itemPrice}
                                            onChange={(e) => setItemPrice(e.target.value)}
                                            />
                                </div>
                            </div>
                        </div>
                        <div className='flex justify-center ml-3 mr-3 mt-5 bg-gray-500 items-center hover:bg-gray-700 text-white font-bold py-1 px-2 rounded'>
                            <button type='submit'>Update Product</button>
                        </div>
                    </div>
                </form>
            </div>
            )}
            

        </div>

        <div className='product flex-auto w-full bg-white m-3 pt-3 pb-3  rounded-md'>
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
                            <th className='py-2 px-4 border-b border-gray-500'>Item Name</th>
                            <th className='py-2 px-4 border-b border-gray-500'>Item Category</th>
                            <th className='py-2 px-4 border-b border-gray-500'>Item Quantity</th>
                            <th className='py-2 px-4 border-b border-gray-500'>Item Price</th>
                            <th className='py-2 px-4 border-b border-gray-500'>Action</th>

                        </tr>
                    </thead>
                    <tbody>
                        {item && item.filter(item => item.itemName.toLowerCase().includes(query)).map((item) => (
                            <tr key={item.id}>
                                <td className='py-2 px-4 border-b border-gray-500'>{count++}</td>
                                <td className='py-2 px-4 border-b border-gray-500'>{item.itemName}</td>
                                <td className='py-2 px-4 border-b border-gray-500'>{item.category.name}</td>
                                <td className='py-2 px-4 border-b border-gray-500'>{item.qty}</td>
                                <td className='py-2 px-4 border-b border-gray-500'>{item.price}</td>
                                <td className='py-2 px-4 border-b border-gray-500'><button type="button"
                                                                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                                                                                            onClick={() => {
                                                                                            setEdit(true);
                                                                                            setPId(item.id);
                                                                                            setItemName(item.itemName);
                                                                                            setItemCategory(item.category.id);
                                                                                            setItemQty(item.qty);
                                                                                            setItemPrice(item.price);
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
  )
}

export default User
