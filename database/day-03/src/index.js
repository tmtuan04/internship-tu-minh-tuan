import express from "express";
import productRoutes from "./routes/productRoutes.js";

const app = express();
app.use(express.json());

// Routes
app.use("/products", productRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
