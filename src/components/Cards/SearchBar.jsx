import { useState } from "react";
import styles from "../../../public/assets/scss/modules/_SearchBar.module.scss";
import { useCards } from "../../contexts/cardsContext";

export default function SearchBar() {
    const [searchFor, setSearchFor] = useState("");
    const [foundedCard, setFoundedCard] = useState("");
    const [error, setError] = useState(null);
    const { searchCard } = useCards();

    const handleSearch = async () => {
        try {
            const founded = await searchCard(searchFor);
            setFoundedCard(founded);
        } catch (error) {
            setError("Card not found");
        }
    };

    return (
        <section className={styles.searchBar}>
            <div className={styles.container}>
                <input
                    name="searchInput"
                    id="searchInput"
                    value={searchFor}
                    className={styles.searchInput}
                    type="text"
                    placeholder="Search for player card"
                    onChange={(e) => setSearchFor(e.target.value)}
                />
                <button onClick={handleSearch} className={styles.searchBtn}>
                    Search
                </button>
            </div>
            {error && <div className={styles.notFound}>{error}</div>}
        </section>
    );
}
