export default function Login() {
    return (
        <>
            <div className="login-box">

                <h1 className="box-slogan">Login</h1>
                <div className="textbox">
                    <i className="fas fa-user"></i>
                    <input type="text" placeholder="Username" />
                </div>

                <div className="textbox">
                    <i className="fas fa-lock"></i>
                    <input type="text" placeholder="Password" />
                </div>

                <input className="login-btn" type="button" value="LOG IN" />
            </div>
        </>
    )
}