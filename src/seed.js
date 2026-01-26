import { openDb } from './db.js';
import { links } from '../data/data.js';

async function seedDatabase() {
    const db = await openDb();

    try {
        await db.exec('BEGIN TRANSACTION');

        await db.exec('DELETE FROM links');

        const insertSQL = `INSERT INTO links (url) VALUES (?)`;

        for (const url of links) {
            await db.run(insertSQL, [url]);
        }

        await db.exec('COMMIT');
        console.log('Database seeded successfully.');
    }
    catch (error) {
        await db.exec('ROLLBACK');
        throw error;
    }
    finally {
        await db.close();
    }
}


seedDatabase().catch(err => {
    console.error('Error seeding database:', err);
    process.exit(1);
});
