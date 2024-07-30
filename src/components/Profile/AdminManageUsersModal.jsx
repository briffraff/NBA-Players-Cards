import { useEffect, useState } from "react";
import { getAllFirestoreUsers, updateFirestoreUserRole } from "../../service/firebase/firestore/firestore-service";
import { useAuth } from "../../contexts/authContext";
import styles from "../../../public/assets/scss/modules/_ManageUsersModal.module.scss";

export default function AdminManageUsersModal({ setShowAdminManageUsers }) {

    const { currentUser, userLoggedIn, loading } = useAuth();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const [allUsers, setAllUsers] = useState([]);

    useEffect(() => {
        const fetchAllUsers = async () => {
            try {
                const firestoreUsers = await getAllFirestoreUsers();
                const excludeCurrentUserList = firestoreUsers.filter((user) => user.username != currentUser.displayName && user.username.toLowerCase() != "admin");
                setAllUsers(excludeCurrentUserList);
                setError("");
            } catch (error) {
                setError(error.message);
                console.log("Problem Loading users", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAllUsers();
    }, []);

    const handleModalClick = (event) => {
        event.stopPropagation();
    };

    const handleRoleChange = async (userId, isAdmin) => {
        try {
            await updateFirestoreUserRole(userId, !isAdmin);
            setAllUsers((prevUsers) =>
                prevUsers.map((user) =>
                    user.id === userId ? { ...user, admin: !isAdmin } : user
                )
            );
        } catch (error) {
            setError(error.message);
            console.log("Problem changing role:", error);
        }
    };

    return (
        <>
            <section id="manageUsersModal" className={`${styles.modalBackground} ${styles.modalStretch}`} onClick={() => setShowAdminManageUsers(false)}>
                <form className={`${styles.modalBox} ${styles.centered}`} onClick={handleModalClick}>
                    <div className={styles.modalHeader}>
                        <h1 className={styles.modalSlogan}>Manage Users</h1>
                        <div className={styles.esc} onClick={() => setShowAdminManageUsers(false)}>x</div>
                    </div>
                    <div className={styles.titles}>
                        <div>Username : </div>
                        <div>Email : </div>
                        <div>Role : </div>
                    </div>
                    {isLoading
                        ? (
                            <p className={styles.loading}>Loading...</p>)
                        : (
                            <>
                                {allUsers.length > 0 ? (
                                    allUsers.map((user) => (
                                        <div key={user.id} className={styles.modalTextbox}>
                                            <span>{`${user.username}`}</span>
                                            <span>{`${user.email}`}</span>
                                            <span>
                                                <button
                                                    type="button"
                                                    className={styles.roleButton}
                                                    onClick={() => handleRoleChange(user.id, user.admin)}
                                                >
                                                    {user.admin ? "Admin" : "User"}
                                                </button>
                                            </span>
                                        </div>
                                    ))
                                ) : (
                                    <p className={styles.noUsers}>No users found.</p>
                                )}
                            </>
                        )}

                    {error && <div className={styles.errorMessage}>{error}</div>}

                </form>
            </section>
        </>
    );
}
