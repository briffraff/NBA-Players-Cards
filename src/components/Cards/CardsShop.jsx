import { useEffect } from "react";
import { useAuth } from "../../contexts/authContext";
import { useCards } from "../../contexts/cardsContext";
import { useDefaultImages } from "../../contexts/defaultImagesContext";
import MiniCard from "../Cards/MiniCard";

import styles from "../../../public/assets/scss/modules/_CardsShop.module.scss";

export default function CardsShop() {
    const defaultImages = useDefaultImages();
    const backgroundImage = defaultImages[6];
    const { firestoreUser } = useAuth();
    const { cards, loadMoreCards, loading, loadAll, totalCardsCount, currentCardsCount, refreshCards } = useCards();

    const remainingCardsCount = totalCardsCount - currentCardsCount;

    useEffect(() => {
        refreshCards();
    }, []);

    return (
        <>
            <section className={styles.siteMedia} style={{ backgroundImage: `url(${backgroundImage})` }}>
                <section className={styles.sectionInfoPanel}>
                    <h1 className={styles.infoSlogan}>Cards shop</h1>
                    <h3 className={styles.infoSubslogan}>NBA Player cards</h3>
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

                {cards.length > 0 &&
                    <>
                        <div className={styles.loadBtns}>
                            <button
                                onClick={loadMoreCards}
                                disabled={loading || remainingCardsCount <= 0}
                                className={styles.loadMore}>
                                {`Load more (${Math.min(3, remainingCardsCount)})`}
                            </button>
                            <button
                                onClick={loadAll}
                                disabled={loading || remainingCardsCount <= 0}
                                className={styles.loadMore}>
                                {`Show all (${remainingCardsCount})`}
                            </button>
                        </div>
                    </>
                }
            </div>
        </>
    );
}
