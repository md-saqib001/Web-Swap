import { openDb } from './db.js';

export async function createTable() {
    const db = await openDb();

    // Create the Table and ensure the DB is closed
    try {
        await db.run(`
            CREATE TABLE IF NOT EXISTS links (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                url TEXT,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `);

        console.log("table created");
    } finally {
        await db.close();
    }
}

// Run when executed directly
createTable().catch(err => {
    console.error(err);
    process.exit(1);
});
