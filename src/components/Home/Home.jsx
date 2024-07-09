export default function Home() {

    const backgroundImage = "https://firebasestorage.googleapis.com/v0/b/nba-player-cards.appspot.com/o/images%2Fcontent%2F5ID7fg.jpg?alt=media&token=63b11dc2-3c6c-4072-b506-097b0b4a91de"

    return (
        <>
            <div className="site-wrapper">
                <section className="site-content welcome-media" style={{ backgroundImage: `url(${backgroundImage})` }}>
                    <section className="section-info-panel">
                        <div className="welcome">
                            <h1 className="welcome-title">Welcome,</h1>
                            <h1 className="welcome-title">to the World of </h1>
                            <h1 className="welcome-title">Basketball</h1>
                            <h3 className="welcome-subtitle">everything for NBA </h3>
                            <h3 className="welcome-subtitle">history, teams , player cards , shop</h3>
                        </div>
                    </section>
                </section>
            </div>
        </>
    )
}