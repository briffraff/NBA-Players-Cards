import Splitter from "./Splitter";
import Subscribe from "./Subscribe";
import Socials from "./Socials";
import TeamsList from "./TeamsList";

export default function Footer() {
    return (
        <>
            <Splitter />
            <footer className="site-footer">
                <div className="site-wrapper">
                    <TeamsList/>
                    <div className="footer-social-subscribe">
                        <Socials />
                        <Subscribe />
                    </div>
                </div>
            </footer>
        </>
    );
}
