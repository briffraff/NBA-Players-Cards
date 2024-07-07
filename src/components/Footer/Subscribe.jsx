import { useState } from "react";
import { addSubscriber } from "../../service/firebase/firestore/firestore-service";

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

            <div className="footer-subscribe-form">
                <div className="footer-label">
                    <h4>Subscribe</h4>
                </div>

                {error && <div className="error-message center">{error}</div>}

                <form className="subscribe" onSubmit={handleSubmit}>
                    <input
                        type="email"
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