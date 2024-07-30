import { useDefaultImages } from "../../contexts/defaultImagesContext"

export default function AboutNba() {
    const defaultImages = useDefaultImages();

    const backgroundImage = defaultImages[3]
    const jordan = defaultImages[4]
    const logoInspiration = defaultImages[7]
    const logo = defaultImages[8]

    return (
        <>
            <section className="site-media" style={{ backgroundImage: `url(${backgroundImage})` }}>
                <section className="section-info-panel">
                    <h1 className="info-slogan">About NBA</h1>
                    <h3 className="info-subslogan">National Basketball Association</h3>
                </section>
            </section>
            <main className="site-content">
                <div className="site-wrapper">


                    <div className="mini-wall">
                        <h2 className="story-title">Story of the game</h2>
                    </div>

                    <div className="imaginary" style={{ backgroundImage: `url(${jordan})` }}>    </div>

                    <article>
                        <div className="about-text">
                            <p>The Basketball Association of America—the entity that would later become the NBA—was first founded in June of
                                1946 by a group of businessmen who owned several major ice hockey arenas in the Northern United States and
                                Canada. At the time, the league’s competition consisted of the American Basketball League (ABL) and the
                                National Basketball League (NBL) though it would be the NBA’s later competition with an upstart league known
                                as the American Basketball Association that would drive the creation of the NBA logo we now have today.</p>

                            <p>After a period of competition between the three leagues, the BAA took in the NBL in a merger that formed the
                                league we now know as the NBA. Since then, the NBA has showcased superstars such as Michael Jordan, Magic
                                Johnson, Kareem Abdul-Jabbar, Kobe Bryant, and countless other names that would go on to cement the league
                                into international popularity. Though the NBA wasn’t without its trials (poor ratings, low attendance, and
                                drug scandals threatened to derail the league in the late 70s) it was superstars such as these that kept the
                                NBA in the spotlight and eventually surged its ratings into the stratosphere.</p>

                            <p>Today, the NBA consists of 30 teams, 29 from the US and one from Canada, and continues to be one of the most
                                lucrative sports leagues in the world. Last year, game seven of the NBA championship between the Cleveland
                                Cavaliers and the Golden State Warriors drew 30.8 million viewers, coming close to rivaling the popularity
                                of the CFP Championship, March Madness, and even the Superbowl.</p>

                            <p>With such enormous success, it’s hard to imagine the NBA struggling to market itself to fans and ratify its
                                position as the only professional basketball league of significance, but it wasn’t long ago that the NBA
                                found itself having to do just that. Out of the fires of this competition, however, was born the NBA logo.
                            </p>
                        </div>
                    </article>
                </div>

                <div className="site-wrapper">
                    <div className="mini-wall">
                        <h2 className="story-title">Design of Iconic logo</h2>
                    </div>

                    <article>
                        <div className="about-text">
                            <p>The NBA logo was designed in 1969 by Alan Siegel, founder of the branding firm Siegel+Gale. At the
                                time, the
                                NBA was facing fierce competition from a recently-founded rival known as the American Basketball
                                Association. As history would show, Americans at the time (and from then forward) didn’t seem to
                                have the
                                space in their fandom for more than one premier professional sports league for each sport. In the
                                competition between the NBA and the ABA, one of them was going to get left behind, and part of the
                                burden of
                                ensuring it was the NBA that reigned victorious fell on the shoulders of Siegel.</p>

                            <p>Before designing the new logo, Siegel scoured through old editions of Sport magazine in search of
                                inspiration. He eventually found a photo of basketball superstar Jerry West. In a single frame, this
                                photo
                                seemed to capture the fluid, fast-paced nature of the game. Using this photo, Siegel created a solid
                                white
                                silhouette of Jerry West and placed it against a red and blue background, forming the logo we still
                                see
                                today.</p>

                            <p>The logo was a big success, as was the NBA’s attempts at rebranding. Both would go on to survive
                                their bitter
                                battle against the ABA and come out on top, giving us all of the rich history, unforgettable
                                moments, and
                                legendary names we now have today.</p>
                        </div>

                        <div className="image-container">
                            <div className="about-logo" style={{ backgroundImage: `url(${logoInspiration})` }} alt="nba-logo-inspiration"></div>
                            <div className="about-logo" style={{ backgroundImage: `url(${logo})` }} alt="nba-logo"></div>
                        </div>
                    </article>

                    <div className="about-text team-info">
                        <p>The photo of Jerry West that inspired the NBA logo caught Siegel’s trained eye for good reason. Even
                            when reduced to a silhouette it seems to glide across the page. It’s a dynamic image that accurately
                            captures the nature of the sport.</p>

                        <p>The color scheme of the logo (red, white, and blue) appeals to the patriotism of the NBA’s viewers
                            and helped to establish the league as America’s choice for professional basketball.</p>

                        <p>Lastly, in choosing one of the league’s superstars as inspiration for the logo, Siegel was able to
                            highlight what truly sets the NBA apart. Arguably even more so than other sports, the NBA has long
                            been propelled to success by the popularity of a handful of truly spectacular players. Choosing to
                            showcase one of these players in the design of their logo was a wise decision and an essential
                            design element of the NBA logo.</p>
                    </div>
                </div>
            </main>
        </>
    )
}