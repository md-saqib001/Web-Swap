import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import linkRoutes from '#routes/linkRoutes.js';
import adminRoutes from '#routes/adminRoutes.js';
import { adminAuth } from './middleware/auth.js';

const app = express();
const PORT=process.env.PORT || 3000;

//Middleware to parse JSON bodies
app.use(express.json());
app.use(cors());


app.use(express.static(path.join(process.cwd(), 'public')));

app.get('/', (req, res) => {
    res.send("Hello! the server is running.");
})

app.use('/api', linkRoutes);

app.use('/api/admin', adminAuth, adminRoutes);

app.get('/admin', adminAuth, (req, res) => {
    // SECURITY TODO: We will add a password check here later!
    res.sendFile(path.join(process.cwd(), 'src', 'views', 'admin.html'));
});

app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
