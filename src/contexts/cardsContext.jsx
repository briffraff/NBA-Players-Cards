import React, { createContext, useState, useEffect, useContext } from "react";
import { loadCards, getAllRemainCards, loadMore, getTotalCardsCount, getCardByPlayerName } from "../service/firebase/firestore/firestore-service";
const CardsContext = createContext();

export function useCards() {
    return useContext(CardsContext);
}

export default function CardsProvider({ children }) {
    const [cards, setCards] = useState([]);
    const [lastVisible, setLastVisible] = useState(null);
    const [loading, setLoading] = useState(false);
    const [totalCardsCount, setTotalCardsCount] = useState(0);
    const [currentCardsCount, setCurrentCardsCount] = useState(0);
    const [foundedCard, setFoundedCard] = useState([]);

    useEffect(() => {
        const fetchTotalCardsCount = async () => {
            try {
                const totalCount = await getTotalCardsCount();
                setTotalCardsCount(totalCount);
            } catch (error) {
                console.error("Error fetching total cards count:", error);
            }
        };

        fetchTotalCardsCount();
    }, []);

    useEffect(() => {
        const loadInitialCards = async () => {
            setLoading(true);
            try {
                const { cardsList, last } = await loadCards();
                setCards(cardsList);
                setLastVisible(last);
                setLoading(false);
                setCurrentCardsCount(cardsList.length);
            } catch (error) {
                console.error("Error fetching initial cards:", error);
                setLoading(false);
            }
        };

        loadInitialCards();
    }, []);

    const loadMoreCards = async () => {
        if (loading || !lastVisible) return;

        setLoading(true);

        try {
            const { moreCards, last } = await loadMore(lastVisible);
            setCards((prevCards) => [...prevCards, ...moreCards]);
            setLastVisible(last);
            setLoading(false);
            setCurrentCardsCount((prevCount) => prevCount + moreCards.length);
        } catch (error) {
            console.error("Error fetching more cards:", error);
            setLoading(false);
        }
    };

    const loadAll = async () => {
        if (loading || !lastVisible) return;

        setLoading(true);

        try {
            const { allRemainingCards } = await getAllRemainCards(lastVisible);
            setCards((prevCards) => [...prevCards, ...allRemainingCards]);
            setLoading(false);
            setCurrentCardsCount((prevCount) => prevCount + allRemainingCards.length);
        } catch (error) {
            console.error("Error fetching all cards:", error);
            setLoading(false);
        }
    };

    const searchCard = async (searchForPlayer) => {
        setLoading(true);

        try {
            // if (searchForPlayer != "") {
            const result = await getCardByPlayerName(searchForPlayer);
            if (result.length == 0) {
                throw new Error("Error: ")
            }
            setFoundedCard(result);
            setLoading(false);
            // }
        } catch (error) {
            setFoundedCard([]);
            setLoading(false);
            throw error;
        }
    };

    const eraseFoundedCards = async () => {
        setFoundedCard([]);
    }

    const refreshCards = async () => {
        setLoading(true);
        try {
            const { cardsList, last } = await loadCards();
            setCards(cardsList);
            setLastVisible(last);
            setCurrentCardsCount(cardsList.length);
            setLoading(false);
        } catch (error) {
            console.error("Error refreshing cards:", error);
            setLoading(false);
        }
    };

    const updateTotalCardsCount = async () => {
        try {
            const totalCount = await getTotalCardsCount();
            setTotalCardsCount(totalCount);
        } catch (error) {
            console.error("Error updating total cards count:", error);
        }
    };

    return (
        <CardsContext.Provider value={{
            cards,
            foundedCard,
            loadMoreCards,
            loadAll,
            loading,
            totalCardsCount,
            currentCardsCount,
            searchCard,
            updateTotalCardsCount,
            refreshCards,
            eraseFoundedCards
        }}>
            {children}
        </CardsContext.Provider>
    );
}

