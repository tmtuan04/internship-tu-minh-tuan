import express from 'express';
import { authenticateToken } from '../middleware/auth.middleware.js';
import { isAdmin } from '../middleware/authorization.middleware.js';
import { getAllUsers, lockUser } from '../controllers/admin.controller.js';
import { validateProduct } from '../middleware/validate.middleware.js';
import { createProduct, updateProduct, deleteProduct } from '../controllers/product.controller.js';
import { getOrders, updateOrderStatus } from '../controllers/order.controller.js';

const router = express.Router();

router.get("/users", authenticateToken, isAdmin, getAllUsers);

router.patch("/users/:id/lock", authenticateToken, isAdmin, lockUser);

// Product
// Tạm thời xoá middleware: authenticateToken, isAdmin
router.post("/products", validateProduct, createProduct);

router.put("/products/:id", updateProduct);

router.delete("/products/:id", deleteProduct);

// Order
router.get("/orders", authenticateToken, isAdmin, getOrders);
router.patch("/orders/:id/status", authenticateToken, isAdmin, updateOrderStatus);

export default router;