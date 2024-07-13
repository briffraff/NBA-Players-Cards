import { Link } from "react-router-dom";
import styles from "../../../public/assets/css/modules/NotFound404.module.css"
import rim from "../../../public/assets/img/readme/rim.svg"
export default function NotFound() {
    return (
        <>
            <div className={styles.container}>
                <img src={rim} alt="Rim" width={300} height={300} />
                <div className={styles.notFound}>
                    <h1 className={styles.error}>
                        !<h1 className={styles.errorNumber}>404</h1>
                    </h1>
                    <h2>Page Not Found</h2>
                    <h4>The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</h4>
                    <Link to="/" className={styles.btn}>Go to Home</Link>
                </div >
            </div>
        </>
    )
}