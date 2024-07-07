import { useEffect, useState } from "react";
import { db } from "../../service/firebase/firebase";
import { getDoc, doc } from "firebase/firestore";
import { useParams } from "react-router-dom";

export default function Team() {
    const [team, setTeam] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const getTeam = async () => {
            try {
                const docRef = doc(db, "nba-teams", id);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setTeam({ ...docSnap.data(), id: docSnap.id });
                } else {
                    console.log("No such document!");
                }
            } catch (error) {
                console.log(error);
            }
        }
        getTeam();
    }, [id]);

    if (!team) {
        return <div>Loading...</div>;
    }

    return (
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
    )
}
