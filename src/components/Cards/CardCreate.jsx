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
        urlFront: "",
        imageName: ""
    });

    const [image, setImage] = useState();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevForm) => ({
            ...prevForm,
            [name]: value,
        }));
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
                setFormData((prevForm) => ({
                    ...prevForm,
                    urlFront: reader.result,
                    imageName: file.name
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            
            setError("");
            navigate("/cards-shop");
        } catch (error) {
            setError(error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    const isAnyFieldNotEmpty = (data) => {
        return Object.values(data).some(value => value !== "") || data.urlFront !== "";
    }

    const handleResetForm = (event) => {
        event.preventDefault();

        localStorage.removeItem("cardImage");
        localStorage.removeItem("cardImageName");
        localStorage.removeItem("cardPlayerName");
        localStorage.removeItem("cardDescription");
        localStorage.removeItem("cardShortInfo");
        setFormData({
            playerName: "",
            description: "",
            shortInfo: "",
            urlFront: "",
            imageName: ""
        });
    }

    useEffect(() => {
        const savedUrlImage = localStorage.getItem("cardImage");
        const savedImageName = localStorage.getItem("cardImageName");
        const savedPlayerName = localStorage.getItem("cardPlayerName");
        const savedDescription = localStorage.getItem("cardDescription");
        const savedShortInfo = localStorage.getItem("cardShortInfo");

        setFormData({
            playerName: savedPlayerName || "",
            description: savedDescription || "",
            shortInfo: savedShortInfo || "",
            urlFront: savedUrlImage || "",
            imageName: savedImageName || ""
        });
    }, []);

    useEffect(() => {
        localStorage.setItem("cardPlayerName", formData.playerName);
        localStorage.setItem("cardDescription", formData.description);
        localStorage.setItem("cardShortInfo", formData.shortInfo);
        localStorage.setItem("cardImage", formData.urlFront);
        localStorage.setItem("cardImageName", formData.imageName);
    }, [
        formData.urlFront,
        formData.imageName,
        formData.playerName,
        formData.description,
        formData.shortInfo
    ]);

    useEffect(() => {
        if (!isSubmitting) {
            setError("");
        }
    }, [isSubmitting]);

    const handleCreatingMessage = isSubmitting ? "CREATING CARD..." : "CREATE CARD";

    return (
        <div className={`${isAnyFieldNotEmpty(formData) ? styles.container : styles.centeredContainer}`}>
            <form className={`${styles.modalBox} ${styles.createFieldContainer}`} onSubmit={handleSubmit}>
                <div className={styles.modalHeader}>
                    <h1 className={styles.modalSlogan}>Create Player Card</h1>
                </div>

                <div className={styles.modalTextbox}>
                    <label htmlFor="cardImage">
                        <i className="fas fa-camera"></i>
                        <input
                            type="file"
                            id="cardImage"
                            name="urlFront"
                            onChange={handleImageChange}
                            accept="image/*"
                            className={styles.fileInput}
                            required />
                        <span id="imageName">{formData.imageName || "Select Image"}</span>
                    </label>
                </div>

                <div className={styles.modalTextbox}>
                    <i className="fas fa-user"></i>
                    <input type="text" id="cardPlayerName" name="playerName" value={formData.playerName} onChange={handleChange} placeholder="Player Name" required />
                </div>
                <div className={styles.modalTextbox}>
                    <i className="fas fa-file-alt"></i>
                    <textarea
                        id="cardDescription"
                        maxLength={1200}
                        rows={5}
                        cols={30}
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Description"
                        aria-label="Card Description"
                        required
                    />
                </div>
                <div className={styles.modalTextbox}>
                    <i className="fas fa-info-circle"></i>
                    <input type="text" id="cardShortInfo" name="shortInfo" value={formData.shortInfo} onChange={handleChange} placeholder="Short info" required />
                </div>

                {error && <div className={styles.errorMessage}>{error}</div>}

                <button className={styles.createBtn} type="submit">{handleCreatingMessage}</button>

                <p className={styles.forgot} onClick={handleResetForm}>Reset</p>
            </form>

            {isAnyFieldNotEmpty(formData) &&
                <CardPreview formData={formData} image={formData.urlFront} />
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
