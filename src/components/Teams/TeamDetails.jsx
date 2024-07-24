import { useEffect, useState } from "react";
import { useAsyncError, useParams } from "react-router-dom";
import { getTeamById, likeTeam, unlikeTeam, isTeamLiked } from "../../service/firebase/firestore/firestore-service";
import { getDownloadUrlFromPath } from "../../service/firebase/storage/storage-service";
import NotFound from "../404/404";
import { useAuth } from "../../contexts/authContext";

export default function Team() {
    const [team, setTeam] = useState(null);
    const { teamId } = useParams();
    const [logoUrl, setLogoUrl] = useState("");
    const [isLiked, setIsLiked] = useState(false);
    const { firestoreUser } = useAuth();

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

                const liked = await isTeamLiked(firestoreUser.uid, teamId);
                setIsLiked(liked);

            } catch (error) {
                console.log(error);
            }
        };

        fetchTeamAndLogo();
        return () => {
            abortController.abort();
        }
    }, [teamId]);


    const handleLike = async () => {
        try {
            if (isLiked) {
                await unlikeTeam(firestoreUser.uid, teamId);
            } else {
                await likeTeam(firestoreUser.uid, teamId);
            }
            setIsLiked(!isLiked);
        } catch (error) {
            console.log(error);
        }
    }

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
                            <i
                                className={isLiked ? "liked fas fa-heart" : "like fas fa-heart"}
                                onClick={handleLike}
                            ></i>
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
    );
}
