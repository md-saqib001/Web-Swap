import express from 'express';
import { getRandomLink, addLink } from '#controllers/linkControllers.js';



const router = express.Router();

//  Picks a random link from the database
router.get('/random', getRandomLink);

//  Adds a new link to the database
router.post('/links', addLink);

export default router;
