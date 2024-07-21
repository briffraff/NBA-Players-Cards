import React from 'react';
import styles from '../../../public/assets/css/modules/_MiniCard.module.scss';

export default function MiniCard({ card }) {
    return (
        <>
            <div className={styles.cardPreviewContainer}>
                <div className={styles.cardHolder}>
                    <img className={styles.cardImage} src={card.imageUrl} alt="Front" />
                    <h2 className={styles.playerName}>{card.playerName}</h2>
                </div>
            </div>
        </>
    );
}