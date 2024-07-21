import { db } from "../firebase-config";
import { query, where, doc, getDoc, getDocs, collection, addDoc, deleteDoc, documentId } from "firebase/firestore";

const teamsCollectionRef = collection(db, "nba-teams");
const subscriberCollectionRef = collection(db, "subscribers");
const usersCollectionRef = collection(db, "users");
const cardsCollectionRef = collection(db, "nba-cards");

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
            return { ...docSnap.data(), id: docSnap.uid };
        } else {
            console.log("No such document!");
            return null;
        }
    } catch (error) {
        console.log("Error fetching team: ", error);
        throw error;
    }
};

export const getAllFirestoreUsers = async () => {
    try {
        const data = await getDocs(usersCollectionRef);
        const teams = data.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id
        }));
        return teams;
    } catch (error) {
        console.log("Error fetching Users: ", error);
        throw error;
    }
};


export const getFirestoreUserById = async (profileId) => {
    try {
        const q = query(usersCollectionRef, where("uid", "==", profileId));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            let errorMessage = "No such user document!";
            throw new Error(errorMessage);
        } else {
            const userDoc = querySnapshot.docs[0];
            return userDoc.data();
            // return { ...userDoc.data(), id: userDoc.id };
        }
    } catch (error) {
        console.log("Error fetching user: ", error);
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

export const deleteFirestoreUserById = async (userAuthId) => {
    const q = query(usersCollectionRef, where("uid", "==", userAuthId));
    const querySnapshot = await getDocs(q);
    const documentID = querySnapshot.docs[0].id;
    const docRef = doc(db, "users", documentID);

    if (docRef) {
        await deleteDoc(docRef);
        // console.log("Firebase User deleted successfully!")
    }
}

export const createCard = async (cardData, image, imageName, userId) => {

    try {
        const q = query(cardsCollectionRef,
            where("imageName", "==", imageName),
            where("playerName", "==", cardData.playerName),
            where("cardUserId", "==", userId)
        );
        const snapshot = await getDocs(q);

        if (!snapshot.empty) {
            let errorMessage = `Card with ${cardData.playerName} player already exists`
            console.log(errorMessage);
            throw new Error(errorMessage);
        }

        const newCard = {
            playerName: cardData.playerName,
            description: cardData.description,
            shortInfo: cardData.shortInfo,
            image: image,
            imageName: imageName,
            cardUserId: userId
        }

        await addDoc(cardsCollectionRef, newCard);
        
    } catch (error) {
        throw error
    }
}