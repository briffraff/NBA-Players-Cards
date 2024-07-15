import React, { useState, useEffect, useMemo, useContext, createContext } from "react";
import { getAllImagesFromStorage } from "../service/firebase/storage/storage-service";

const DefaultImagesContext = createContext();

export function useDefaultImages() {
    return useContext(DefaultImagesContext);
}

export default function DefaultImagesProvider({ children }) {
    const [defaultImages, setDefaultImages] = useState([]);

    useEffect(() => {
        const fetchImages = async () => {
            const defaultImagesStorageFolder = "content"
            const images = await getAllImagesFromStorage(defaultImagesStorageFolder);
            if (images != undefined && images) {
                setDefaultImages(images)
            }
        };

        fetchImages();
    }, []);

    return (
        <DefaultImagesContext.Provider value={defaultImages}>
            {children}
        </DefaultImagesContext.Provider>
    )
};

