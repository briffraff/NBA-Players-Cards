import { db } from "../firebase-config";
import { query, where, doc, getDoc, getDocs, arrayUnion, collection, addDoc, deleteDoc, documentId, updateDoc, arrayRemove, orderBy, limit, startAfter } from "firebase/firestore";

import { generateHashFromBase64 } from "../../utils/utils";
import { uploadImageAndGetUrl } from "../storage/storage-service";

const teamsCollectionRef = collection(db, "nba-teams");
const subscriberCollectionRef = collection(db, "subscribers");
const usersCollectionRef = collection(db, "users");
const cardsCollectionRef = collection(db, "nba-cards");


//TEAMS
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

export const getLikedTeamsByUser = async (teamsIds) => {

    if (!Array.isArray(teamsIds) || teamsIds.length === 0) { return [] }

    const q = query(teamsCollectionRef, where('__name__', "in", teamsIds))

    const querySnapshot = await getDocs(q);

    const teams = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }));
    // console.log(teams);
    return teams;
}


export const likeTeam = async (userId, teamId) => {

    const q = query(usersCollectionRef, where("uid", "==", userId));
    const querySnapshot = await getDocs(q);
    const documentID = querySnapshot.docs[0].id;
    const docRef = doc(db, "users", documentID);

    if (docRef) {
        await updateDoc(docRef, {
            likedTeams: arrayUnion(teamId)
        });
    }
};

export const unlikeTeam = async (userId, teamId) => {

    const q = query(usersCollectionRef, where("uid", "==", userId));
    const querySnapshot = await getDocs(q);
    const documentID = querySnapshot.docs[0].id;
    const docRef = doc(db, "users", documentID);

    if (docRef) {
        await updateDoc(docRef, {
            likedTeams: arrayRemove(teamId)
        });
    }
};

export const isTeamLiked = async (userId, teamId) => {
    try {
        const q = query(usersCollectionRef, where("uid", "==", userId));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            throw new Error("No such user document!");
        }

        const userDoc = querySnapshot.docs[0];
        const userData = userDoc.data();

        if (userData.likedTeams && userData.likedTeams.includes(teamId)) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.log("Error fetching user: ", error);
        throw error;
    }
};

// USERS
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

export const deleteFirestoreUserById = async (userAuthId) => {
    const q = query(usersCollectionRef, where("uid", "==", userAuthId));
    const querySnapshot = await getDocs(q);
    const documentID = querySnapshot.docs[0].id;
    const docRef = doc(db, "users", documentID);

    if (docRef) {
        await deleteDoc(docRef);
    }
};


//// ADMIN MANAGE USERS
export const updateFirestoreUserRole = async (userId, isAdmin) => {
    try {
        const docRef = doc(usersCollectionRef, userId);

        const updatedUser = {
            admin: isAdmin
        };

        await updateDoc(docRef, updatedUser);

        let role = isAdmin ? "Admin" : "User";
        let successMessage = `User role updated to ${role}`;
        console.log(successMessage);
    } catch (error) {
        console.error("Error updating user role:", error.message);
        throw new Error("Failed to update user role.");
    }
};


// SUBSCRIBERS
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


// CARDS
export const getAllRemainCards = async (lastVisible = null) => {
    try {
        const cardsCollection = collection(db, 'nba-cards');
        let q = query(cardsCollection, orderBy('playerName'));

        if (lastVisible) {
            q = query(cardsCollection, orderBy('playerName'), startAfter(lastVisible));
        }

        const querySnapshot = await getDocs(q);

        const allRemainingCards = [];
        let last = null;

        querySnapshot.forEach((doc) => {
            allRemainingCards.push({ id: doc.id, ...doc.data() });
            last = doc;
        });

        return { allRemainingCards, last };
    } catch (error) {
        console.error("Error loading all cards:", error);
        throw error;
    }
};

export const getTotalCardsCount = async () => {
    try {
        const cardsCollection = collection(db, 'nba-cards');
        const q = query(cardsCollection, orderBy('playerName'));
        const querySnapshot = await getDocs(q);
        return querySnapshot.size;
    } catch (error) {
        console.error("Error fetching total cards count:", error);
        throw error;
    }
};


export const loadCards = async () => {

    const cardsChunk = collection(db, "nba-cards");
    const q = query(cardsChunk, orderBy("playerName"), limit(3));
    const querySnapshot = await getDocs(q);

    const cardsList = [];
    let lastVisibleDoc = null;

    querySnapshot.forEach((doc) => {
        cardsList.push({ id: doc.id, ...doc.data() });
        lastVisibleDoc = doc;
    });

    return { cardsList: cardsList, last: lastVisibleDoc };
}

export const loadMore = async (lastVisible) => {
    try {
        const cardsCollection = collection(db, 'nba-cards');
        const q = query(cardsCollection, orderBy('playerName'), startAfter(lastVisible), limit(3));
        const querySnapshot = await getDocs(q);

        const moreCards = [];
        let last = null;

        querySnapshot.forEach((doc) => {
            moreCards.push({ id: doc.id, ...doc.data() });
            last = doc;
        });

        return { moreCards, last };
    } catch (error) {
        console.error("Error loading more cards:", error);
        throw error;
    }
};


export const createCard = async (cardData, image, imageName, currentUsers) => {

    // clean image from base64 metadata - 'data:image/jpg;base64'
    const cleanImage = image.split(',')[1];
    const imageHash = await generateHashFromBase64(cleanImage);

    try {
        const q = query(cardsCollectionRef, where("imageHash", "==", imageHash));

        const snapshot = await getDocs(q);

        if (!snapshot.empty) {
            let errorMessage = `Card with same content already exists`
            console.log(errorMessage);
            throw new Error(errorMessage);
        }

        const cardImagesStorage = "nba-cards"
        const imageUrl = await uploadImageAndGetUrl(image, cardImagesStorage, imageName);

        const newCard = {
            playerName: cardData.playerName,
            description: cardData.description,
            shortInfo: cardData.shortInfo,
            price: cardData.price,
            // image: image,
            imageUrl: imageUrl,
            imageName: imageName,
            imageHash: imageHash,
            cardUserId: currentUsers.uid,
            author: currentUsers.displayName
        }

        await addDoc(cardsCollectionRef, newCard);

    } catch (error) {
        throw error
    }
};

export const updateCard = async (currentHash, cardId, currentUrl, formData, image, imageName) => {
    let newImageUrl = "";
    let newImagehash = currentHash;

    if (!image.includes("https:")) {
        const cleanImage = image.split(',')[1];
        newImagehash = await generateHashFromBase64(cleanImage);
    }

    try {
        const docRef = doc(cardsCollectionRef, cardId);
        const docSnapshot = await getDoc(docRef);

        if (!docSnapshot.exists()) {
            let errorMessage = "Card does not exist";
            console.log(errorMessage);
            throw new Error(errorMessage);
        }


        if (newImagehash && newImagehash !== currentHash) {
            const q = query(cardsCollectionRef, where("imageHash", "==", newImagehash));
            const snapshot = await getDocs(q);

            if (!snapshot.empty) {
                let errorMessage = "Card with same image already exists";
                console.log(errorMessage);
                throw new Error(errorMessage);
            }

            // Upload new image and get new URL
            const cardImagesStorage = "nba-cards";
            newImageUrl = await uploadImageAndGetUrl(image, cardImagesStorage, imageName);
        }

        const updatedCard = {
            playerName: formData.playerName,
            description: formData.description,
            shortInfo: formData.shortInfo,
            imageUrl: newImageUrl !== "" ? newImageUrl : currentUrl,
            imageName: imageName,
            imageHash: newImagehash
        };

        await updateDoc(docRef, updatedCard);
        console.log("Firebase Card updated successfully!");

    } catch (error) {
        console.error("Error updating card: ", error);
    }
};

export const getAllCardsByUser = async (userId, { signal }) => {

    const q = query(cardsCollectionRef, where("cardUserId", "==", userId));

    const dataSnapshot = await getDocs(q, { signal });

    const cardsByUser = dataSnapshot.docs.map((card) => ({
        ...card.data(),
        id: card.id
    }));

    return cardsByUser;
};

export const getCardById = async (cardId) => {
    try {
        const docRef = doc(db, "nba-cards", cardId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return { ...docSnap.data(), id: docSnap.id };
        } else {
            console.log("No such document!");
            return null;
        }
    } catch (error) {
        console.log("Error fetching card: ", error);
        throw error;
    }
};

export const deleteCardById = async (cardId) => {
    const docRef = doc(cardsCollectionRef, cardId);
    if (docRef) {
        await deleteDoc(docRef);
    }

    console.log("Delete Card successfully")
};

