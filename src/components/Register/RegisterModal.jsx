import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { registerUser } from "../../service/firebase/authentication/auth-service";

import { useDefaultImages } from "../../contexts/defaultImagesContext";
import { useAuth } from "../../contexts/authContext";

import styles from "../../../public/assets/scss/modules/_Modal.module.scss"

export default function RegisterModal({ setIsRegisterOpen }) {
    const defaultImages = useDefaultImages();
    const backgroundImage = defaultImages[0];

    const { currentUser, userLoggedIn, loading } = useAuth();

    const [form, setForm] = useState({
        email: "",
        password: "",
        repeatPassword: "",
        username: "",
        // profilePictureUrl: "",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleRegistration = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);

        if (form.password !== form.repeatPassword) {
            setError("Passwords do not match");
            setIsSubmitting(false);
            return;
        }

        if (form.username === "") {
            setError("Username cannot be empty");
            setIsSubmitting(false);
            return;
        }

        try {
            const { user } = await registerUser(form.username, form.email, form.password);
            console.log(user);
            setForm({ email: "", password: "", repeatPassword: "", username: "" });
            localStorage.removeItem("registerUsername");
            localStorage.removeItem("registerEmail");
            setError("");
            navigate("/")
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
        if (name === "password" || name === "repeatPassword") {
            if (name === "password" && value === form.repeatPassword) {
                setError("");
            }
            if (name === "repeatPassword" && value === form.password) {
                setError("");
            }
        }
        if (name === "username" && value !== "") {
            setError("");
        }
    };

    const handleModalClick = (event) => {
        event.stopPropagation();
    };

    const handleResetForm = (event) => {
        event.preventDefault();

        localStorage.removeItem("registerUsername");
        localStorage.removeItem("registerEmail");
        setForm({ email: "", password: "", repeatPassword: "", username: "" });
    }

    useEffect(() => {
        userLoggedIn && setIsRegisterOpen(false)
    }, [userLoggedIn, setIsRegisterOpen]);

    useEffect(() => {
        const savedRegisterUsername = localStorage.getItem("registerUsername");
        const savedRegisterEmail = localStorage.getItem("registerEmail");

        setForm((prevForm) => ({
            ...prevForm,
            username: savedRegisterUsername || "",
            email: savedRegisterEmail || "",
        }));
    }, []);

    useEffect(() => {
        localStorage.setItem("registerUsername", form.username);
        localStorage.setItem("registerEmail", form.email);
    }, [form.username, form.email]);

    useEffect(() => {
        if (!isSubmitting) {
            setError("");
        }
    }, [isSubmitting]);

    const handleLoading = isSubmitting ? "REGISTERING..." : "REGISTER";

    return (
        <>
            <section id="registerModal" className={styles.modalBackground} onClick={() => setIsRegisterOpen(false)}>
                <form className={`${styles.modalBox} ${styles.centered}`} onSubmit={handleRegistration} onClick={handleModalClick}>
                    <div className={styles.modalHeader}>
                        <h1 className={styles.modalSlogan}>Register</h1>
                        <div className={styles.esc} onClick={() => setIsRegisterOpen(false)}>x</div>
                    </div>

                    <div className={styles.modalTextbox}>
                        <i className="fas fa-user"></i>
                        <input type="text" id="registerUsername" name="username" placeholder="Username" value={form.username} onChange={handleChange} />
                    </div>

                    <div className={styles.modalTextbox}>
                        <i className="fas fa-lock"></i>
                        <input type="password" id="registerPassword" name="password" placeholder="Password" value={form.password} onChange={handleChange} />
                    </div>

                    <div className={styles.modalTextbox}>
                        <i className="fas fa-unlock"></i>
                        <input type="password" id="registerRepeatPassword" name="repeatPassword" placeholder="Repeat Password" value={form.repeatPassword} onChange={handleChange} />
                    </div>

                    <div className={styles.modalTextbox}>
                        <i className="fas fa-envelope"></i>
                        <input type="email" id="registerEmail" name="email" placeholder="E-mail" value={form.email} onChange={handleChange} />
                    </div>

                    {/* <div className={styles.textbox">
                                <i className={styles.fas fa-envelope"></i>
                                <input id="img" name="img" placeholder="Your profile picture" value={form.profilePictureUrl} onChange={handleChange} />
                            </div> */}

                    {error && <div className={styles.errorMessage}>{error}</div>}

                    <button className={styles.modalBtn} type="submit">
                        {handleLoading}
                    </button>

                    <p className={styles.forgot} onClick={handleResetForm}>Reset</p>
                    <p className={styles.forgot}>Forgot password ?</p>
                </form >

            </section >

        </>
    );
}