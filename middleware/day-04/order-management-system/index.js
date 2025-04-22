import express from "express";
import dotenv from "dotenv";

import adminRoutes from "./src/routes/admin.routes.js";
import authRootes from "./src/routes/auth.routes.js";
import productRoutes from "./src/routes/product.routes.js";
import orderRoutes from "./src/routes/order.routes.js";

import { errorHandler } from "./src/middleware/error.middleware.js";
import { devLogger } from "./src/middleware/logger.middleware.js";

const app = express();
dotenv.config();

app.use(express.json());

// Middleware
app.use(devLogger);
app.use(errorHandler);

// Routes
app.use("/admin", adminRoutes);
app.use("/auth", authRootes)
app.use("/product", productRoutes);
app.use("/orders", orderRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});