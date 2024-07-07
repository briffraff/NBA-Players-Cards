// teamsService.js
import { db } from "../firebase-config";
import { doc, getDoc, getDocs, collection } from "firebase/firestore";

const teamsCollectionRef = collection(db, "nba-teams");

export const getTeams = async () => {
    try {
        const data = await getDocs(teamsCollectionRef);
        const teams = data.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id
        }));
        return teams;
    } catch (error) {
        console.error("Error fetching teams: ", error);
        throw error;
    }
};

export const getTeamById = async (id) => {
    try {
        const docRef = doc(db, "nba-teams", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return { ...docSnap.data(), id: docSnap.id };
        } else {
            console.log("No such document!");
            return null;
        }
    } catch (error) {
        console.error("Error fetching team: ", error);
        throw error;
    }
};