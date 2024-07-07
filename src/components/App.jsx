import { BrowserRouter, Routes, Route } from "react-router-dom";

import "../../public/assets/css/App.css";
import AuthProvider from "../contexts/authContext";

import Home from "./Home/Home";
import Login from "./User/Login/Login";
import Register from "./User/Register/Register";
import Logout from "./User/Logout/Logout";
import Teams from "./Teams/Teams";
import TeamDetails from "./Teams/TeamDetails";


export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route index path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/logout" element={<Logout />} />
          {/* <Route path="/about-nba" element={<AboutNba />} /> */}
          <Route path="/teams" element={<Teams />} />
          <Route path="/team/:id" element={<TeamDetails />} />
          {/* <Route path="/cards-shop" element={<CardsShop />} />  */}
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
