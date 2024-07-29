import React, { createContext, useState, useEffect, useContext } from "react";
import { getAllCards } from "../service/firebase/firestore/firestore-service";

const CardsContext = createContext();

export function useCards() {
    return useContext(CardsContext);
}

export default function CardsProvider({ children }) {
    const [cards, setCards] = useState([]);

    useEffect(() => {
        const fetchingAllCards = async () => {
            try {
                const allCards = await getAllCards();
                setCards(allCards);
            } catch (error) {
                console.error("Error fetching cards:", error);
            }
        }
        fetchingAllCards();
    }, []);

    return (
        <CardsContext.Provider value={{ cards }}>
            {children}
        </CardsContext.Provider>
    );
}
