import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import adminRoutes from "./src/routes/admin.routes.js";
import authRootes from "./src/routes/auth.routes.js";
import productRoutes from "./src/routes/product.routes.js";
import orderRoutes from "./src/routes/order.routes.js";

import { errorHandler } from "./src/middleware/error.middleware.js";
import { devLogger } from "./src/middleware/logger.middleware.js";

const app = express();
dotenv.config();

// Middleware thứ tự quan trọng!
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

// 👉 Chỉ khai báo 1 lần json/urlencoded với limit
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.use(devLogger);

// Routes
app.use("/admin", adminRoutes);
app.use("/auth", authRootes);
app.use("/product", productRoutes);
app.use("/orders", orderRoutes);

// Error handler cuối cùng
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});