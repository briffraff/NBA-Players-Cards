import { storage } from "../firebase-config";
import { ref, listAll, getDownloadURL, uploadString } from "firebase/storage";

export const getAllImagesFromStorage = async (storageFolder) => {
    try {
        const listRef = ref(storage, `/images/${storageFolder}`);
        const res = await listAll(listRef);
        if (res != {} && res) {
            // console.log("OK!")
            const urls = await Promise.all(
                res.items.map((itemRef) => getDownloadURL(itemRef))
            );
            // console.log(urls);
            return urls;
        }
    } catch (error) {
        console.log("Error listing images:", error);
        return [];
    }
};

export const getDownloadUrlFromPath = async (path, { signal }) => {
    try {
        const fileRef = ref(storage, path);
        const url = await getDownloadURL(fileRef, { signal });
        return url;
    } catch (error) {
        console.log("Error getting download URL:", error);
        return null;
    }
};

export const uploadImageAndGetUrl = async (imageData, specificStorage, imageName) => {
    const imagesStorage = `images/${specificStorage}/`
    const imageRef = ref(storage, `${imagesStorage}${imageName}`);
    await uploadString(imageRef, imageData, `data_url`);
    const imageUrl = await getDownloadURL(imageRef);
    return imageUrl;
}