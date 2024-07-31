import styles from "../../../public/assets/scss/modules/_Footer.module.scss"

export default function Socials() {
    const socialLinks = [
        { href: "https://www.facebook.com/nba/", icon: "fab fa-facebook-f" },
        { href: "https://www.instagram.com/nba/?hl=en", icon: "fab fa-instagram" },
        { href: "https://twitter.com/NBA", icon: "fab fa-twitter" }
    ];

    return (
        <>
            <div className={styles.footerSocialIcons}>
                <div className={styles.footerLabel}>
                    <h4>Social</h4>
                </div>
                <div className={styles.socialIcons}>
                    {socialLinks.map((link, index) => (
                        <a className={`${styles.btn} ${styles.btnSocial} ${styles.btnOutline}`} href={link.href} key={`social-${index}`}>
                            <i className={link.icon}></i>
                        </a>
                    ))}
                </div>
            </div>
        </>
    )
}
