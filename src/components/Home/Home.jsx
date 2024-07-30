import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";
import { useDefaultImages } from "../../contexts/defaultImagesContext";

export default function Home() {
    const { userLoggedIn } = useAuth();

    const defaultImages = useDefaultImages();
    const backgroundImage = defaultImages[1];
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate(`${location.pathname}?modal=login`);
    };

    const handleRegisterClick = () => {
        navigate(`${location.pathname}?modal=register`);
    };

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
                                        <div className="login" onClick={handleLoginClick}>login</div>
                                        <p>|</p>
                                        <div className="register" onClick={handleRegisterClick}>register</div>
                                    </div>
                                </section>
                            )}
                        </div>
                    </section>
                </section>
            </div>

        </>
    )
}