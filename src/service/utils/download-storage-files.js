import admin from 'firebase-admin';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const serviceAccountPath = path.join(__dirname, 'nba-player-cards-dev-fbc78-firebase-adminsdk-xnbws-fc69ab15df.json');

const serviceAccount = JSON.parse(await fs.readFile(serviceAccountPath, 'utf-8'));

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "nba-player-cards-dev-fbc78.appspot.com"
});

const bucket = admin.storage().bucket();

const ensureDirectoryExists = async (dirPath) => {
    try {
        await fs.access(dirPath);
    } catch {
        await fs.mkdir(dirPath, { recursive: true });
    }
};

const downloadFile = async (filePath) => {

    const sanitizedFilePath = filePath.replace(/\\/g, '/');
    const destPath = path.join(__dirname, 'downloads', sanitizedFilePath);
    const destDir = path.dirname(destPath);

    await ensureDirectoryExists(destDir);

    try {
        await bucket.file(sanitizedFilePath).download({ destination: destPath });
        console.log(`Downloaded ${filePath} to ${destPath}`);
    } catch (error) {
        console.error(`Failed to download ${filePath}: ${error.message}`);
    }
};

const listFilesAndDownload = async () => {
    const [files] = await bucket.getFiles({ directory: 'images/' });
    for (const file of files) {
        if (file.name.endsWith('/')) {
            console.log(`Skipping directory ${file.name}`);
            continue;
        }
        await downloadFile(file.name);
    }
};

await listFilesAndDownload().catch(console.error);
