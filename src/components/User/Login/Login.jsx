export default function Login() {
    return (
        <>
            <main class="site-content">
                <div class="site-wrapper">
                    <div class="login-box">

                        <h1 class="info-slogan">Login</h1>
                        <div class="textbox">
                            <i class="fas fa-user"></i>
                            <input type="text" placeholder="Username" />
                        </div>

                        <div class="textbox">
                            <i class="fas fa-lock"></i>
                            <input type="text" placeholder="Password" />
                        </div>

                        <input class="login-btn" type="button" value="Log in" />
                    </div>
                </div>

            </main>
        </>
    )
}