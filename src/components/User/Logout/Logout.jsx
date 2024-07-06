import { Link } from "react-router-dom"

export default function Logout() {
    return (
        <>
            <section className="logout-box">
                <h1 className="welcome">Thank you for choosing logos.nba !</h1>
                <h4 className="sub-head">Everything for</h4>
                <Link to='/'><img className="nba" src="../../../../public/assets/img/nba.png" alt="" /></Link>
                <p className="sub-head">Teams</p>
                <section className="log-reg">
                    <p>You have no registration ?</p>
                    <div>
                        <Link className="login" to="/login">Login</Link>
                        <p>|</p>
                        <Link className="register" to="/register">register</Link>
                    </div>
                </section>
            </section>
        </>
    )
}