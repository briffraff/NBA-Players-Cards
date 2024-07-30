import { Link, useNavigate } from "react-router-dom"
import { useDefaultImages } from "../../contexts/defaultImagesContext"
import { useAuth } from "../../contexts/authContext";
import NotFound from "../404/404";


export default function Logout() {
    const defaultImages = useDefaultImages();
    const logo = defaultImages[9];
    const { userLoggedIn } = useAuth();
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate(`${location.pathname}?modal=login`);
    };

    const handleRegisterClick = () => {
        navigate(`${location.pathname}?modal=register`);
    };

    return (
        <>
            {
                !userLoggedIn
                    ? (
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
                                        <div className="login" onClick={handleLoginClick}>login</div>
                                        <p>|</p>
                                        <div className="register" onClick={handleRegisterClick}>register</div>
                                    </div>
                                </section>
                            </section>
                        </div>
                    )
                    : (<NotFound />)}
        </>
    )
}