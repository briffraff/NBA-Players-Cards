import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import styles from '../../../public/assets/css/modules/_MiniCard.module.scss';

export default function MiniCard({ card }) {
    const [isLoading, setIsLoading] = useState(true);
    const { profileId } = useParams();

    return (
        <>
            <div className={`${styles.cardPreviewContainer} ${styles.card}`}>
                <Link to={`/profile/${profileId}/${card.id}`} className={styles.cardHolder}>
                    {isLoading && <p>Loading image...</p>}
                    <img
                        className={`${styles.cardImage} ${isLoading ? styles.hide : styles.show}`}
                        src={card.imageUrl}
                        alt="Front"
                        onLoad={() => setIsLoading(false)}
                        onError={() => setIsLoading(false)}
                    />
                    <h2 className={styles.playerName}>{card.playerName}</h2>
                </Link>
            </div>
        </>
    );
}
