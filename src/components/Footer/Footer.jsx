import Subscribe from "./Subscribe";

export default function Footer() {
    const teams = [
        ["Atlanta Hawks", "Boston Celtics", "Brooklyn Nets", "Charlotte Hornets", "Chicago Bulls", "Cleveland Cavaliers"],
        ["Dallas Mavericks", "Denver Nuggets", "Detroit Pistons", "Golden State Warriors", "Houston Rockets", "Indiana Pacers"],
        ["LA Clippers", "Los Angeles Lakers", "Memphis Grizzlies", "Miami Heat", "Milwaukee Bucks", "Minnesota Timberwolves"],
        ["Charlotte Bobcats", "New York Knicks", "Oklahoma City Thunder", "Orlando Magic", "Philadelphia 76ers", "Phoenix Suns"],
        ["Portland Trail Blazers", "Sacramento Kings", "San Antonio Spurs", "Toronto Raptors", "Utah Jazz", "Washington Wizards"]
    ];

    const socialLinks = [
        { href: "https://www.facebook.com/nba/", icon: "fab fa-fw fa-facebook-f" },
        { href: "https://www.instagram.com/nba/?hl=en", icon: "fab fa-fw fa-linkedin-in" },
        { href: "https://twitter.com/NBA", icon: "fab fa-fw fa-twitter" }
    ];

    return (
        <footer className="site-footer">
            <div className="site-wrapper">
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

                <div className="footer-social-subscribe">
                    <div className="footer-social-icons">
                        <div className="footer-label">
                            <h4>Social</h4>
                        </div>
                        <div className="social-icons">
                            {socialLinks.map((link, index) => (
                                <a className="btn btn-social btn-outline" href={link.href} key={`social-${index}`}>
                                    <i className={link.icon}></i>
                                </a>
                            ))}
                        </div>
                    </div>

                    <Subscribe />

                </div>
            </div>
        </footer>
    );
}
