import React, { useEffect, useState, useMemo } from "react";
import { getTeams } from "../../service/firebase/firestore/firestore-service";
import { useDefaultImages } from "../../contexts/defaultImagesContext"
import TeamThumbnail from "../Teams/TeamThumbnail";

export default function Teams() {
    const defaultImages = useDefaultImages();
    const backgroundImage = defaultImages[2];

    const divisions = [
        "Atlantic Division",
        "Central Division",
        "Northwest Division",
        "Pacific Division",
        "Southeast Division",
        "Southwest Division"
    ];

    const [teams, setTeams] = useState([]);

    useEffect(() => {
        const abortController = new AbortController();

        const fetchTeams = async () => {
            try {
                const teamsList = await getTeams({ signal: abortController.signal });
                setTeams(teamsList);
            } catch (error) {
                console.log("Error fetching teams: ", error);
            }
        };

        fetchTeams();

        return () => {
            abortController.abort();
        }
    }, []);

    const groupedTeams = useMemo(() => {
        return teams.reduce((acc, team) => {
            if (!acc[team.division]) {
                acc[team.division] = [];
            }
            acc[team.division].push(team);
            return acc;
        }, {});
    }, [teams]);

    //"Pacific division" to "pacific-division"
    const transformDivisionSnakeCase = (divisionFromObject) => {
        return divisionFromObject.toLowerCase().split(' ').join('-')
    }
    //"pacific-division" to "Pacific division"
    const transformDivision = (division) => {
        return division
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ')
            .trim();
    };

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
                                {Object.entries(groupedTeams).map(([division]) => (
                                    <div key={division}>
                                        <h3 className="division-title">{transformDivision(division)}</h3>
                                        <div className="teams-container-flexwrap bottomDistance">
                                            {groupedTeams[division] ? (
                                                groupedTeams[division].map((team) => (
                                                    <TeamThumbnail key={team.id} team={team} />
                                                ))
                                            ) : (<p className="noteams">No teams in this division.</p>)}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

            </main>
        </>
    )
}