import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getDownloadUrlFromPath } from "../../service/firebase/storage/storage-service";

import styles from "../../../public/assets/scss/modules/_TeamThumbnail.module.scss"

export default function TeamThumbnail({ team }) {
    const [thumbnailUrl, setThumbnailUrl] = useState("");
    const { profileId } = useParams();

    useEffect(() => {
        const abortController = new AbortController();


        const handleImage = async () => {
            let thumbnailPath = team.thumbnail;
            let downloadUrl =
                await getDownloadUrlFromPath(thumbnailPath, { signal: abortController.signal });
            setThumbnailUrl(downloadUrl);
        }

        handleImage();

        return () => {
            abortController.abort();
        }
    })

    return (
        <>
            <div className={styles.teamCard}>
                {thumbnailUrl
                    ? (
                        <img src={thumbnailUrl} alt={team.name} />
                    )
                    : (
                        <p>Loading image...</p>
                    )
                }

                <Link to={`/team/${team.id}`}><p className={styles.cardName}>{team.name}</p></Link>

            </div>
        </>
    )
}
