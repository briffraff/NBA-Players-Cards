import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { deleteCardById } from "../../service/firebase/firestore/firestore-service";

import { useCards } from "../../contexts/cardsContext";

import styles from "../../../public/assets/scss/modules/_Modal.module.scss"

export default function DeleteCardConfirmation({ setShowDeleteCardConfirm }) {
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();
    const { cardId } = useParams();
    const { updateTotalCardsCount, refreshCards } = useCards();

    const handleDeleteCard = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);

        try {
            await deleteCardById(cardId);

            await refreshCards();
            await updateTotalCardsCount();

            setError("")
            navigate("/cards-shop");
        } catch (error) {
            setError(error);
            console.log('Error deleting card:', error);
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleModalClick = async (event) => {
        event.stopPropagation();
    }

    const handleLoading = isSubmitting ? "DELETING..." : "DELETE";

    return (
        <>
            <section id="loginModal" className={`${styles.modalBackground}`} onClick={() => setShowDeleteCardConfirm(false)}>
                <form className={`${styles.modalBox} ${styles.centered}`} onClick={handleModalClick} onSubmit={handleDeleteCard}>
                    <div className={styles.modalHeader}>
                        <h1 className={styles.modalSlogan}>Delete Card</h1>
                        <div className={styles.esc} onClick={() => setShowDeleteCardConfirm(false)}>x</div>
                    </div>

                    <div className={styles.sure}>Are you sure ?</div>

                    {error && <div className={styles.errorMessage}>{error}</div>}

                    <button className={styles.modalBtn} type="submit">
                        {handleLoading}
                    </button>
                </form>
            </section>
        </>
    )
}
