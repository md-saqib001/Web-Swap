import { openDb } from '#config/db.js';

export const getRandomLink = async (req, res) => {
    try {
        const db = await openDb();

        const link = await db.get('SELECT * FROM links ORDER BY RANDOM() LIMIT 1');

        if(!link) {
            return res.status(404).json({ error: "No links found in the database! "});
        }

        res.json(link);
    }
    catch (err) {
        console.error(error);
        res.status(500).json({ error: "Something went wrong spinning the wheel." });
    }
}


export const addNewLink = async (req, res) => {
    const {url}=req.body;

    if(!url) {
        return res.status(400).json({ error: "URL is required" });
    }

    try {
        const db = await openDb();

        const result=db.run('INSERT INTO links (url) VALUES (?)', [url]);

        res.json({
            message: "Link added successfully!",
            id: result.lastID,
            url: url
        });
    }
    catch (err) {
        console.error(error);
        res.status(500).json({ error: "Failed to save the link." });
    }
}
