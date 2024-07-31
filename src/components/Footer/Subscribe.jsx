import { useState } from "react";
import { addSubscriber } from "../../service/firebase/firestore/firestore-service";

import styles from "../../../public/assets/scss/modules/_Footer.module.scss"

export default function Subscribe() {
    const [subscriberEmail, setSubscriberEmail] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            console.log(subscriberEmail)
            await addSubscriber(subscriberEmail);
            setSubscriberEmail("");
            setError("")
        } catch (error) {
            setError(error.message);
        }
    };

    const handleChange = (event) => {
        setSubscriberEmail(event.target.value)
        if (event.target.value == "") {
            setError("")
        }
    };

    return (
        <>

            <div className={styles.footerSubscribeForm}>
                <div className={styles.footerLabel}>
                    <h4>Subscribe</h4>
                </div>

                {error && <div className={`${styles.errorMessage} ${styles.center}`}>{error}</div>}

                <form className={styles.subscribe} onSubmit={handleSubmit}>
                    <input
                        type="email"
                        id="subscriberEmail"
                        placeholder="Your email address"
                        value={subscriberEmail}
                        onClick={(e) => setSubscriberEmail(e.target.value)}
                        onChange={handleChange}
                        required
                    />
                    <input type="submit" value="Subscribe" />
                </form>
            </div>
        </>
    )
}