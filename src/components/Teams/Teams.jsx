import { useEffect, useState } from "react"
import { db } from "../../service/firebase/firebase";
import { getDocs, collection } from "firebase/firestore";
import { Link } from "react-router-dom";

export default function Teams() {
    const divisions = [
        "Atlantic Division",
        "Central Division",
        "Northwest Division",
        "Pacific Division",
        "Southeast Division",
        "Southwest Division"
    ];

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
        <>
            <main className="site-content">
                <div className="site-wrapper">
                    <div className="mini-wall">
                        <h2 className="story-title">Teams</h2>
                    </div>
                    <article>
                        <div className="about-text">
                            <p>The NBA originated in 1946 with 11 teams, and through a sequence of team expansions, reductions, and
                                relocations, currently consists of 30 teams. The United States is home to 29 teams and one is
                                located in Canada.</p>
                            <p>The National Basketball Association (NBA) is a men's professional basketball league in North
                                America,composed of 30 teams (29 in the United States and 1 in Canada).</p>

                            <p>The current league organization divides thirty teams into two conferences of three divisions with
                                five teams each. The current divisional alignment was introduced in the 2004-05 season. Reflecting
                                the population distribution of the United States and Canada as a whole, most teams are in the
                                eastern half of the country: thirteen teams are in the Eastern Time Zone, nine in the Central, three
                                in the Mountain, and five in the Pacific.</p>
                        </div>
                    </article>
                </div>

                <section className="site-content">
                    <div className="site-wrapper">
                        <div className="teams-container team-info">
                            <div className="teams-container-flexwrap">
                                <div>
                                    {divisions.map((division, index) => (
                                        <p key={index} className="bgblack division-title">{division}</p>
                                    ))}

                                    {teams.map((team) => (
                                        <div key={team.id} className="team-card">
                                            <img src={team.thumbnail} alt={team.name} />
                                            <Link to={`/team/${team.id}`}>
                                                <p className="card-name">{team.name}</p>
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}