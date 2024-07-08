import { storage } from "../firebase-config";
import { ref, listAll, getDownloadURL } from "firebase/storage";

export const listAllImages = async () => {
    try {
        const listRef = ref(storage, '/images/thumbnails');
        const res = await listAll(listRef);

        // const urls = await Promise.all(
        //     res.items.map((itemRef) => getDownloadURL(itemRef))
        // );
        console.log(res);
        return res;
    } catch (error) {
        console.error("Error listing images:", error);
        return [];
    }
};

export const getDownloadUrlFromPath = async (path) => {
    try {
        const fileRef = ref(storage, path);
        const url = await getDownloadURL(fileRef);
        return url;
    } catch (error) {
        console.error("Error getting download URL:", error);
        return null;
    }
};