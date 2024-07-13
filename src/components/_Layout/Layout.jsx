import Header from "../Header/Header"
import Footer from "../Footer/Footer"
import { Outlet, useLocation } from "react-router-dom"
import { useState, useEffect } from "react";


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

    useEffect(() => {
        const currentPath = location.pathname;
        setMenuItems(menuItems.map(item => ({
            ...item,
            isActive: item.path === currentPath,
        })));

    }, [location.pathname]);

    return (
        <>
            <Header menu={menuItems} />
            <Outlet />
            <Footer />
        </>
    )
}