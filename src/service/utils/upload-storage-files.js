import admin from 'firebase-admin';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const serviceAccountPath = path.join(__dirname,'nba-player-cards-firebase-adminsdk-uvyul-a1ca980dac.json');

const serviceAccount = JSON.parse(await fs.readFile(serviceAccountPath, 'utf-8'));

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "nba-player-cards.appspot.com"
});

const bucket = admin.storage().bucket();

const uploadFile = async (filePath, baseDir) => {
    const localFilePath = path.join(baseDir, filePath);
    const firebaseFilePath = filePath.replace(/\\/g, '/');

    try {
        await bucket.upload(localFilePath, {
            destination: firebaseFilePath,
        });
        console.log(`Uploaded ${filePath} to ${firebaseFilePath}`);
    } catch (error) {
        console.error(`Failed to upload ${filePath}: ${error.message}`);
    }
};

const uploadFilesFromDirectory = async (dirPath, baseDir) => {
    const files = await fs.readdir(dirPath, { withFileTypes: true });

    for (const file of files) {
        const filePath = path.join(dirPath, file.name);
        const relativeFilePath = path.relative(baseDir, filePath);

        if (file.isDirectory()) {
            await uploadFilesFromDirectory(filePath, baseDir);
        } else {
            await uploadFile(relativeFilePath, baseDir);
        }
    }
};

const baseDir = process.argv[2];

if (!baseDir) {
    console.error('Please specify the base directory for uploading files.');
    process.exit(1);
}

await uploadFilesFromDirectory(baseDir, baseDir).catch(console.error);
