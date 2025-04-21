import express from "express";
import productRoutes from "./src/routes/productRoutes.js";
import { authMiddleware } from "./src/middleware/authMiddleware.js";
import { errorHandler } from "./src/middleware/errorHandler.js";
import { ipLogger } from "./src/middleware/ipLogger.js";
import { devLogger, fileLogger } from "./src/middleware/morganLogger.js";

const app = express();
app.use(express.json());

// Logging middleware
app.use(devLogger); // Development logger
app.use(fileLogger); // File logger

// IP Logger middleware
app.use(ipLogger);

// Routes + Authentication middleware
app.use("/products", authMiddleware, productRoutes);

// Error handling middleware (Đặt sau cùng trong hàng middleware)
app.use(errorHandler);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});