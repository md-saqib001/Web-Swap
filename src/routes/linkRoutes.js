import express from 'express';
import { getRandomLink, addNewLink } from '#controllers/linkControllers.js';



const router = express.Router();

//  Picks a random link from the database
router.get('/random', getRandomLink);

//  Adds a new link to the database
router.post('/links', addNewLink);

export default router;
