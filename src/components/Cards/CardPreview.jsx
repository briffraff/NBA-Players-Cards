import React from 'react';
import styles from '../../../public/assets/css/modules/_CreateCard.module.scss';

export default function CardPreview({ formData, image }) {
    return (
        <div className={styles.cardPreviewContainer}>
            <div className={styles.cardHolder}>
                <img className={styles.cardImage} src={image} alt="Front" />
                <h2 className={styles.playerName}>{formData.playerName}</h2>
                <p className={styles.shortInfo}>{formData.shortInfo}</p>
            </div>
        </div>
    );
}
