import 'dotenv/config';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';
import fs from 'fs';

// Allow overriding the DB directory or full path via environment variables.
const dataDir = path.join(process.cwd(), process.env.DB_DIR ?? 'database');

// We only create the folder if a custom DB_PATH isn't provided
if (!process.env.DB_PATH) {
    fs.mkdirSync(dataDir, { recursive: true });
}

export const dbPath = process.env.DB_PATH ?? path.join(dataDir, 'database.db');

export async function openDb() {
    return open({
        filename: dbPath,
        driver: sqlite3.Database
    });
}

export default openDb;
