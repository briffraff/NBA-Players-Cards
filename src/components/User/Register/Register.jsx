export default function Register() {
    return (
        <>
            <div className="login-box">
                <h1 className="box-slogan">Register</h1>
                <div className="textbox">
                    <i className="fas fa-user"></i>
                    <input type="text" placeholder="Username" />
                </div>

                <div className="textbox">
                    <i className="fas fa-lock"></i>
                    <input type="password" placeholder="Password" />
                </div>
                
                <div className="textbox">
                    <i className="fas fa-unlock"></i>
                    <input type="password" placeholder="Repeat Password" />
                </div>

                <div className="textbox">
                    <i className="fas fa-envelope"></i>
                    <input type="email" placeholder="E-mail" />
                </div>

                <input className="login-btn" type="button" value="REGISTER" />
            </div>
        </>
    )
}