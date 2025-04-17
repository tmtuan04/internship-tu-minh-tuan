import express from "express";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
const __dirname = path.resolve();

// Middleware: Xử lý route hợp lệ
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Middleware: Ví dụ gây lỗi 500
app.get("/crash", (req, res, next) => {
  throw new Error("Co loi nghiem trong!");
});

// Middleware: Bắt lỗi 404
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error); // Chuyển đến middleware xử lý lỗi
});

// Middleware: Xử lý các lỗi (404, 500)
app.use((err, req, res, next) => {
    const statusCode = err.status || 500;

    // Ghi lỗi ra file error.log
    const logMessage = `[${new Date().toISOString()}] ${statusCode} - ${err.message}\n`;
    fs.appendFileSync(path.join(__dirname, "error.log"), logMessage);

    // Response
    const response = {
      status: statusCode,
      message: err.message,
      // ... dùng để giải phẳng (spread) một object vào trong object cha
      ...(process.env.NODE_ENV === "development" && { stack: err.stack }), // Chỉ hiển thị stack trace trong môi trường dev (err.stack cho biết lỗi xảy ra ở đâu trong code.)
    };

    res.status(statusCode).json(response);
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
