import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useCards } from "../../contexts/cardsContext";
import styles from "../../../public/assets/scss/modules/_SearchBar.module.scss";

export default function SearchBar() {
    const [searchFor, setSearchFor] = useState("");
    const { searchCard, foundedCard, eraseFoundedCards } = useCards();
    const [error, setError] = useState("");

    const location = useLocation();
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search);
    const searchValue = searchParams.get("search");

    useEffect(() => {

        if (searchValue) {
            setSearchFor(searchValue);
            searchCard(searchValue).catch(err => setError("Cannot find a card with that name."));
        } else {
            setSearchFor("");
            eraseFoundedCards();
        }
    }, [searchValue]);

    const handleSearch = async () => {
        try {
            if (searchFor === "") {
                setError("");
                return;
            }
            setError("");
            await searchCard(searchFor);
            navigate(`${location.pathname}?search=${searchFor}`);
        } catch (error) {
            setError("Cannot find a card with that name.");
        }
    };

    const handleChange = (event) => {
        const value = event.target.value;
        setSearchFor(value);

        if (value === "") {
            setError("");
            eraseFoundedCards();
        }
    };

    const handleCancelSearch = async () => {
        searchParams.delete("search");
        navigate({
            pathname: location.pathname,
            search: searchParams.toString(),
        });
        await eraseFoundedCards();
    };

    useEffect(() => {
        if (searchFor === "" && location.search === "") {
            eraseFoundedCards();
        }
    }, [location.pathname]);

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
