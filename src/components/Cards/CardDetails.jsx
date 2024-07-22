import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../contexts/authContext';
import NotFound from "../404/404";
import { getCardById } from '../../service/firebase/firestore/firestore-service';

import styles from "../../../public/assets/css/modules/_CardDetails.module.scss"

export default function CardDetails() {
    const [card, setCard] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const { cardId } = useParams();
    const { currentUser } = useAuth();

    useEffect(() => {
        const fetchCardById = async () => {
            try {
                const cardData = await getCardById(cardId);
                setCard(cardData);
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCardById();
    }, [cardId]);

    return (
        isLoading
            ? (<p className={styles.loading}>Loading...</p>)
            : (
                <div className={styles.centeredContainer}>
                    <div className={styles.slogan}>Card details</div>
                    <div className={styles.detailsContent}>
                        <div className={styles.cardPreviewContainer}>
                            <div className={styles.cardHolder}>
                                <img className={styles.cardImage} src={card.imageUrl} alt="Front" />
                                <h2 className={styles.playerName}>{card.playerName}</h2>
                                <p className={styles.shortInfo}>{card.shortInfo}</p>
                            </div>

                            <div className={styles.buttonContainer}>
                                <button className={styles.editButton}>Edit</button>
                                <button className={styles.deleteButton}>Delete</button>
                            </div>
                        </div>

                        <div className={styles.descriptionContainer}>
                            <p className={styles.descriptionSlogan}>Description :</p>
                            <p className={styles.description}>{card.description}</p>
                        </div>
                    </div>

                </div>
            )
    );
}
