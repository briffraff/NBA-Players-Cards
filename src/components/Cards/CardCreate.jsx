import React, { useState } from 'react';
import CardPreview from './CardPreview';
import styles from '../../../public/assets/css/modules/_CreateCard.module.scss';

export default function CardCreate() {
    const [error, setError] = useState(false);

    const [formData, setFormData] = useState({
        playerName: "",
        description: "",
        shortInfo: "",
        urlFront: ""
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevForm) => ({
            ...prevForm,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    const isAnyFieldNotEmpty = (data) => {
        return Object.values(data).some(value => value !== "");
    }

    return (
        <div className={`${isAnyFieldNotEmpty(formData) ? styles.container : styles.centeredContainer}`}>
            <form className={`${styles.modalBox} ${styles.createFieldContainer}`} onSubmit={handleSubmit}>
                <div className={styles.modalHeader}>
                    <h1 className={styles.modalSlogan}>Create Player Card</h1>
                </div>

                <div className={styles.modalTextbox}>
                    <i className="fas fa-lock"></i>
                    <input type="text" name="urlFront" value={formData.urlFront} onChange={handleChange} placeholder="Front Image URL" />
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

            {isAnyFieldNotEmpty(formData) &&
                <CardPreview formData={formData} />
            }

            <div className={styles.descriptionContainer}>
                {isAnyFieldNotEmpty(formData) &&
                    <p className={styles.descriptionSlogan}>Description :</p>
                }
                <p className={styles.description}>{formData.description}</p>
            </div>
        </div>
    );
}
