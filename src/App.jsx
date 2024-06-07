import './App.css'
import React from "react";
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import { AuthProvider } from './utils/AuthContext';
import Home from './pages/Home';
import Login from './pages/Login';
import HomeBill from './pages/HomeBill';
import UserPage from './pages/UserPage';
import UserPage01 from './pages/UserPage01';
import OrderPage from './pages/OrderPage';
import OrderItemPage from './pages/OrderItemPage';



function App() {


  return (
    <div>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path='/login' element={<Login/>}/>
            <Route path='/home' element={<HomeBill/>}/>
            <Route path='/items' element={<UserPage/>}/>
            <Route path='/users' element={<UserPage01/>}/>
            <Route path='/orders' element={<OrderPage/>}/>
            <Route path='/orders/:id/orderitem' element={<OrderItemPage/>}/>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  )
}

export default App
