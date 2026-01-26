import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import linkRoutes from '#routes/linkRoutes.js';

const app = express();
const PORT=process.env.PORT || 3000;

//Middleware to parse JSON bodies
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send("Hello! the server is running.");
})

app.use('/api', linkRoutes);

app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
