// const jsonData = JSON.parse(fs.readFileSync('src\service\firebase\firestore\Seed\teams.json', 'utf8'));

// const logotoReplace = "/assets/images/teams-logos";
// const logoreplaceWith = "/images/teams-logos";
// const thumbtoReplace = "/assets/images/teams-logos/thumbnails/";
// const thumbreplaceWith = "/images/thumbnails/";

// const updateImagePaths = (data) => {
//     return data.map(item => {
//         item.logo = item.logo.replace(logotoReplace, logoreplaceWith);
//         item.thumbnail = item.thumbnail.replace(thumbtoReplace, thumbreplaceWith);
//         item.division = item.logo.split('/')[3];
//         return item;
//     });
// };

// const updatedData = updateImagePaths(jsonData);

// const newJsonData = JSON.stringify(updatedData, null, 2);
// const newFilePath = 'src\service\firebase\firestore\Seed\teams.json';

// fs.writeFileSync(newFilePath, newJsonData, 'utf8');

// console.log(`Updated data has been saved to ${newFilePath}`);

// export const seedDataToFirestore = async () => {
//     const response = await fetch('src/service/firebase/firestore/Seed/teams.json');
//     const data = await response.json();
//     const db = firebase.firestore();
//     const batch = db.batch()
//     data.forEach((item) => {
//         const docRef = db.collection('teams').doc(item.id);
//         batch.set(docRef, item);
//     });
//     await batch.commit();
//     console.log('Data successfully uploaded to Firestore!');
// };

import { db } from "../../firebase-config";
import { query, where, getDocs, collection, addDoc } from "firebase/firestore";

const collections = {
    idFields: {
        teams: "id",
        subscribers: "id",
        cards: "id",
        users: "id"
    },
    paths: {
        teams: "src/service/firebase/firestore/Seed/teams.json",
        subscribers: "src/service/firebase/firestore/Seed/subscribers.json",
        cards: "src/service/firebase/firestore/Seed/cards.json",
        users: "src/service/firebase/firestore/Seed/users.json"
    },
    dbNames: {
        teams: "nba-teams",
        subscribers: "subscribers",
        cards: "nba-cards",
        users: "users"
    },
    queries: {
        teams: ["name", "id"],
        subscribers: ["email"],
        cards: ["playerName", "id"],
        users: ["email"]
    }
};

const seedDataToFirestore = async (type) => {
    try {
        const response = await fetch(collections.paths[type]);
        const data = await response.json();

        const collectionRef = collection(db, collections.dbNames[type]);
        const queryFields = collections.queries[type];
        const idField = collections.idFields[type];

        for (const item of data) {
            try {
                const conditions = queryFields.map(field => where(field, "==", item[field]));
                const checkForItem = query(collectionRef, ...conditions);
                const itemSnapshot = await getDocs(checkForItem);

                if (!itemSnapshot.empty) {
                    console.log(`${item.name || item.email || item.playerName || item.id} already exists`);
                    continue;
                }

                await addDoc(collectionRef, item);

                if (idField && item[idField]) {
                    console.log(`Item with ID ${item[idField]} successfully added to Firestore!`);
                }
            } catch (error) {
                console.log(error);
            }
        }
        console.log(data);
    } catch (error) {
        console.log(`Error loading data from JSON file or writing to Firestore: ${error}`);
    }
};

export const Start = async () => {
    await seedDataToFirestore('teams');
    await seedDataToFirestore('cards');
    await seedDataToFirestore('subscribers');
    // await seedDataToFirestore('users');
};
