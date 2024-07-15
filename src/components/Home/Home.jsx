import { Link } from "react-router-dom";
import { useDefaultImages } from "../../contexts/defaultImagesContext";
import { useAuth } from "../../contexts/authContext";
import { useState } from 'react';
import LoginModal from "../User/Login/LoginModal.jsx";
import RegisterModal from "../User/Register/RegisterModal.jsx";

export default function Home() {
    const { currentUser, userLoggedIn, loading } = useAuth();

    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isRegisterOpen, setIsRegisterOpen] = useState(false);

    const defaultImages = useDefaultImages();
    const backgroundImage = defaultImages[1];

    return (
        <>
            <div className="site-wrapper">
                <section className="site-content welcome-media" style={{ backgroundImage: `url(${backgroundImage})` }}>
                    <section className="section-info-panel">
                        <div className="welcome">
                            <h1 className="welcome-title">Welcome,</h1>
                            <h1 className="welcome-title">to the World of </h1>
                            <h1 className="welcome-title">Basketball</h1>
                            <h3 className="welcome-subtitle">everything for NBA </h3>
                            <h3 className="welcome-subtitle">history, teams , player cards , shop</h3>
                            {userLoggedIn == false && (
                                <section className="log-reg">
                                    <p>You have no registration ?</p>
                                    <div className="reg-login">
                                        <button className="login" onClick={() => setIsLoginOpen(true)}>LOGIN</button>
                                        <p>|</p>
                                        <div className="register" onClick={() => setIsRegisterOpen(true)}>REGISTER</div>
                                    </div>
                                </section>
                            )}
                        </div>
                    </section>
                </section>
            </div>

            {isLoginOpen && <LoginModal setIsLoginOpen={setIsLoginOpen} />}
            {isRegisterOpen && <RegisterModal setIsRegisterOpen={setIsRegisterOpen} />}
        </>
    )
}