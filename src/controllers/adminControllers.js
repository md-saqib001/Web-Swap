import { openDb } from '#config/db.js';

// 1. Get ALL Links (for the dashboard)
export const getAllLinks = async (req, res) => {
    try {
        const db = await openDb();
        // Get all links, newest first
        const links = await db.all('SELECT * FROM links ORDER BY id DESC');
        await db.close();
        
        res.json(links);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Could not fetch links" });
    }
};

// 2. Delete a Link (by ID)
export const deleteLink = async (req, res) => {
    const { id } = req.params; // Get ID from the URL (e.g., /links/33)

    try {
        const db = await openDb();
        const result = await db.run('DELETE FROM links WHERE id = ?', [id]);
        await db.close();

        if (result.changes === 0) {
            return res.status(404).json({ error: "Link not found" });
        }

        res.json({ message: "Deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Could not delete link" });
    }
};