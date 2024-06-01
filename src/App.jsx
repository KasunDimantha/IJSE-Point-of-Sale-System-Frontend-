import { BrowserRouter, Routes } from 'react-router-dom'
import './App.css'
import { AuthProvider } from './utils/AUthContext'


function App() {

  return (
    <div>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  )
}

export default App
