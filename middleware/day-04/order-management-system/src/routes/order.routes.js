import express from 'express';
import { authenticateToken } from '../middleware/auth.middleware.js';
import { createOrder, getOrder } from '../controllers/order.controller.js';

const router = express.Router();

router.post("/", authenticateToken, createOrder);

router.get("/", authenticateToken, getOrder);

export default router;