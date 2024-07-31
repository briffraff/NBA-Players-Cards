import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getTeamById, likeTeam, unlikeTeam, isTeamLiked } from "../../service/firebase/firestore/firestore-service";
import { getDownloadUrlFromPath } from "../../service/firebase/storage/storage-service";
import { useAuth } from "../../contexts/authContext";
import NotFound from "../404/404";

import styles from "../../../public/assets/scss/modules/_TeamDetails.module.scss"

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

                if (firestoreUser) {
                    const liked = await isTeamLiked(firestoreUser.uid, teamId);
                    setIsLiked(liked);
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
                ? (<div className={styles.siteWrapper}>
                    <section className={styles.siteMedia} style={{ backgroundImage: `url(${logoUrl})` }}>
                        <section className={styles.sectionInfoPanel}>
                            <h1 className={styles.teamTitle}>{team.name}</h1>
                            <div className={`${styles.teamName}`}>
                                <h3 className={styles.location}>Location : {team.location}</h3>
                            </div>
                            <div className={styles.likeContainer}>
                                {firestoreUser && (
                                    <>
                                        <span className={styles.likeSlogan}>Like : </span>
                                        <span className={isLiked ? `${styles.liked} fas fa-heart` : `${styles.like} fas fa-heart`} onClick={handleLike}></span>
                                    </>
                                )}
                            </div>
                        </section>
                    </section>

                    <div className="site-content">
                        <div className={styles.singleTeamContainer}>
                            <div className={styles.teamLogo}>
                                <img src={logoUrl} alt={team.name} />
                            </div>
                            <article>
                                <div className={`about-text ${styles.teamInfo}`}>{team.info}</div>
                            </article>
                        </div>
                    </div>
                </div>)
                : (<NotFound />)}
        </>
    );
}
