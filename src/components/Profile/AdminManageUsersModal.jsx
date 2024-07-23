export default function AdminManageUsersModal({ setShowAdminManageUsers }) {

    const { currentUser, userLoggedIn, loading } = useAuth();
    const [password, setPassword] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleDeleteUser = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);

        try {
            await reAuthentication(userAuth, password);
            await deleteAuthUser(userAuth);
            if (userAuth.uid === userFirestore.uid) {
                await deleteFirestoreUserById(userAuth.uid);
            }
            setError("");
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

    return (
        <>
            <section id="loginModal" className={`${styles.modalBackground}`} onClick={() => setShowAdminManageUsers(false)}>
                <form className={`${styles.modalBox} ${styles.centered} ${styles.moveDeleteModal}`} onClick={handleModalClick} onSubmit={handleDeleteUser}>
                    <div className={styles.modalHeader}>
                        <h1 className={styles.modalSlogan}>Manage Users</h1>
                        <div className={styles.esc} onClick={() => setShowAdminManageUsers(false)}>x</div>
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