import React, { useEffect, useState } from 'react';
import CardPreview from './CardPreview';
import styles from '../../../public/assets/css/modules/_CreateCard.module.scss';
import { useNavigate } from 'react-router-dom';

export default function CardCreate() {
    const [error, setError] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

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
        setIsSubmitting(true);

        try {
            console.log(formData.playerName);
            setError("");
            navigate("/cards-shop");
        } catch (error) {
            setError(error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    const isAnyFieldNotEmpty = (data) => {
        return Object.values(data).some(value => value !== "");
    }

    const handleResetForm = (event) => {
        event.preventDefault();

        localStorage.removeItem("cardImage");
        localStorage.removeItem("cardPlayerName");
        localStorage.removeItem("cardDescription");
        localStorage.removeItem("cardShortInfo");
        setFormData({ playerName: "", description: "", shortInfo: "", urlFront: "" });
    }

    useEffect(() => {
        const savedUrlImage = localStorage.getItem("cardImage");
        const savedPlayerName = localStorage.getItem("cardPlayerName");
        const savedDescription = localStorage.getItem("cardDescription");
        const savedShortInfo = localStorage.getItem("cardShortInfo");

        setFormData((prevForm) => ({
            ...prevForm,
            urlFront: savedUrlImage,
            playerName: savedPlayerName,
            description: savedDescription,
            shortInfo: savedShortInfo
        }))

    }, []);

    useEffect(() => {
        localStorage.setItem("cardImage", formData.urlFront);
        localStorage.setItem("cardPlayerName", formData.playerName);
        localStorage.setItem("cardDescription", formData.description);
        localStorage.setItem("cardShortInfo", formData.shortInfo);
    }, [formData.urlFront, formData.playerName, formData.description, formData.shortInfo]);

    useEffect(() => {
        if (!isSubmitting) {
            setError("");
        }
    }, [isSubmitting]);

    const handleCreateMessage = isSubmitting == true ? "CREATING CARD..." : "CREATE CARD";

    return (
        <div className={`${isAnyFieldNotEmpty(formData) ? styles.container : styles.centeredContainer}`}>
            <form className={`${styles.modalBox} ${styles.createFieldContainer}`} onSubmit={handleSubmit}>
                <div className={styles.modalHeader}>
                    <h1 className={styles.modalSlogan}>Create Player Card</h1>
                </div>

                <div className={styles.modalTextbox}>
                    <i className="fas fa-image"></i>
                    <input type="text" id="cardImage" name="urlFront" value={formData.urlFront} onChange={handleChange} placeholder="Front Image URL" />
                </div>
                <div className={styles.modalTextbox}>
                    <i className="fas fa-user"></i>
                    <input type="text" id="cardPlayerName" name="playerName" value={formData.playerName} onChange={handleChange} placeholder="Player Name" />
                </div>
                <div className={styles.modalTextbox}>
                    <i className="fas fa-file-alt"></i>
                    <input type="text" id="cardDescription" name="description" value={formData.description} onChange={handleChange} placeholder="Description" />
                </div>
                <div className={styles.modalTextbox}>
                    <i className="fas fa-info-circle"></i>
                    <input type="text" id="cardShortInfo" name="shortInfo" value={formData.shortInfo} onChange={handleChange} placeholder="Short info" />
                </div>

                {error && <div className={styles.errorMessage}>{error}</div>}

                <button className={styles.createBtn} type="submit">{handleCreateMessage}
                </button>

                <p className={styles.forgot} onClick={handleResetForm}>Reset</p>
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
