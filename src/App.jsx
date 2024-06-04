import './App.css'
import React from "react";
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import { AuthProvider } from './utils/AuthContext';
import Home from './pages/Home';
import Login from './pages/Login';
import HomeBill from './pages/HomeBill';
import UserPage from './pages/UserPage';



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
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  )
}

export default App
