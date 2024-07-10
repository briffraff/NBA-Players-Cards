export default function Socials() {
    const socialLinks = [
        { href: "https://www.facebook.com/nba/", icon: "fab fa-fw fa-facebook-f" },
        { href: "https://www.instagram.com/nba/?hl=en", icon: "fab fa-fw fa-linkedin-in" },
        { href: "https://twitter.com/NBA", icon: "fab fa-fw fa-twitter" }
    ];

    return (
        <>
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
        </>
    )
}