import { Link } from "react-router-dom";
import { logoutUser } from "../../service/authentication/authService";

export default function Header() {
    const handleLogout = async () => {
        try {
            await logoutUser();
        } catch (error) {
            console.error('Error during logout:', error.message);
        }
    };

    return (
        <>
            <header className="site-header">
                <div className="logo">Logo</div>
                <nav className="site-nav">
                    {/* not logged*/}
                    <Link className="header-btn" to="/about-nba">/ What is NBA</Link>
                    <Link className="header-btn" to="/teams">/ NBA Teams</Link>
                    <Link className="header-btn" to="/cards-shop">/ Cards shop</Link>
                    <Link className="header-btn" to="/login"> / Login</Link>
                    <Link className="header-btn" to="/register">/ Register</Link>

                    {/* logged user */}
                    <Link className="header-btn" to="/about-nba">/ What is NBA</Link>
                    <Link className="header-btn" to="/teams">/ NBA Teams</Link>
                    <Link className="header-btn" to="/cards-shop">/ Cards shop</Link>

                    {/* logged and admin */}
                    <Link className="header-btn" to="/create-card">/ Create Card</Link>

                    <Link className="header-btn" to="/profile">/ Profile</Link>
                    <Link className="header-btn" to="/cart">/ Cart</Link>
                    <Link className="header-btn" to="/logout" onClick={handleLogout}>/ Logout</Link>

                </nav>
            </header>
        </>
    )
}