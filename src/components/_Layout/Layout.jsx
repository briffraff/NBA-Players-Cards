import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import LoginModal from "../User/Login/LoginModal";
import RegisterModal from "../User/Register/RegisterModal";

export default function Layout() {
    const [menuItems, setMenuItems] = useState([
        { labelId: 0, label: "The Game", path: "/about-nba", isActive: false, public: true },
        { labelId: 1, label: "NBA Teams", path: "/teams", isActive: false, public: true },
        { labelId: 2, label: "Cards shop", path: "/cards-shop", isActive: false, public: true },
        { labelId: 3, label: "Login", path: "/login", isActive: false, public: true },
        { labelId: 4, label: "Register", path: "/register", isActive: false, public: true },
        { labelId: 5, label: "Create card", path: "/create-card", isActive: false, public: true },
        { labelId: 6, label: "Profile", path: "/profile/:profileId", isActive: false, public: false },
        { labelId: 7, label: "Cart", path: "/cart", isActive: false, public: false },
        { labelId: 8, label: "Logout", path: "/logout", isActive: false, public: false },
    ]);


    const location = useLocation();
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search);
    const modalType = searchParams.get("modal");

    useEffect(() => {
        const currentPath = location.pathname;
        setMenuItems(menuItems.map(item => ({
            ...item,
            isActive: item.path === currentPath,
        })));

    }, [location.pathname]);

    const handleLoginClick = () => {
        navigate(`${location.pathname}?modal=login`);
    };

    const handleRegisterClick = () => {
        navigate(`${location.pathname}?modal=register`);
    };

    const handleCloseModal = () => {
        searchParams.delete("modal");
        navigate({
            pathname: location.pathname,
            search: searchParams.toString(),
        });
    };

    return (
        <>
            <Header menu={menuItems} onLoginClick={handleLoginClick} onRegisterClick={handleRegisterClick} />
            <Outlet />
            <Footer />
            {modalType === "login" && <LoginModal setIsLoginOpen={handleCloseModal} />}
            {modalType === "register" && <RegisterModal setIsRegisterOpen={handleCloseModal} />}
        </>
    );
}
