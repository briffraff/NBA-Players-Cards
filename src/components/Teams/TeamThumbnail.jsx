import { Link } from "react-router-dom";
import { getDownloadUrlFromPath } from "../../service/firebase/storage/storage-service";
import { useEffect, useState } from "react";

export default function TeamThumbnail({
    team
}) {
    const [thumbnailUrl, setThumbnailUrl] = useState("");

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
            <div className="team-card">
                {thumbnailUrl
                    ? (
                        <img src={thumbnailUrl} alt={team.name} />
                    )
                    : (
                        <p>Loading image...</p>
                    )
                }

                <Link to={`/team/${team.id}`}>
                    <p className="card-name">{team.name}</p>
                </Link>
            </div>
        </>
    )
}
