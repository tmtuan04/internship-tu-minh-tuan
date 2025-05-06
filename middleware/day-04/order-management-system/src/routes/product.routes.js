import express from 'express';
import { getAllProducts } from '../controllers/product.controller.js';
// import { authenticateToken } from '../middleware/auth.middleware.js';

const router = express.Router();

// Tạm thời bỏ middleware đi để dùng API này cho project khác
router.get('/', getAllProducts);

export default router;