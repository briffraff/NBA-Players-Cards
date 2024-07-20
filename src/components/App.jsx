import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Start } from "../service/firebase/firestore/Seed/seedData";

import "../../public/assets/css/App.css";
import AuthProvider from "../contexts/authContext";
import DefaultImagesProvider from "../contexts/defaultImagesContext";

import Layout from "./_Layout/Layout";
import Home from "./Home/Home";
import Logout from "./User/Logout/Logout";
import AboutNba from "./About/AboutNba";
import Teams from "./Teams/Teams";
import TeamDetails from "./Teams/TeamDetails";
import Profile from "./Profile/Profile";
import NotFound from "./404/404";
import CardCreate from "./Cards/CardCreate";
import CardsShop from "./Cards/CardsShop";

export default function App() {

    // // SEED init DATA
    // useEffect(() => {
    //   Start();
    // }, [])

    return (
        <>
            <AuthProvider>
                <DefaultImagesProvider>
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<Layout />}>
                                <Route index path="/" element={<Home />}></Route>
                                <Route path="/logout" element={<Logout />} />
                                <Route path="/about-nba" element={<AboutNba />} />
                                <Route path="/teams" element={<Teams />} />
                                <Route path="/team/:teamId" element={<TeamDetails />} />
                                <Route path="/profile/:profileId" element={<Profile />} />
                                <Route path="/cards-shop" element={<CardsShop />} />
                                <Route path="/card-create" element={<CardCreate />} />
                                <Route path="*" element={<NotFound />} />
                            </Route>
                        </Routes>
                    </BrowserRouter>
                </DefaultImagesProvider>
            </AuthProvider >
        </>
    );
}
