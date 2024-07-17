import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../../public/assets/css/modules/Modal.module.css"

import { reAuthentication, deleteAuthUser } from "../../service/firebase/authentication/auth-service";
import { useAuth } from "../../contexts/authContext";

export default function DeleteUserConfirmation({ setShowDeleteConfirm, user }) {

    const { currentUser, userLoggedIn, loading } = useAuth();
    const [password, setPassword] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleDeleteUser = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);

        try {
            await reAuthentication(user, password);
            await deleteAuthUser(user);
            setError("");
            navigate('/logout');
        } catch (error) {
            setError(error.message);
            console.log('Error deleting user:', error);
        } finally {
            setIsSubmitting(false);
        }
    }

    const handleModalClick = (event) => {
        event.stopPropagation();
    };

    useEffect(() => {
        userLoggedIn && setShowDeleteConfirm(true)
    }, [userLoggedIn, setShowDeleteConfirm]);

    const handleLoading = isSubmitting ? "DELETING..." : "DELETE";

    return (
        <>
            <section id="loginModal" className={`${styles.modalBackground}`} onClick={() => setShowDeleteConfirm(false)}>
                <form className={`${styles.modalBox} ${styles.centered}`} onClick={handleModalClick} onSubmit={handleDeleteUser}>
                    <div className={styles.modalHeader}>
                        <h1 className={styles.modalSlogan}>Delete Account</h1>
                        <div className={styles.esc} onClick={() => setShowDeleteConfirm(false)}>x</div>
                    </div>
                    <p>Please enter your password to confirm deletion:</p>
                    <div className={styles.modalTextbox}>
                        <i className="fas fa-lock"></i>
                        <input type="password" id="deleteConfirmPassword" name="deleteConfirmPassword" placeholder="Enter your password" value={password} onChange={(event) => setPassword(event.target.value)} />
                    </div>

                    {error && <div className={styles.errorMessage}>{error}</div>}

                    <button className={styles.modalBtn} type="submit">
                        {handleLoading}
                    </button>
                </form>
            </section>
        </>
    )
}