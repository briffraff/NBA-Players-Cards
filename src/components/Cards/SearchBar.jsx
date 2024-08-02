import { useState, useEffect } from "react";
import { useCards } from "../../contexts/cardsContext";
import styles from "../../../public/assets/scss/modules/_SearchBar.module.scss";

export default function SearchBar() {
    const [searchFor, setSearchFor] = useState("");
    const { searchCard, foundedCard, eraseFoundedCards } = useCards();
    const [error, setError] = useState("");

    useEffect(() => {
        const savedSearch = localStorage.getItem('currentSearch');

        if (savedSearch) {
            setSearchFor(savedSearch);
        }
    }, []);

    const handleSearch = async () => {
        try {
            if (searchFor == "") {
                localStorage.removeItem('currentSearch');
                setError("");
            }
            setError("");
            await searchCard(searchFor);
            localStorage.setItem('currentSearch', searchFor);
        } catch (error) {
            setError("Cannot find a card with that name.");
        }
    };

    const handleChange = (event) => {
        const value = event.target.value;
        setSearchFor(value);

        if (value === "") {
            setError("");
        }
    };

    const handleCancelSearch = async () => {
        setSearchFor("");
        localStorage.removeItem('currentSearch');
        await eraseFoundedCards();
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

                {foundedCard.length > 0 && (
                    <button
                        className={styles.cancelSearch}
                        onClick={handleCancelSearch}
                    >
                        x
                    </button>
                )}
            </div>
            {error && <div className={styles.notFound}>{error}</div>}
        </section>
    );
}
