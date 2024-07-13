import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { seedJsonDataToFirestore } from "../service/firebase/firestore/Seed/seedData";

import "../../public/assets/css/App.css";
import AuthProvider from "../contexts/authContext";
import DefaultImagesProvider from "../contexts/defaultImagesContext";

import Layout from "./_Layout/Layout";
import Home from "./Home/Home";
import Login from "./User/Login/Login";
import Register from "./User/Register/Register";
import Logout from "./User/Logout/Logout";
import Teams from "./Teams/Teams";
import TeamDetails from "./Teams/TeamDetails";
import AboutNba from "./About/AboutNba";
import Profile from "./Profile/Profile";
import NotFound from "./404/404";

export default function App() {

    // //SEED init DATA
    // useEffect(() => {
    //   seedJsonDataToFirestore();
    // }, [])

    return (
        <>
            <AuthProvider>
                <DefaultImagesProvider>
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<Layout />}>
                                <Route index path="/" element={<Home />}></Route>
                                <Route path="/login" element={<Login />} />
                                <Route path="/register" element={<Register />} />
                                <Route path="/logout" element={<Logout />} />
                                <Route path="/about-nba" element={<AboutNba />} />
                                <Route path="/teams" element={<Teams />} />
                                <Route path="/team/:teamId" element={<TeamDetails />} />
                                <Route path="/profile/:profileId" element={<Profile />} />
                                {/* <Route path="/cards-shop" element={<CardsShop />} />  */}
                                <Route path="*" element={<NotFound />} />
                            </Route>
                        </Routes>
                    </BrowserRouter>
                </DefaultImagesProvider>
            </AuthProvider >
        </>
    );
}
