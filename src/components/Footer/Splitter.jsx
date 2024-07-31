import { useDefaultImages } from "../../contexts/defaultImagesContext"

import styles from "../../../public/assets/scss/modules/_Footer.module.scss"

export default function Splitter() {

    const defaultImages = useDefaultImages();
    const backgroundImage = defaultImages[5];

    return (
        <>
            <div className={styles.miniWall} style={{ backgroundImage: `url(${backgroundImage})` }}>
                <h2 className={styles.transparentText}>I love this game!</h2>
            </div>
        </>
    )
}
