import React, { useEffect } from "react";
import styles from "../../../../public/assets/css/modules/Modal.module.css"

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../../service/firebase/authentication/auth-service";
import { useDefaultImages } from "../../../contexts/defaultImagesContext";
import { useAuth } from "../../../contexts/authContext";

export default function LoginModal({ setIsLoginOpen }) {
    const defaultImages = useDefaultImages();
    const backgroundImage = defaultImages[0];

    const { currentUser, userLoggedIn, loading } = useAuth();

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);

        try {
            const { user } = await loginUser(form.email, form.password);
            console.log(user);
            setForm({ email: "", password: "" });
            setError("");
            navigate('/')
        } catch (error) {
            setError(error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm((prevForm) => ({
            ...prevForm,
            [name]: value,
        }));
    };

    const handleModalClick = (event) => {
        event.stopPropagation();
    };

    useEffect(() => {
        userLoggedIn && setIsLoginOpen(false)
    }, [userLoggedIn, setIsLoginOpen]);


    return (
        <>
            <section id="loginModal" className={`${styles.modalBackground}`} onClick={() => setIsLoginOpen(false)}>
                <form className={`${styles.modalBox} ${styles.centered}`} onSubmit={handleLogin} onClick={handleModalClick}>
                    <div className={styles.modalHeader}>
                        <h1 className={styles.modalSlogan}>Login</h1>
                        <div className={styles.esc} onClick={() => setIsLoginOpen(false)}>x</div>
                    </div>
                    <div className={styles.modalTextbox}>
                        <i className="fas fa-envelope"></i>
                        <input type="email" id="loginEmail" name="email" placeholder="E-mail" value={form.email} onChange={handleChange} />
                    </div>

                    <div className={styles.modalTextbox}>
                        <i className="fas fa-lock"></i>
                        <input type="password" id="loginPassword" name="password" placeholder="Password" value={form.password} onChange={handleChange} />
                    </div>

                    {error && <div className={styles.errorMessage}>{error}</div>}

                    <button className={styles.modalBtn} type="submit">
                        {isSubmitting ? "LOGGING..." : "LOGIN"}
                    </button>
                    <p className={styles.forgot}>Forgot password ?</p>
                </form>
            </section>
        </>
    );
}

