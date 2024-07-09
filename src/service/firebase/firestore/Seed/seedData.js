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
import { query, where, doc, getDoc, getDocs, collection, addDoc } from "firebase/firestore";

export const seedJsonDataToFirestore = async () => {
    try {
        const response = await fetch('src/service/firebase/firestore/Seed/teams.json');
        const data = await response.json();

        const teamsCollectionRef = collection(db, "nba-teams");

        for (const item of data) {
            try {
                const checkForTeam = query(teamsCollectionRef,
                    where("name", "==", item.name),
                    where("id", "==", item.id));
                const teamSnapshot = await getDocs(checkForTeam);

                if (!teamSnapshot.empty) {
                    let errorMessage = `${item.name} already exists`
                    console.log(errorMessage);
                    continue;
                }

                await addDoc(teamsCollectionRef, item);
                console.log(`Item with ID ${item.id} successfully added to Firestore!`);

            } catch (error) {
                console.log(error);
            }
        };
        console.log(data);
    } catch (error) {
        console.log('Error loading data from JSON file or writing to Firestore: ', error);
    }
};