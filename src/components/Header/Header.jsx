import React from "react";
import { Link } from "react-router-dom";
import { logoutUser } from "../../service/firebase/authentication/auth-service";
import { useAuth } from "../../contexts/authContext";
import { useDefaultImages } from "../../contexts/defaultImagesContext";
import CartBadge from "../Cart/CartBadge";
import MiniCart from "../Cart/MiniCart";
import { useCart } from "../../contexts/cartContext";

export default function Header({ menu, onLoginClick, onRegisterClick }) {
    const defaultImages = useDefaultImages();
    const logo = defaultImages[8];
    const { currentUser, userLoggedIn, loading } = useAuth();
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const { isMiniCartVisible, clearCart } = useCart();

    const handleLogout = async () => {
        setIsSubmitting(true);
        try {
            await logoutUser();
        } catch (error) {
            console.log('Error during logout:', error.message);
        } finally {
            setIsSubmitting(false);
            clearCart();
        }
    };

    const handleLoading = isSubmitting ? "Logging out..." : `/ ${menu[8].label}`;

    return (
        <>
            <header className="site-header">
                <Link to="/"><img className="logo" src={logo} alt="Logo" /></Link>
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

                            <div>
                                <CartBadge />
                            </div>

                            {isMiniCartVisible && <MiniCart />}

                            <Link className={`logout-btn ${menu[8].isActive ? `active` : ''}`} onClick={handleLogout} to={menu[8].path}>{handleLoading}</Link>
                        </div>
                    ) : (
                        <div className="logged-out">
                            <div className={`header-btn ${menu[3].isActive ? `active` : ''}`} onClick={onLoginClick}>/ {menu[3].label}</div>
                            <div className={`header-btn ${menu[4].isActive ? `active` : ''}`} onClick={onRegisterClick}>/ {menu[4].label}</div>
                        </div>
                    )}
                </div>
            </header>
        </>
    );
}
