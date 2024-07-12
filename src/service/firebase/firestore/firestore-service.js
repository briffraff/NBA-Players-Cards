import { db } from "../firebase-config";
import { query, where, doc, getDoc, getDocs, collection, addDoc } from "firebase/firestore";

const teamsCollectionRef = collection(db, "nba-teams");
const subscriberCollectionRef = collection(db, "subscribers");

export const getTeams = async ({ signal }) => {
    try {
        const data = await getDocs(teamsCollectionRef, { signal });
        const teams = data.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id
        }));
        return teams;
    } catch (error) {
        console.log("Error fetching teams: ", error);
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
        console.log("Error fetching team: ", error);
        throw error;
    }
};


export const addSubscriber = async (email) => {
    try {
        const currentYear = new Date().getFullYear();

        const q = query(subscriberCollectionRef, where("email", "==", email));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            let errorMessage = `Email ${email} already exists`
            console.log(errorMessage);
            throw new Error(errorMessage);
        }

        const newSubscriber = {
            email: email,
            subscribeOn: currentYear
        };

        await addDoc(subscriberCollectionRef, newSubscriber);
        console.log(`Subscriber added: ${email}`);
    } catch (error) {
        throw error;
    }
};