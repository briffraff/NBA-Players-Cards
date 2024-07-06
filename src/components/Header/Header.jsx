import { Link } from "react-router-dom";
import { logoutUser } from "../../service/authentication/authService";
import { useEffect, useState } from "react";

export default function Header(props) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        //check if user is logged in
        const loggedIn = true;
        setIsLoggedIn(loggedIn);
    }, []);

    const handleLogout = async () => {
        try {
            await logoutUser();
            setIsLoggedIn(false);
        } catch (error) {
            console.error('Error during logout:', error.message);
        }
    };

    return (
        <>
            <header className="site-header">
                <img className="logo" src="../../public/assets/img/nba.png" alt="Logo" />
                <nav className="main-menu">
                    <Link className="header-btn" to="/about-nba">/ {props.menu[0]}</Link>
                    <Link className="header-btn" to="/teams">/ {props.menu[1]}</Link>
                    <Link className="header-btn" to="/cards-shop">/ {props.menu[2]}</Link>
                </nav>
                <div className="user-actions">
                    {isLoggedIn ? (
                        <div className="logged-in">
                            <div className="greeting">
                                <span className="hello">Hello /</span>
                                <Link className="user-profile" to="/profile">User</Link>
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