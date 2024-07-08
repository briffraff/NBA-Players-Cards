import { Link } from "react-router-dom"
const logo = "https://firebasestorage.googleapis.com/v0/b/nba-player-cards.appspot.com/o/images%2Fcontent%2Fnba.png?alt=media&token=69987172-bd26-40c1-874a-fce01d97d9b8"
export default function Logout() {
    return (
        <>
            <section className="logout-box">
                <h1 className="welcome">Thank you for choosing logos.nba !</h1>
                <h4 className="sub-head">Everything for</h4>
                <Link to='/'><img className="nba" src={logo} alt="" /></Link>
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