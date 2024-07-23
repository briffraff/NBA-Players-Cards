import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/authContext";
import styles from "../../../public/assets/css/modules/_Modal.module.scss"


export default function AdminManageUsersModal({ setShowAdminManageUsers }) {

    const { currentUser, userLoggedIn, loading } = useAuth();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [allUsers, setAllUsers] = useState();

    const handleAllUsers = () => {
        try {

        } catch (error) {
            setError(error);
            console.log("Problem Loading users")
        }
    }

    const handleModalClick = (event) => {
        event.stopPropagation();
    };


    return (
        <>
            <section id="manageUsersModal" className={`${styles.modalBackground}`} onClick={() => setShowAdminManageUsers(false)}>
                <form className={`${styles.modalBox} ${styles.centered}`} onClick={handleModalClick} >
                    <div className={styles.modalHeader}>
                        <h1 className={styles.modalSlogan}>Manage Users</h1>
                        <div className={styles.esc} onClick={() => setShowAdminManageUsers(false)}>x</div>
                    </div>

                    <div className={styles.modalTextbox}>

                    </div>

                    {error && <div className={styles.errorMessage}>{error}</div>}

                </form>
            </section>
        </>
    )
}