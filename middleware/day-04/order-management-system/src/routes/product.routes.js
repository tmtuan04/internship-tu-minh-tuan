import express from 'express';
import { getAllProducts } from '../controllers/product.controller.js';
import { authenticateToken } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', authenticateToken, getAllProducts);

export default router;