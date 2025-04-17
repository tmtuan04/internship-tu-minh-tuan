const http = require("http");
const Busboy = require("busboy");
const fs = require("fs");
const path = require("path");
const EventEmitter = require("events");

// Create uploads directory if it doesn't exist
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

class UploadEmitter extends EventEmitter {}
const uploadEmitter = new UploadEmitter();

// Khi file tải xong, sự kiện "upload:done" được phát
uploadEmitter.on("upload:done", (fileName) => {
  const logEntry = `[${new Date().toISOString()}] File uploaded: ${fileName}\n`;
  console.log(logEntry);
  fs.appendFileSync("upload.log", logEntry);
});

const server = http.createServer((req, res) => {
  if (req.method === "POST" && req.url === "/upload") {
    // busboy để phân tích dữ liệu từ form, headers của request được truyền vào để busboy hiểu định dạng form
    const bb = Busboy({ headers: req.headers });

    // Xử lý file được gửi lên
    bb.on("file", (fieldname, file, fileInfo) => {
      // Use fileInfo.filename instead of filename
      const fileName = fileInfo.filename; // Tên gốc của file
      const saveTo = path.join(__dirname, "uploads", fileName);

      // Dùng fs.createWriteStream() để lưu stream vào đĩa.
      const writeStream = fs.createWriteStream(saveTo);
      // Ghi dữ liệu vào file
      file.pipe(writeStream);

      // Khi file được ghi xong, phát sự kiện "upload:done"
      file.on("end", () => {
        uploadEmitter.emit("upload:done", fileName);
      });
    });

    // Khi busboy đã xử lý xong toàn bộ các phần tử của form, trả về response thành công.
    bb.on("finish", () => {
      res.writeHead(200, { Connection: "close" });
      res.end("File uploaded successfully!");
    });

    // req.pipe(bb) sẽ chuyển dữ liệu từ request vào busboy để phân tích.
    // Điều này cho phép busboy xử lý dữ liệu từ request stream.
    req.pipe(bb);
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Route not found");
  }
});

server.listen(3000, () => {
  console.log("Upload server running at http://localhost:3000");
});
