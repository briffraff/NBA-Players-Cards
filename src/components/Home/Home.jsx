import Header from "../Header/Header"

export default function Home() {
    const menu = [
        "What is NBA",
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
            <Header menu={menu}/>
        </>
    )
}