import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTeamById } from "../../service/firebase/firestore/firestore-service";
import { getDownloadUrlFromPath } from "../../service/firebase/storage/storage-service";
import NotFound from "../404/404";

export default function Team() {
    const [team, setTeam] = useState(null);
    const { teamId } = useParams();
    const [logoUrl, setLogoUrl] = useState("");

    useEffect(() => {
        const abortController = new AbortController();

        const fetchTeamAndLogo = async () => {
            try {
                const teamData = await getTeamById(teamId);
                setTeam(teamData);

                if (teamData && teamData.logo) {
                    const downloadUrl = await getDownloadUrlFromPath(teamData.logo, { signal: abortController.signal });
                    setLogoUrl(downloadUrl);
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchTeamAndLogo();
        return () => {
            abortController.abort();
        }
    }, [teamId]);

    return (
        <>
            {team
                ? (<div className="site-wrapper">
                    <section className="site-media" style={{ backgroundImage: `url(${logoUrl})` }}>
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
                                <img src={logoUrl} alt={team.name} />
                            </div>
                            <article>
                                <div className="about-text team-info">{team.info}</div>
                            </article>
                        </div>
                    </div>
                </div>)
                : (<NotFound />)}
        </>
    )
}
