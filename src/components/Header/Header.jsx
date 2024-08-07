import React from "react";
import { Link, useNavigate } from "react-router-dom";

import { logoutUser } from "../../service/firebase/authentication/auth-service";
import { useAuth } from "../../contexts/authContext";
import { useDefaultImages } from "../../contexts/defaultImagesContext";
import { useCart } from "../../contexts/cartContext";

import CartBadge from "../Cart/CartBadge";
import MiniCart from "../Cart/MiniCart";

import styles from "../../../public/assets/scss/modules/_Header.module.scss"

export default function Header({ menu, onLoginClick, onRegisterClick }) {
    const defaultImages = useDefaultImages();
    const logo = defaultImages[9];
    const navigate = useNavigate();
    const { currentUser, userLoggedIn, loading } = useAuth();
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const { isMiniCartVisible, clearCartOnLogout } = useCart();

    const handleLogout = async () => {
        setIsSubmitting(true);
        try {
            await logoutUser();
            navigate("logout");
        } catch (error) {
            console.log('Error during logout:', error.message);
        } finally {
            setIsSubmitting(false);
            clearCartOnLogout();
        }
    };

    const handleLoading = isSubmitting ? "Logging out..." : `/ ${menu[8].label}`;

    return (
        <>
            <header className={styles.siteHeader}>
                <Link to="/"><img className={styles.logo} src={logo} alt="Logo" /></Link>
                <nav className={styles.mainMenu}>
                    <Link className={`${styles.headerBtn} ${menu[0].isActive ? styles.active : ''}`} to={menu[0].path}>/ {menu[0].label}</Link>
                    <Link className={`${styles.headerBtn} ${menu[1].isActive ? styles.active : ''}`} to={menu[1].path}>/ {menu[1].label}</Link>
                    <Link className={`${styles.headerBtn} ${menu[2].isActive ? styles.active : ''}`} to={menu[2].path}>/ {menu[2].label}</Link>
                </nav>
                <div className={styles.userActions}>
                    {userLoggedIn ? (
                        <div className={styles.loggedIn}>
                            <div className={styles.greeting}>
                                <span className={styles.hello}>Hello,</span>
                                <Link to={menu[6].path.replace(':profileId', currentUser.uid)} className={styles.userProfile}>{currentUser.displayName}</Link>
                            </div>

                            <Link className={`${styles.cartBtn} ${menu[7].isActive ? styles.active : ''}`} to={menu[7].path}>/ {menu[7].label}</Link>

                            <div>
                                <CartBadge />
                            </div>

                            {isMiniCartVisible && <MiniCart />}

                            <Link className={`${styles.logoutBtn} ${menu[8].isActive ? styles.active : ''}`} onClick={handleLogout} to={menu[8].path}>{handleLoading}</Link>
                        </div>
                    ) : (
                        <div className={styles.loggedOut}>
                            <div className={`${styles.headerBtn} ${menu[3].isActive ? styles.active : ''}`} onClick={onLoginClick}>/ {menu[3].label}</div>
                            <div className={`${styles.headerBtn} ${menu[4].isActive ? styles.active : ''}`} onClick={onRegisterClick}>/ {menu[4].label}</div>
                        </div>
                    )}
                </div>
            </header>
        </>
    );
}
