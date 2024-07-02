// import defaults
import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

//import styles
import '../../public/assets/css/App.css'

//import components
import Login from './User/Login/Login'
import Register from './User/Register/Register'
import Home from './Home/Home'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path='/' element={<Home />}></Route>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </BrowserRouter>
  )
}
