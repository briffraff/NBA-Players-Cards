import Splitter from "./Splitter";
import Subscribe from "./Subscribe";
import Socials from "./Socials";
import TeamsList from "./TeamsList";

import styles from "../../../public/assets/scss/modules/_Footer.module.scss"

export default function Footer() {
    return (
        <>
            <Splitter />
            <footer className={styles.siteFooter}>
                <div className={styles.siteWrapper}>
                    <TeamsList />
                    <div className={styles.footerSocialSubscribe}>
                        <Socials />
                        <Subscribe />
                    </div>
                </div>
            </footer>
        </>
    );
}
