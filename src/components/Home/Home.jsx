import Header from "../Header/Header"
import Teams from "../Teams/Teams";


export default function Home() {
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
            <Teams />
        </>
    )
}