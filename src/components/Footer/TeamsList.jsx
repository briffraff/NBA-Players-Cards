export default function TeamsList() {
    const teams = [
        ["Atlanta Hawks", "Boston Celtics", "Brooklyn Nets", "Charlotte Hornets", "Chicago Bulls", "Cleveland Cavaliers"],
        ["Dallas Mavericks", "Denver Nuggets", "Detroit Pistons", "Golden State Warriors", "Houston Rockets", "Indiana Pacers"],
        ["LA Clippers", "Los Angeles Lakers", "Memphis Grizzlies", "Miami Heat", "Milwaukee Bucks", "Minnesota Timberwolves"],
        ["Charlotte Bobcats", "New York Knicks", "Oklahoma City Thunder", "Orlando Magic", "Philadelphia 76ers", "Phoenix Suns"],
        ["Portland Trail Blazers", "Sacramento Kings", "San Antonio Spurs", "Toronto Raptors", "Utah Jazz", "Washington Wizards"]
    ];

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
                                <a
                                    href={`#`}
                                    key={`team-${groupIndex}-${teamIndex}`}
                                >
                                    {team}
                                </a>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}