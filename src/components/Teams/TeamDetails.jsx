import { useEffect, useState } from "react"
import { db } from "../../service/firebase/firebase";
import { getDocs, collection } from "firebase/firestore";

export default function Team() {
    const [teams, setTeams] = useState([]);

    const teamsCollectionRef = collection(db, "nba-teams");

    useEffect(() => {
        const getTeamsList = async () => {
            try {
                const data = await getDocs(teamsCollectionRef)
                const filteredData = data.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id
                }))
                setTeams(filteredData);
            } catch (error) {
                console.log(error)
            }
        }
        getTeamsList();
    }, []);

    return (
        teams.map((team) => (
            <>
                <div className="site-wrapper">
                    <section className="site-media" style={{ backgroundImage: `url(${team.logo})` }}>
                        <section className="section-info-panel">
                            <h1 className="team-title">{team.name}</h1>
                            <div className="mini-wall team-name">
                                <h3 className="location">Location : {team.location}</h3>
                            </div>
                        </section>
                    </section>

                    <div className="site-content">
                        <div className="single-team-container">
                            <div className="team-logo">
                                <img src={team.logo} alt={team.name} />
                            </div>
                            <article>
                                <div className="about-text team-info">{team.info}</div>
                            </article>
                        </div>
                    </div>
                </div>
            </>
        ))
    )
}