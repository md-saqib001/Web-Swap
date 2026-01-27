import { openDb } from '#config/db.js';
import { z } from 'zod';

// --- 1. Define the Validation Schema ---
// This acts as a "Bouncer". It checks if the incoming data matches this shape.
const linkSchema = z.object({
    url: z.string()
        .min(1, { message: "URL cannot be empty" })
        .url({ message: "Invalid URL format. Must start with http:// or https://" })
        .trim() // Removes whitespace from start/end
});

// Helper function to extract just the domain (e.g., "google.com" from "https://www.google.com/maps")
const getDomain = (url) => {
    try {
        const hostname = new URL(url).hostname;
        return hostname.replace(/^www\./, ''); // Remove 'www.' if present
    } catch (e) {
        return null;
    }
};

const checkUrlExists = async (url) => {
    try {
        // We use method: 'HEAD' because we only want to check headers, not download the whole page
        // Timeout is 5000ms (5 seconds) so we don't wait forever
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);

        const response = await fetch(url, { 
            method: 'HEAD', 
            signal: controller.signal 
        });
        
        clearTimeout(timeoutId);
        
        // If status is 200-299, it's good. 
        // We also accept 3xx redirects, but fetch usually follows them automatically.
        return response.ok; 
    } catch (error) {
        return false; // Connection failed, timeout, or DNS error
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

    const validation = linkSchema.safeParse(req.body);

    // If validation fails, Zod gives us a detailed error report
    if (!validation.success) {
        // We take the first error message and send it to the user
        const errorMessage = validation.error.errors[0].message;
        return res.status(400).json({ error: errorMessage });
    }

    const { url } = validation.data;
    const domain = getDomain(url);

    if (!domain) {
        return res.status(400).json({ error: "Invalid URL format" });
    }

    const isLive = await checkUrlExists(url);
    if (!isLive) {
        return res.status(400).json({ error: "This website is unreachable or does not exist." });
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