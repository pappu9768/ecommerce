import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import { ToastContainer } from 'react-toastify'
import Home from './pages/Home';
import CreateProduct from './adminPanel/CreateProduct';
import NotFounf from './components/NotFounf';
const App = () => {
  const [authorization,setAuthorization] = React.useState(false);
  const [role,setRole] = React.useState(0)

  function authrorizedRoutes({children}){
    // if authorization is true then children(it is just a name whichever it is warpped it will do what the logic says)
    return authorization ? children : <Navigate to='/login'/>
    
  }

  function adminAuthrorizedRoutes({children}){
    return role == 1 ? children : <Navigate to='/login'/>
  }
  return (
    <>
      <Routes>
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/home' element={<Home />} />
        <Route path='/admin' element={<CreateProduct/>} />
        <Route path='*' element={<NotFounf/>}/>
      </Routes>

      <ToastContainer position='top-right'/>

    </>
  )
}

export default App
