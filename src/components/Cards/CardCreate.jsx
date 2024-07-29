import React, { useEffect, useState } from 'react';
import CardPreview from './CardPreview';
import styles from '../../../public/assets/css/modules/_CreateCard.module.scss';
import { useNavigate } from 'react-router-dom';
import { createCard } from '../../service/firebase/firestore/firestore-service';
import { useAuth } from '../../contexts/authContext';

export default function CardCreate() {
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();
    const { currentUser } = useAuth();

    const [formData, setFormData] = useState({
        playerName: "",
        description: "",
        shortInfo: "",
        price: "" 
    });

    const [image, setImage] = useState("");
    const [imageName, setImageName] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!image) {
            setError("Please select an image.");
            return;
        }

        const numericPrice = parseFloat(formData.price);
        if (isNaN(numericPrice) || numericPrice < 0) {
            setError("Please enter a valid price.");
            return;
        }

        try {
            setIsSubmitting(true);
            const numericFormData = { ...formData, price: numericPrice };

            await createCard(numericFormData, image, imageName, currentUser);
            setError("");
            navigate("/cards-shop");
            handleResetForm();
        } catch (error) {
            setError(error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setError("");
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
                setImageName(file.name);
                localStorage.setItem('cardImage', reader.result);
                localStorage.setItem('cardImageName', file.name);
            };
            reader.readAsDataURL(file);
        }
    };

    const isAnyFieldNotEmpty = (data) => {
        return Object.values(data).some(value => value !== "") || image !== "";
    };

    const handleResetForm = (event) => {
        if (event) {
            event.preventDefault();
        }

        localStorage.removeItem("cardPlayerName");
        localStorage.removeItem("cardDescription");
        localStorage.removeItem("cardShortInfo");
        localStorage.removeItem("cardImageName");
        localStorage.removeItem("cardImage");
        localStorage.removeItem("cardPrice");

        setFormData({
            playerName: "",
            description: "",
            shortInfo: "",
            price: ""
        });
        setImageName("");
        setImage("");
        setError("");
    };

    useEffect(() => {
        const savedPlayerName = localStorage.getItem("cardPlayerName");
        const savedDescription = localStorage.getItem("cardDescription");
        const savedShortInfo = localStorage.getItem("cardShortInfo");
        const savedImageName = localStorage.getItem("cardImageName");
        const savedImage = localStorage.getItem("cardImage");
        const savedPrice = localStorage.getItem("cardPrice");

        setFormData({
            playerName: savedPlayerName || "",
            description: savedDescription || "",
            shortInfo: savedShortInfo || "",
            price: savedPrice || ""
        });
        setImageName(savedImageName || "");
        setImage(savedImage || "");
    }, []);

    useEffect(() => {
        localStorage.setItem("cardPlayerName", formData.playerName);
        localStorage.setItem("cardDescription", formData.description);
        localStorage.setItem("cardShortInfo", formData.shortInfo);
        localStorage.setItem("cardPrice", formData.price);  
    }, [formData.playerName, formData.description, formData.shortInfo, formData.price]);

    useEffect(() => {
        localStorage.setItem("cardImageName", imageName);
        localStorage.setItem("cardImage", image);
    }, [imageName, image]);

    const handleCreatingMessage = isSubmitting ? "CREATING CARD..." : "CREATE CARD";

    return (
        <div className={`${isAnyFieldNotEmpty(formData) ? styles.container : styles.centeredContainer}`}>
            <form className={`${styles.modalBox} ${styles.createFieldContainer}`} onSubmit={handleSubmit}>
                <div className={styles.modalHeader}>
                    <h1 className={styles.modalSlogan}>Create Player Card</h1>
                </div>

                <div className={styles.modalTextbox}>
                    <label htmlFor="cardImageName">
                        <i className="fas fa-camera"></i>
                        <input
                            type="file"
                            id="cardImageName"
                            name="cardImageName"
                            onChange={handleImageChange}
                            accept="image/*"
                            className={styles.fileInput}
                        />
                        <span id="imageName">{imageName || "Select Image"}</span>
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
                <div className={styles.modalTextbox}>
                    <i className="fas fa-dollar"></i>
                    <input
                        type="number"
                        id="cardPrice"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        placeholder="Price"
                        required
                        min="0"
                        step="any"
                    />
                </div>

                {error && <div className={styles.errorMessage}>{error}</div>}

                <button className={styles.createBtn} type="submit">{handleCreatingMessage}</button>

                <p className={styles.forgot} onClick={handleResetForm}>Reset</p>
            </form>

            {isAnyFieldNotEmpty(formData) &&
                <CardPreview formData={formData} image={image} />
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
