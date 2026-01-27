import express from 'express';
import { getRandomLink, addLink } from '#controllers/linkControllers.js';
import { addLinkLimiter, spinLimiter } from '../middleware/rateLimit.js';



const router = express.Router();

//  Picks a random link from the database
router.get('/random', spinLimiter, getRandomLink);

//  Adds a new link to the database
router.post('/links', addLinkLimiter, addLink);

export default router;
