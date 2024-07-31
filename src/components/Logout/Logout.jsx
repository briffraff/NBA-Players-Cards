import { Link, useNavigate } from "react-router-dom"
import { useDefaultImages } from "../../contexts/defaultImagesContext"
import { useAuth } from "../../contexts/authContext";
import NotFound from "../404/404";
import styles from "../../../public/assets/scss/modules/_Logout.module.scss"

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
                        <div className={styles.contentWrapper}>
                            <section className={`${styles.logoutBox} content`}>
                                <h1 className={styles.welcome}>Thank you for visiting nbacards,</h1>
                                <h1 className={styles.welcome}>See you next time! !</h1>
                                <h4 className={styles.subHead}>Everything for</h4>
                                <Link to='/'><img className={styles.nba} src={logo} alt="" /></Link>
                                <p className={styles.subHead}>Teams</p>
                                <section className={styles.logReg}>
                                    <p>You have no registration ?</p>
                                    <div>
                                        <div className={styles.login} onClick={handleLoginClick}>login</div>
                                        <p>|</p>
                                        <div className={styles.register} onClick={handleRegisterClick}>register</div>
                                    </div>
                                </section>
                            </section>
                        </div>
                    )
                    : (<NotFound />)}
        </>
    )
}