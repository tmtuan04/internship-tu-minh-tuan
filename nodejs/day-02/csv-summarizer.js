const fs = require("fs");
const path = require("path");

// Lấy đường dẫn file CSV từ tham số dòng lệnh
const filePath = process.argv[2];

// Đọc file CSV
let data;
try {
  data = fs.readFileSync(filePath, "utf8");
} catch (error) {
  console.error("Loi khi doc file .csv:", error.message);
  process.exit(1);
}

// Phân tích dữ liệu CSV
const lines = data.trim().split("\n");
const headers = lines[0].split(",").map((h) => h.trim()); // Map để loại bỏ khoảng trắng, tương đương ["name", "salary"]

// Tách data thành mảng 2 chiều
// slice(1) để bỏ qua headers
const rows = lines
  .slice(1)
  .map((line) => line.split(",").map((value) => value.trim()));
console.log("rows", rows);

// Tạo object để lưu trữ kết quả
const summary = {};
headers.forEach((header, index) => {
  // Kiểm tra xem cột có phải là số không bằng cách kiểm tra giá trị đầu tiên
  const firstValue = Number(rows[0][index]);
  if (!isNaN(firstValue)) {
    summary[header] = { sum: 0, count: 0 };
    rows.forEach((row) => {
      const value = Number(row[index]);
      summary[header].sum += value;
      summary[header].count++;
    });
  }
});
console.log(summary)
// In bảng kết quả (Tham khảo từ ChatGPT)
console.log("\nSummary of Numeric Columns\n");
console.log("+----------------+------------+------------+");
console.log("|    Column      |    Sum     |  Average   |");
console.log("+----------------+------------+------------+");

// Destructuring [col, { sum, count }]
// Object.entries(summary) chuyển object thành mảng các cặp [key, value]
for (const [col, { sum, count }] of Object.entries(summary)) {
  const avg = sum / count;
  console.log(
    `| ${col.padEnd(14)} | ${sum.toString().padStart(10)} | ${avg
      .toFixed(2)
      .toString()
      .padStart(10)} |`
  );
}
console.log("+----------------+------------+------------+");
