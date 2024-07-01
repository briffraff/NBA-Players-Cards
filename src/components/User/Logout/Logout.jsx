export default function Logout() {
    return (
        <>
            <section className="logout-box">
                <h1 className="welcome">Thank you for choosing logos.nba !</h1>
                <h4 className="sub-head">Everything for</h4>
                <img className="nba" src="../../../../public/assets/img/nba.png" alt="" />
                <p className="sub-head">Teams</p>
                <section className="log-reg">
                    <p>You have no registration ?</p>
                    <div>
                        <a href="login/" className="login">login</a>
                        <p>|</p>
                        <a href="register/" className="register">register</a>
                    </div>
                </section>
            </section>
        </>
    )
}