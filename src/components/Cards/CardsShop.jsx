import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import NotFound from "../404/404";
import MiniCard from "../Cards/MiniCard";
import TeamThumbnail from "../Teams/TeamThumbnail";

import { useAuth } from "../../contexts/authContext";
import { useCards } from "../../contexts/cardsContext";

import styles from "../../../public/assets/css/modules/_CardsShop.module.scss"

export default function CardsShop() {
    const { firestoreUser } = useAuth();
    const { cards } = useCards();
   
    // useEffect(() => {
    //     const abortController = new AbortController();

    //     if (userFirestore.uid) {
    //         const fetchCardsByUser = async () => {
    //             try {
    //                 const cards = await getAllCardsByUser(userFirestore.uid, { signal: abortController.signal });
    //                 setCardsByUser(cards);

    //                 const likedTeamsIds = userFirestore.likedTeams;
    //                 const likes = await getLikedTeamsByUser(likedTeamsIds);
    //                 setLikedTeams(likes);
    //             } catch (error) {
    //                 console.log("Error fetching cards: ", error);
    //             }
    //         };

    //         fetchCardsByUser();

    //         return () => {
    //             abortController.abort();
    //         }
    //     }
    // }, [userFirestore.uid]);

    return (
        <>
            <div className={styles.userItems}>
                {cards.length > 0 ? (
                    cards.map((card) => (
                        <MiniCard key={card.id} card={card} />
                    ))
                ) : (
                    <p className={styles.noItems}>No cards found.</p>
                )}
            </div>
        </>
    )
}
