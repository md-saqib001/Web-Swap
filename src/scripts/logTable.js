import { openDb } from '#config/db.js';

async function viewAllLinks() {
    const db = await openDb();

    try {
        const links = await db.all("SELECT * FROM links");

        console.log("Your Database Links: ");

        console.table(links);
    }
    catch (error) {
        console.error("Error retrieving links:", error);
    }
    finally {
        await db.close();
    }
}

viewAllLinks();