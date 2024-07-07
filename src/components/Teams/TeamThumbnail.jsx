import { Link } from "react-router-dom";

export default function TeamThumbnail({
    team
}) {
    return (
        <>
            <div className="team-card">
                <img src={team.thumbnail} alt={team.name} />
                <Link to={`/team/${team.id}`}>
                    <p className="card-name">{team.name}</p>
                </Link>
            </div>
        </>
    )
}
