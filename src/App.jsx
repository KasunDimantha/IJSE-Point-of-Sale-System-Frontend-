import './App.css'
import React from "react";
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import { AuthProvider } from './utils/AuthContext';
import Home from './pages/Home';



function App() {


  return (
    <div>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home/>} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  )
}

export default App
