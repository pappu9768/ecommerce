import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import { ToastContainer } from 'react-toastify'
import Home from './pages/Home';
import CreateProduct from './adminPanel/CreateProduct';
const App = () => {
  return (
    <>
      <Routes>
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/home' element={<Home />} />
        <Route path='/admin' element={<CreateProduct/>} />
      </Routes>

      <ToastContainer position='top-right'/>

    </>
  )
}

export default App
