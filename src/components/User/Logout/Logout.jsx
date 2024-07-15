import { Link, Outlet } from "react-router-dom"
import { useDefaultImages } from "../../../contexts/defaultImagesContext"
import { useState } from "react";

import LoginModal from "../Login/LoginModal";
import RegisterModal from "../Register/RegisterModal";

export default function Logout() {
    const defaultImages = useDefaultImages();
    const logo = defaultImages[8];

    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isRegisterOpen, setIsRegisterOpen] = useState(false);

    return (
        <>
            <div className="content-wrapper">
                <section className="logout-box content">
                    <h1 className="welcome">Thank you for visiting nbacards,</h1>
                    <h1 className="welcome">See you next time! !</h1>
                    <h4 className="sub-head">Everything for</h4>
                    <Link to='/'><img className="nba" src={logo} alt="" /></Link>
                    <p className="sub-head">Teams</p>
                    <section className="log-reg">
                        <p>You have no registration ?</p>
                        <div>
                            <button className="login" onClick={() => setIsLoginOpen(true)}>Login</button>
                            <p>|</p>
                            <div className="register" onClick={() => setIsRegisterOpen(true)}>register</div>
                        </div>
                    </section>
                </section>
            </div>

            {isLoginOpen && <LoginModal setIsLoginOpen={setIsLoginOpen} />}
            {isRegisterOpen && <RegisterModal setIsRegisterOpen={setIsRegisterOpen} />}
        </>
    )
}