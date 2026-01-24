import express from 'express';
import db from './db.js';

const app = express();
const PORT=3000;

app.get('/', (req, res) => {
    res.send("Hello! the server is running.");
})

app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
