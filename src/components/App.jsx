import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "../../public/assets/css/App.css";

import Home from "./Home/Home";
import Login from "./User/Login/Login";
import Register from "./User/Register/Register";
import Logout from "./User/Logout/Logout";
import AuthProvider from "../contexts/authContext";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route index path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
