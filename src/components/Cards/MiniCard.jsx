import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import styles from '../../../public/assets/scss/modules/_MiniCard.module.scss';

export default function MiniCard({ card }) {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <>
            <div className={`${styles.cardPreviewContainer} ${styles.card}`}>
                <div className={styles.cardHolder}>
                    {isLoading && <p>Loading image...</p>}
                    <img
                        className={`${styles.cardImage} ${isLoading ? styles.hide : styles.show}`}
                        src={card.imageUrl}
                        alt="Front"
                        onLoad={() => setIsLoading(false)}
                        onError={() => setIsLoading(false)}
                    />
                    <h2 className={styles.playerName}>{card.playerName}</h2>
                </div>
                <div className={styles.buttonContainer}>
                    <Link to={`/cards-shop/${card.id}`} className={styles.detailsButton}>Details</Link>
                </div>
            </div>
        </>
    );
}
