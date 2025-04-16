const fs = require("fs/promises"); // Dùng promise-based API để làm việc với file
const fss = require("fs"); // Dùng để tạo stream (read/write stream)
const path = require("path"); // Xử lý đường dẫn file (nối, tách, định dạng)
const zlib = require("zlib"); // Dùng để nén file với Gzip, Deflate, Brotli, v.v.
const { pipeline } = require("stream"); // Dùng để kết nối các stream lại với nhau
const { promisify } = require("util"); // Biến callback-style function thành promise

const pipe = promisify(pipeline); // Chuyển đổi pipeline thành promise để dễ dàng sử dụng async/await

// Directory Setup
const logsDir = path.join(__dirname, "logs");
const archivesDir = path.join(__dirname, "archive");

function formatDate(date) {
  const pad = (n) => String(n).padStart(2, "0");
  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const hour = pad(date.getHours());
  const minute = pad(date.getMinutes());
  
  return `${year}${month}${day}_${hour}${minute}`;
}

async function renameLogs() {
  const files = await fs.readdir(logsDir);
  const renamedFiles = [];

  // Đọc tất cả file trong thư mục logs
  for (const file of files) {
    if (file.endsWith(".log")) {
      // Lọc ra các file có đuôi .log
      const fullPath = path.join(logsDir, file);
      const stat = await fs.stat(fullPath);
      const date = new Date(stat.mtime);
      const formatted = `log_${formatDate(date)}.log`;
      // // Đổi tên file và lưu tên mới
      await fs.rename(fullPath, path.join(logsDir, formatted));
      renamedFiles.push(formatted);
    }
  }
  return renamedFiles;
}

async function archiveLogs(logFiles) {
  const date = new Date();
  const formattedDate = formatDate(date);
  const zipPath = path.join(archivesDir, `logs_${formattedDate}.zip`);
  
  const output = fss.createWriteStream(zipPath);
  const gzip = zlib.createGzip();

  const archiveStream = require("stream").PassThrough();

  // Tạo stream đọc lần lượt các log
  (async () => {
    for (const file of logFiles) {
      const filePath = path.join(logsDir, file);
      const content = await fs.readFile(filePath, "utf8");
      archiveStream.write(`\n--- ${file} ---\n`);
      archiveStream.write(content);
    }
    archiveStream.end();
  })();

  await pipe(archiveStream, gzip, output);
  console.log(`Archived logs to ${zipPath}`);
}

(async () => {
  try {
    await fs.mkdir(archivesDir, { recursive: true });

    const renamedLogs = await renameLogs();
    if (renamedLogs.length === 0) {
      console.log("No logs to archive.");
      return;
    }

    await archiveLogs(renamedLogs);
  } catch (err) {
    console.error("Error:", err);
  }
})();
