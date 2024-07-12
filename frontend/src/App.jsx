import { useState } from 'react'
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
import { CarProvider } from './context/CarContext'
import UpdateCar from './pages/UpdateCar'
import Dashboard from './pages/Dashboard'
import UpdateUser from './pages/UpdateUser'


function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
    <UserProvider>
      <CarProvider>
     <Routes>
       <Route path='/' element={<Layout />}>
          <Route path='/' element={<Home />} />
          <Route path='/dashboard' element={<Dashboard />}/>
          <Route path='/about' element={<About />} />
          <Route path='/addcar' element={<AddCar/>} />
          <Route path='/car/:car_id' element={<UpdateCar />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/updateuser' element={<UpdateUser />} />
          <Route path='/updatecar' element={<UpdateCar />} />

          <Route path="*" element={<NoPage />} />
        </Route>
     </Routes>
     </CarProvider>
     </UserProvider>
   </BrowserRouter>
  )
}

export default App
