import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";
import { useDefaultImages } from "../../contexts/defaultImagesContext";

import styles from "../../../public/assets/scss/modules/_Welcome.module.scss"

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

            <section className={`site-content ${styles.welcomeMedia}`} style={{ backgroundImage: `url(${backgroundImage})` }}>
                <section className={styles.sectionInfoPanel}>
                    <div className={styles.welcome}>
                        <h1 className={styles.welcomeTitle}>Welcome,</h1>
                        <h1 className={styles.welcomeTitle}>to the World of </h1>
                        <h1 className={styles.welcomeTitle}>Basketball</h1>
                        <h3 className={styles.welcomeSubtitle}>everything for NBA </h3>
                        <h3 className={styles.welcomeSubtitle}>history, teams , player cards , shop</h3>
                        {userLoggedIn == false && (
                            <section className={styles.logReg}>
                                <p>You have no registration ?</p>
                                <div className={styles.regLogin}>
                                    <div className={styles.login} onClick={handleLoginClick}>login</div>
                                    <p>|</p>
                                    <div className={styles.register} onClick={handleRegisterClick}>register</div>
                                </div>
                            </section>
                        )}
                    </div>
                </section>
            </section>


        </>
    )
}