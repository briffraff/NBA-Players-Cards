import { useAuth } from "../../contexts/authContext";
import { useCards } from "../../contexts/cardsContext";
import { useDefaultImages } from "../../contexts/defaultImagesContext"

import MiniCard from "../Cards/MiniCard";

import styles from "../../../public/assets/scss/modules/_CardsShop.module.scss"

export default function CardsShop() {
    const defaultImages = useDefaultImages();
    const backgroundImage = defaultImages[6];
    const { firestoreUser } = useAuth();
    const { cards } = useCards();

    return (
        <>
            <section className={styles.siteMedia} style={{ backgroundImage: `url(${backgroundImage})` }}>
                <section className={styles.sectionInfoPanel}>
                    <h1 className={styles.infoSlogan}>Cards shop</h1>
                    <h3 className={styles.infoSubslogan}>NBA Player cards </h3>
                </section>
            </section>

            <div className={styles.cardContainer}>
                <div className={styles.items}>
                    {cards.length > 0 ? (
                        cards.map((card) => (
                            <MiniCard key={card.id} card={card} />
                        ))
                    ) : (
                        <p className={styles.noItems}>No cards found.</p>
                    )}
                </div>
            </div>
        </>
    )
}
