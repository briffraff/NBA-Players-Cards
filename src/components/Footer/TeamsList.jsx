import { useEffect, useState, useTransition } from "react";
import { getTeams } from "../../service/firebase/firestore/firestore-service";
import { Link } from "react-router-dom";

export default function TeamsList() {
    // const teams = [
    //     ["Atlanta Hawks", "Boston Celtics", "Brooklyn Nets", "Charlotte Hornets", "Chicago Bulls", "Cleveland Cavaliers"],
    //     ["Dallas Mavericks", "Denver Nuggets", "Detroit Pistons", "Golden State Warriors", "Houston Rockets", "Indiana Pacers"],
    //     ["LA Clippers", "Los Angeles Lakers", "Memphis Grizzlies", "Miami Heat", "Milwaukee Bucks", "Minnesota Timberwolves"],
    //     ["Charlotte Bobcats", "New York Knicks", "Oklahoma City Thunder", "Orlando Magic", "Philadelphia 76ers", "Phoenix Suns"],
    //     ["Portland Trail Blazers", "Sacramento Kings", "San Antonio Spurs", "Toronto Raptors", "Utah Jazz", "Washington Wizards"]
    // ];

    const [teams, setTeams] = useState([]);

    useEffect(() => {
        const abortController = new AbortController();

        const fetchTeams = async () => {
            try {
                const teamsList = await getTeams({ signal: abortController.signal });

                const sortedGroupedTeamsList = teamsList
                    // .map((team) => ({ id: team.id, name: team.name }))
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .reduce((resultArray, item, index) => {
                        const chunkIndex = Math.floor(index / 6);

                        if (!resultArray[chunkIndex]) {
                            resultArray[chunkIndex] = [];
                        }

                        resultArray[chunkIndex].push(item);

                        return resultArray;
                    }, []);

                // console.log(sortedGroupedTeamsList);
                setTeams(sortedGroupedTeamsList);
            } catch (error) {
                console.log("Error fetching teams: ", error);
            }
        };

        fetchTeams();

        return () => {
            abortController.abort();
        }
    }, []);


    return (
        <>
            <div className="footer-teams">
                <div className="footer-label">
                    <h4>Teams</h4>
                </div>
                <div className="teams">
                    {teams.map((group, groupIndex) => (
                        <div className="teams-group" key={`group-${groupIndex}`}>
                            {group.map((team, teamIndex) => (
                                <Link to={`/team/${team.id}`} key={`team-${groupIndex}-${teamIndex}`}><p style={{ display: "inline-block" }}>
                                    {team.name}
                                </p></Link>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}