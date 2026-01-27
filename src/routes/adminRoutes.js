import express from 'express';
import { getAllLinks, deleteLink } from '#controllers/adminControllers.js';
import { adminAuth } from '../middleware/auth.js';

const router = express.Router();

router.use(adminAuth);

// Route: GET /api/admin/links
router.get('/links', getAllLinks);

// Route: DELETE /api/admin/links/123
router.delete('/links/:id', deleteLink);

export default router;