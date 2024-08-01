import { useState } from "react";
import { useCards } from "../../contexts/cardsContext";
import styles from "../../../public/assets/scss/modules/_SearchBar.module.scss";

export default function SearchBar() {
    const [searchFor, setSearchFor] = useState("");
    const { searchCard } = useCards();
    const [error, setError] = useState("");

    const handleSearch = async () => {
        try {
            setError("");
            await searchCard(searchFor);
        } catch (error) {
            setError("Cannot find a card with that name.");
        }
    };

    const handleChange = (event) => {
        const value = event.target.value;
        setSearchFor(value);

        if (value == "") {
            setError("");
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
                    onChange={handleChange}
                />
                <button onClick={handleSearch} className={styles.searchBtn}>
                    Search
                </button>
            </div>
            {error && <div className={styles.notFound}>{error}</div>}
        </section>
    );
}
