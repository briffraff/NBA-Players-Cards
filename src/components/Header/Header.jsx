import React from "react";
import { Link } from "react-router-dom";
import { logoutUser } from "../../service/firebase/authentication/auth-service";
import { useAuth } from "../../contexts/authContext";
import { useDefaultImages } from "../../contexts/defaultImagesContext";

export default function Header({ menu }) {
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
                    <Link className={`header-btn ${menu[0].isActive ? `active` : ''}`} to={menu[0].path}>/ {menu[0].label}</Link>
                    <Link className={`header-btn ${menu[1].isActive ? `active` : ''}`} to={menu[1].path}>/ {menu[1].label}</Link>
                    <Link className={`header-btn ${menu[2].isActive ? `active` : ''}`} to={menu[2].path}>/ {menu[2].label}</Link>
                </nav>
                <div className="user-actions">
                    {userLoggedIn ? (
                        <div className="logged-in">
                            <div className="greeting">
                                <span className="hello">Hello,</span>
                                <Link to={menu[6].path.replace(':profileId', currentUser.uid)} className={`user-profile`}>{currentUser.displayName}</Link>
                            </div>
                            <Link className={`cart-btn ${menu[7].isActive ? `active` : ''}`} to={menu[7].path}>/ {menu[7].label}</Link>
                            <Link className={`logout-btn ${menu[8].isActive ? `active` : ''}`} onClick={handleLogout} to={menu[8].path}>/ {menu[8].label}</Link>
                        </div>
                    ) : (
                        <div className="logged-out">
                            <Link className={`header-btn ${menu[3].isActive ? `active` : ''}`} to={menu[3].path}>/ {menu[3].label}</Link>
                            <Link className={`header-btn ${menu[4].isActive ? `active` : ''}`} to={menu[4].path}>/ {menu[4].label}</Link>
                        </div>
                    )}
                </div>
            </header>
        </>
    )
}