export default function Splitter() {
    const backgroundImage = 'https://firebasestorage.googleapis.com/v0/b/nba-player-cards.appspot.com/o/images%2Fcontent%2Fkosh.jpeg?alt=media&token=e0a8c1e4-961e-4af3-8749-13250cabdf87'

    return (
        <>
            <div className="mini-wall" style={{ backgroundImage: `url(${backgroundImage})` }}>
                <h2 className="transparent-text">I love this game!</h2>
            </div>
        </>
    )
}
