import { useState } from 'react'
import '../../public/assets/css/App.css'
import Login from './User/Login/Login'
import Register from './User/Register/Register'
import Logout from './User/Logout/Logout'

export default function App() {

  return (
    <>
      <Logout />
      {/* <Login /> */}
      <Register />
    </>
  )
}
