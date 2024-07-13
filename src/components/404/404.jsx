import { Link } from "react-router-dom";
import styles from "../../../public/assets/css/modules/NotFound404.module.css"

export default function NotFound() {
    return (
        <>
            <div className={styles.notFound}>
                <h1>404</h1>
                <h2>Page Not Found</h2>
                <h4>The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</h4>
                <Link to="/" className={styles.btn}>Go to Home</Link>
            </div>
        </>
    )
}