import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { updateCard, getCardById } from '../../service/firebase/firestore/firestore-service';

import { useAuth } from '../../contexts/authContext';

import CardPreview from './CardPreview';
import NotFound from '../404/404';

import styles from '../../../public/assets/scss/modules/_CreateCard.module.scss';

export default function CardEdit() {
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const { currentUser } = useAuth();
    const { cardId } = useParams();
    const [card, setCard] = useState(null);
    const [image, setImage] = useState("");
    const [imageName, setImageName] = useState("");
    const [formData, setFormData] = useState({
        playerName: "",
        description: "",
        shortInfo: ""
    });

    useEffect(() => {
        const fetchCardById = async () => {
            try {
                const cardData = await getCardById(cardId);
                if (cardData) {
                    setCard(cardData);
                    setFormData({
                        playerName: cardData.playerName || "",
                        description: cardData.description || "",
                        shortInfo: cardData.shortInfo || ""
                    });
                    setImage(cardData.imageUrl || "");
                    setImageName(cardData.imageName || "");
                }
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCardById();
    }, [cardId]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!image) {
            setError("Please select an image.");
            return;
        }

        try {
            setIsSubmitting(true);
            await updateCard(card.imageHash, cardId, card.imageUrl, formData, image, imageName);
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
                localStorage.setItem('editCardImage', reader.result);
                localStorage.setItem('editCardImageName', file.name);
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

        localStorage.removeItem("editCardPlayerName");
        localStorage.removeItem("editCardDescription");
        localStorage.removeItem("editCardShortInfo");
        localStorage.removeItem("editCardImageName");
        localStorage.removeItem("editCardImage");

        setFormData({
            playerName: "",
            description: "",
            shortInfo: ""
        });
        setImageName("");
        setImage("");
        setError("");
    };

    useEffect(() => {
        const savedPlayerName = localStorage.getItem("editCardPlayerName");
        const savedDescription = localStorage.getItem("editCardDescription");
        const savedShortInfo = localStorage.getItem("editCardShortInfo");
        const savedImageName = localStorage.getItem("editCardImageName");
        const savedImage = localStorage.getItem("editCardImage");

        setFormData({
            playerName: savedPlayerName || "",
            description: savedDescription || "",
            shortInfo: savedShortInfo || ""
        });
        setImageName(savedImageName || "");
        setImage(savedImage || "");
    }, []);

    useEffect(() => {
        localStorage.setItem("editCardPlayerName", formData.playerName);
        localStorage.setItem("editCardDescription", formData.description);
        localStorage.setItem("editCardShortInfo", formData.shortInfo);
    }, [formData.playerName, formData.description, formData.shortInfo]);

    useEffect(() => {
        localStorage.setItem("editCardImageName", imageName);
        localStorage.setItem("editCardImage", image);
    }, [imageName, image]);

    const handleUpdateMessage = isSubmitting ? "UPDATING CARD..." : "UPDATE CARD";

    if (isLoading) {
        return <div className={styles.loading}>Loading...</div>;
    }

    return (
        currentUser.uid === card.cardUserId
            ? (
                <div className={`${isAnyFieldNotEmpty(formData) ? styles.container : styles.centeredContainer}`}>
                    <form className={`${styles.modalBox} ${styles.createFieldContainer}`} onSubmit={handleSubmit}>
                        <div className={styles.modalHeader}>
                            <h1 className={styles.modalSlogan}>Update Player Card</h1>
                        </div>

                        <div className={styles.modalTextbox}>
                            <label htmlFor="editCardImageName">
                                <i className="fas fa-camera"></i>
                                <input
                                    type="file"
                                    id="editCardImageName"
                                    name="editCardImageName"
                                    onChange={handleImageChange}
                                    accept="image/*"
                                    className={styles.fileInput}
                                />
                                <span id="imageName">{imageName || "Select Image"}</span>
                            </label>
                        </div>

                        <div className={styles.modalTextbox}>
                            <i className="fas fa-user"></i>
                            <input type="text" id="editCardPlayerName" name="playerName" value={formData.playerName} onChange={handleChange} placeholder="Player Name" required />
                        </div>
                        <div className={styles.modalTextbox}>
                            <i className="fas fa-file-alt"></i>
                            <textarea
                                id="editCardDescription"
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
                            <input type="text" id="editCardShortInfo" name="shortInfo" value={formData.shortInfo} onChange={handleChange} placeholder="Short info" required />
                        </div>

                        {error && <div className={styles.errorMessage}>{error}</div>}

                        <button className={styles.createBtn} type="submit">{handleUpdateMessage}</button>

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
                </div>)
            : (<NotFound />)
    );
}
