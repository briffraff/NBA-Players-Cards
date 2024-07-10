import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { logoutUser } from "../../service/firebase/authentication/auth-service";
import { useAuth } from "../../contexts/authContext";
import { useDefaultImages } from "../../contexts/defaultImagesContext";

export default function Header(props) {
    const defaultImages = useDefaultImages();
    const logo = defaultImages[8];

    const { currentUser, userLoggedIn, loading } = useAuth();

    const handleLogout = async () => {
        try {
            await logoutUser();
        } catch (error) {
            console.log('Error during logout:', error.message);
        }
    };

    return (
        <>
            <header className="site-header">
                <Link to="/"><img className="logo" src={logo} /></Link>
                <nav className="main-menu">
                    <Link className="header-btn" to="/about-nba">/ {props.menu[0]}</Link>
                    <Link className="header-btn" to="/teams">/ {props.menu[1]}</Link>
                    <Link className="header-btn" to="/cards-shop">/ {props.menu[2]}</Link>
                </nav>
                <div className="user-actions">
                    {userLoggedIn ? (
                        <div className="logged-in">
                            <div className="greeting">
                                <span className="hello">Hello,</span>
                                <Link className="user-profile" to="/profile">{currentUser.displayName}</Link>
                            </div>
                            <Link className="cart-btn" to="/cart">/ {props.menu[7]}</Link>
                            <Link className="logout-btn" to="/logout" onClick={handleLogout}>/ {props.menu[8]}</Link>
                        </div>
                    ) : (
                        <div className="logged-out">
                            <Link className="header-btn" to="/login"> / {props.menu[3]}</Link>
                            <Link className="header-btn" to="/register">/ {props.menu[4]}</Link>
                        </div>
                    )}
                </div>
            </header>
        </>
    )
}