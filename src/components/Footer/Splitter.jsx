import { useDefaultImages } from "../../contexts/defaultImagesContext"

export default function Splitter() {

    const defaultImages = useDefaultImages();

    const backgroundImage = defaultImages[5];

    return (
        <>
            <div className="mini-wall" style={{ backgroundImage: `url(${backgroundImage})` }}>
                <h2 className="transparent-text">I love this game!</h2>
            </div>
        </>
    )
}
