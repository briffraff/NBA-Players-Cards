import admin from 'firebase-admin';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const serviceAccountPath = path.join(__dirname, "nba-player-cards-dev-fbc78-firebase-adminsdk-xnbws-fc69ab15df.json");

const serviceAccount = JSON.parse(await fs.readFile(serviceAccountPath, 'utf-8'));

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const createUserWithUID = async (uid, email, password, username) => {
    try {
        const userRecord = await admin.auth().createUser({
            uid: uid,
            email: email,
            password: password,
            displayName: username
        });
        console.log('Successfully created new user:', userRecord.uid);
    } catch (error) {
        console.error('Error creating new user:', error);
    }
};

const users = [
    { uid: '1', email: 'admin@nbacards.com', password: 'admin123', displayName: "Admin" },
    { uid: '2', email: 'asd@abv.bg', password: 'asdasd', displayName: "asd" },
    { uid: '3', email: 'stavri@abv.bg', password: 'asdasd', displayName: "Stavri" },
];

const createUsers = async (users) => {
    for (const user of users) {
        await createUserWithUID(user.uid, user.email, user.password, user.displayName);
    }
};

await createUsers(users).catch(console.error);