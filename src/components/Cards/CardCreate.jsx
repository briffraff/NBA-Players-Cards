import React, { useState } from 'react';
import CardPreview from './CardPreview';
import styles from '../../../public/assets/css/modules/_CreateCard.module.scss';

export default function CardCreate() {
    const [error, setError] = useState(false);

    const [formData, setFormData] = useState({
        playerName: '',
        description: '',
        shortInfo: '',
        stats: {
            passes: 0,
            matchCount: 0
        },
        urls: {
            Front: '',
            Back: ''
        }
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.includes('stats')) {
            const [_, statName] = name.split('.');
            setFormData((prevState) => ({
                ...prevState,
                stats: {
                    ...prevState.stats,
                    [statName]: value
                }
            }));
        } else if (name.includes('urls')) {
            const [_, urlType] = name.split('.');
            setFormData((prevState) => ({
                ...prevState,
                urls: {
                    ...prevState.urls,
                    [urlType]: value
                }
            }));
        } else {
            setFormData((prevState) => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <div className={styles.container}>
            <form className={`${styles.modalBox} ${styles.createFieldContainer}`} onSubmit={handleSubmit}>
                <div className={styles.modalHeader}>
                    <h1 className={styles.modalSlogan}>Create Player Card</h1>
                </div>

                <div className={styles.modalTextbox}>
                    <i className="fas fa-lock"></i>
                    <input type="text" name="urls.Front" value={formData.urls.Front} onChange={handleChange} placeholder="Front Image URL" />
                </div>
                <div className={styles.modalTextbox}>
                    <i className="fas fa-user"></i>
                    <input type="text" name="playerName" value={formData.playerName} onChange={handleChange} placeholder="Player Name" />
                </div>
                <div className={styles.modalTextbox}>
                    <i className="fas fa-lock"></i>
                    <input type="text" name="description" value={formData.description} onChange={handleChange} placeholder="Description" />
                </div>
                <div className={styles.modalTextbox}>
                    <i className="fas fa-lock"></i>
                    <input type="text" name="shortInfo" value={formData.shortInfo} onChange={handleChange} placeholder="Short info" />
                </div>

                {error && <div className={styles.errorMessage}>{error}</div>}

                <button className={styles.createBtn} type="submit">
                    Create Card
                </button>
            </form>

            <CardPreview formData={formData} />

            <div className={styles.descriptionContainer}>
                <p className={styles.description}>{formData.description}</p>
            </div>
        </div>
    );
}
