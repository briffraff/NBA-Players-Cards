import React, { createContext, useState, useEffect, useContext } from "react";
import { loadCards, getAllCards, loadMore } from "../service/firebase/firestore/firestore-service";
const CardsContext = createContext();

export function useCards() {
    return useContext(CardsContext);
}

// export default function CardsProvider({ children }) {
//     const [cards, setCards] = useState([]);

//     useEffect(() => {
//         const fetchingAllCards = async () => {
//             try {
//                 const allCards = await getAllCards();
//                 setCards(allCards);
//             } catch (error) {
//                 console.error("Error fetching cards:", error);
//             }
//         }
//         fetchingAllCards();
//     }, []);

//     return (
//         <CardsContext.Provider value={{ cards }}>
//             {children}
//         </CardsContext.Provider>
//     );
// }

export default function CardsProvider({ children }) {
    const [cards, setCards] = useState([]);
    const [lastVisible, setLastVisible] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const loadInitCards = async () => {
            try {
                const { cardsList, last } = await loadCards();
                setCards(cardsList);
                setLastVisible(last);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching cards:", error);
            }
        }
        loadInitCards();
    }, []);

    const loadMoreCards = async () => {
        if (loading || !lastVisible) return;

        setLoading(true);

        try {
            const { moreCards, last } = await loadMore(lastVisible);
            setCards((prevCards) => [...prevCards, ...moreCards]);
            setLastVisible(last);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching more cards:", error);
            setLoading(false);
        }
    };

    return (
        <CardsContext.Provider value={{ cards, loadMoreCards, loading }}>
            {children}
        </CardsContext.Provider>
    );
}

