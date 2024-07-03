import { Link } from "react-router-dom";

export default function Header() {
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
                    <Link className="header-btn" to="/logout">/ Logout</Link>

                </nav>
            </header>
        </>
    )
}