import Header from "../Header/Header"
import Footer from "../Footer/Footer"
import { Outlet } from "react-router-dom"

export default function Layout() {
    const menu = [
        "The Game",
        "NBA Teams",
        "Cards shop",
        "Login",
        "Register",
        "Create card",
        "Profile",
        "Cart",
        "Logout"
    ];

    return (
        <>
            <Header menu={menu} />
            <Outlet/>
            <Footer />
        </>
    )
}