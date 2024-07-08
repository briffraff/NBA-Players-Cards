import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTeamById } from "../../service/firebase/firestore/firestore-service";
import { getDownloadUrlFromPath } from "../../service/firebase/storage/storage-service";

export default function Team() {
    const [team, setTeam] = useState(null);
    const { id } = useParams();
    const [logoUrl, setLogoUrl] = useState("");


    useEffect(() => {
        const handleImage = async () => {
            let logoPath = team.logo;
            let downloadUrl = await getDownloadUrlFromPath(logoPath);
            setLogoUrl(downloadUrl);
        }

        const fetchTeam = async () => {
            try {
                const teamData = await getTeamById(id);
                setTeam(teamData);
            } catch (error) {
                console.error(error);
            }
        };

        handleImage();
        fetchTeam();
    }, [id]);

    if (!team) {
        return <div>Loading...</div>;
    }


    return (
        <>
            <div className="site-wrapper">
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
            </div>
        </>
    )
}
