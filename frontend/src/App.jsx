import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './pages/Home'
import About from './pages/About'
import AddCar from './pages/AddCar'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './Layout';
import { UserProvider } from './context/UserContext';
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import NoPage from './pages/NoPage'


function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
    <UserProvider>
     <Routes>
       <Route path='/' element={<Layout />}>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/addcar 'element={<AddCar/>} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/profile' element={<Profile />} />

          <Route path="*" element={<NoPage />} />
        </Route>
     </Routes>
     </UserProvider>
   </BrowserRouter>
  )
}

export default App
