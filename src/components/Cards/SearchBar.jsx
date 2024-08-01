import { useState } from "react"
import styles from "../../../public/assets/scss/modules/_SearchBar.module.scss"

export default function SearchBar() {

    const [error, setError] = useState(null);

    return (
        <>
            <section className="searchBar">
                <input className={styles.searchInput} type="text" placeholder="Search for player card" />
                <button className={styles.searchBtn}>Search</button>
                
                {error ? <div className={styles.notFound}>Card not found</div> : ""}
            </section >
        </>
    )
}