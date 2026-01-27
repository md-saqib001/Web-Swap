import { openDb } from '#config/db.js';

// Helper function to extract just the domain (e.g., "google.com" from "https://www.google.com/maps")
const getDomain = (url) => {
    try {
        const hostname = new URL(url).hostname;
        return hostname.replace(/^www\./, ''); // Remove 'www.' if present
    } catch (e) {
        return null;
    }
};

export const getRandomLink = async (req, res) => {
    let db;
    try {
        db = await openDb();
        const link = await db.get('SELECT * FROM links ORDER BY RANDOM() LIMIT 1');

        if (!link) {
            return res.status(404).json({ error: "No links found! Be the first to add one." });
        }

        res.json(link);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Something went wrong spinning the wheel." });
    } finally {
        if (db && typeof db.close === 'function') await db.close();
    }
};

export const addLink = async (req, res) => {
    const { url } = req.body;

    if (!url) {
        return res.status(400).json({ error: "URL is required" });
    }

    const domain = getDomain(url);
    if (!domain) {
        return res.status(400).json({ error: "Invalid URL format" });
    }

    try {
        const db = await openDb();

        try {
            // 1. Check if this DOMAIN already exists
            // We use LIKE %domain% to find "https://musclewiki.com/..." matches
            const existing = await db.get(
                'SELECT id FROM links WHERE url LIKE ? LIMIT 1', 
                [`%${domain}%`]
            );

            if (existing) {
                // 2. If exists, DO NOT add it, but pretend we did (Ghost Add) 👻
                console.log(`Duplicate domain blocked: ${domain}`);
                return res.json({ 
                    message: "Link accepted! (Duplicate domain)", 
                    id: existing.id, 
                    url: url,
                    isDuplicate: true 
                });
            }

            // 3. If new, actually insert it
            const result = await db.run('INSERT INTO links (url) VALUES (?)', [url]);
            
            res.json({ 
                message: "Link added successfully!", 
                id: result.lastID,
                url: url,
                isDuplicate: false
            });
        } finally {
            if (db && typeof db.close === 'function') await db.close();
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to save the link." });
    }
};