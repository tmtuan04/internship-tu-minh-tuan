import express from "express";
import dotenv from "dotenv";
import authRootes from "./src/routes/auth.routes.js";
import { errorHandler } from "./src/middleware/errorHandler.js";

const app = express();
dotenv.config();

app.use(express.json());
app.use(errorHandler);

app.use("/auth", authRootes)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});