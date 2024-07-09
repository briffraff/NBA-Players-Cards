import React, { useEffect, useState } from "react";
import TeamThumbnail from "../Teams/TeamThumbnail";
import { getTeams } from "../../service/firebase/firestore/firestore-service";

export default function Teams() {
    const backgroundImage = "https://firebasestorage.googleapis.com/v0/b/nba-player-cards.appspot.com/o/images%2Fcontent%2FAQ4160-140FEATURED.jpg?alt=media&token=f6857ccb-aba7-4ed1-88c1-1bf0001bafcc"

    const divisions = [
        "Atlantic Division",
        "Central Division",
        "Northwest Division",
        "Pacific Division",
        "Southeast Division",
        "Southwest Division"
    ];

    const [teams, setTeams] = useState([]);
    const [groupedTeams, setGroupedTeams] = useState({});

    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const teamsList = await getTeams();
                setTeams(teamsList);

                if (teamsList) {
                    const groupedByDivision = teams.reduce((acc, team) => {
                        if (!acc[team.division]) {
                            acc[team.division] = [];
                        }
                        acc[team.division].push(team)
                        return acc;
                    }, {});

                    setGroupedTeams(groupedByDivision);
                    console.log(groupedTeams);
                }
            } catch (error) {
                console.error("Error fetching teams: ", error);
            }
        };

        fetchTeams();
    }, []);

    const transformDivision = (divisionFromObject) => {
        return divisionFromObject.toLowerCase().split(' ').join('-')
    }

    return (
        <>
            <section className="site-media" style={{ backgroundImage: `url(${backgroundImage})` }}>
                <section className="section-info-panel">
                    <h1 className="info-slogan">The teams</h1>
                    <h3 className="info-subslogan">all teams in association</h3>
                </section>
            </section>

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


                <div className="site-wrapper">
                    <div className="teams-container team-info">
                        <div className="teams-container-flexwrap">
                            <div>
                                {divisions.map((division, index) => (
                                    <div className="teams-container-flexwrap" key={index}>
                                        <p className="division-title">{division}</p>
                                        <div className="teams-container-flexwrap">
                                            {groupedTeams[transformDivision(division)] ? (
                                                groupedTeams[transformDivision(division)].map((team) => (
                                                    <TeamThumbnail key={team.id} team={team} />
                                                ))
                                            ) : (
                                                <p>No teams in this division.</p>
                                            )}
                                        </div>
                                    </div>
                                ))}

                                {/* {divisions.map((division, index) => (
                                        <p key={index} className="bgblack division-title">{division}</p>
                                    ))}

                                    {teams.map((team) => (
                                        <TeamThumbnail key={team.id} team={team} />
                                    ))} */}
                            </div>
                        </div>
                    </div>
                </div>

            </main>
        </>
    )
}