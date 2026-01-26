import 'dotenv/config';
import express from 'express';
import { openDb } from '#config/db.js';

const app = express();
const PORT=process.env.PORT || 3000;

//Middleware to parse JSON bodies
app.use(express.json());

app.get('/', (req, res) => {
    res.send("Hello! the server is running.");
})


//  Picks a random link from the database
app.get('/api/random', async (req, res) => {
    try {
        const db=await openDb();

        const link = await db.get('SELECT * FROM links ORDER BY RANDOM() LIMIT 1');

        if(!link) {
            return res.status(404).json({ error: "No links found in the database! "});
        }

        res.json(link);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({error: "Something went wrong spinning the wheel."});
    }
});


app.post('/api/links', async (req, res) => {
    const {url}=req.body;

    if(!url) {
        return res.status(400).json({error: "URL is required" });
    }

    try {
        const db = await openDb();
        const result = await db.run('INSERT INTO links (url) VALUES (?)', [url]);

        res.json({
            message: "Link added successfully!",
            id: result.lastID,
            url: url
        });
    }
    catch(error) {
        console.error(error);
        res.status(500).json({error: "Failed to save the link."});
    }
})

app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
