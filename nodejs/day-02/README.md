# Giải thích Day2

## 1. Phần 11: REPL
**Câu 1**: REPL là gì?
**REPL (Read Eval Print Loop)** hiểu đơn giản là **Đọc - Đánh giá - In - Lặp** và nó là môi trường như màn hình console nơi gõ các lệnh và hệ thống sẽ trả về kết quả. REPL cung cấp một cách thuận tiện để kiểm tra nhanh mã `JavaScript` đơn giản. `Node.js` cũng có môi trường REPL, nó hoạt động như sau:
- R (Read): Đọc input của người dùng
- E (Eval): Đánh giá/thực thi input đó
- P (Print): In kết quả ra màn hình
- L (Loop): Lặp lại quá trình trên


**Câu 2**: Biến `_` trong REPL để làm gì?
Biến `_` trong REPL được sử dụng để lưu trữ kết quả của biểu thức được tính toán gần nhất. Ví dụ:
![Minh hoạ biến _](screenshots/1.png)

**Câu 3**:Các lệnh đặc biệt như `.help`, `.exit` dùng khi nào?
- `.help`: Hiển thị danh sách tất cả các lệnh
- `.exit`: Thoát khỏi môi trường REPL
- `Tab`: có 2 tác dụng chính. Thứ nhất là gợi í và hoàn thành tên biến, phương thức và thuộc tính. Thứ hai là `Tab` hai lần liên tiếp sẽ hiển thị tất cả các biến và phương thức có sẵn trong context hiện tại

![Minh hoạ lệnh `.help` và `.exit`](screenshots/2.png)

Khi nhấn `Tab` 2 lần:
![](screenshots/4.png)

**Bài tập**
1. Mở REPL (node) → thử khai báo biến, dùng `_`, `Tab`, `.help`.

![Bài 11.1](screenshots/3.png)


2. Tạo một file `repl-helper.js` khởi chạy custom REPL:
- Gợi ý (autocomplete) các lệnh tự tạo: `sayHi`, `now`, `sum(a,b)`
- Khi gõ `.save` thì lưu lịch sử REPL vào file `history.txt`
```
// repl_helper.js
// Custom REPL
const repl = require("repl"); //  Module gốc của Node.js để tạo ra một phiên REPL (Read-Eval-Print Loop)
const fs = require("fs"); // Xử lý file
const path = require("path");

const completions = ["sayHi", "now", "sum"];

// Gợi í lệnh (autocomplete) cho REPL Custom
// Tổng quát: completer(line) => [suggestions, originalLine]
function completer(line = "") {
  try {
    const hits = completions.filter((c) =>
      c.toLowerCase().startsWith(line.toLowerCase())
    );
    return [hits.length ? hits : completions, line];
  } catch (err) {
    console.error("Lỗi trong completer:", err.message);
    return [[], line];
  }
}

const r = repl.start({
  prompt: ">> ", // Giao diện dòng lệnh hiển thị (giống như >, ở đây custom thành >>)
  ignoreUndefined: true, // Bỏ qua các giá trị undefined trong đầu ra
  completer: completer,
});

// Thêm các hàm vào context, r.context là nơi lưu tất cả các biến và hàm có sẵn trong REPL
r.context.sayHi = () => console.log("Hello from REPL Custom by TMTuan!"); // Hàm sayHi
r.context.now = () => new Date(); // Hàm now
r.context.sum = (a, b) => a + b; // Hàm sum

// Lưu lịch sử khi dùng .save
// defineCommand(name, object): Dùng để tạo lệnh đặc biệt trong REPL bắt đầu bằng dấu . như .save
r.defineCommand("save", {
    help: "Save history to file history.txt",
    // action(): Là hàm thực thi khi người dùng gõ .save.
    action () {
        const histFile = path.join(__dirname, "history.txt"); // Đường dẫn đến file history.txt
        fs.writeFileSync(histFile, r.lines.join("\n")); // Ghi lại lịch sử vào file history.txt
        console.log(`History saved in ${histFile}`);
        
        this.displayPrompt(); // Hiển thị lại dấu nhắc lệnh sau khi lưu
    }
});
```
Minh hoạ chạy thử:
![](screenshots/5.png)

## 2. Phần 12–14: Command line
**Câu 1**: Làm sao nhận input từ `process.argv`?
>`process.argv` là một array trong Node.js chứa các tham số được truyền khi bạn chạy chương trình từ dòng lệnh.


Vì sao lại cần `process.argv`:
- Để nhận đối số từ dòng lệnh
- Dùng cho các công cụ CLI, tool dòng lệnh, script tự động
- Giúp chương trình linh hoạt hơn (không cần chỉnh sửa code khi muốn nhập khác)

Làm sao để nhận input từ `process.argv`: `process.argv[2+]` là các đối số ta truyền vào

**Câu 2**: Khác biệt giữa `stdout` và `stderr`?
Trong bất kỳ chương trình dòng lệnh (CLI) nào đều có 3 luồng (streams) mặc định là:
- stdin, nhận dữ liệu từ bàn phím (input)
- stdout, gửi dữ liệu ra màn hình (output thường)
- stderr, gửi thông báo lỗi ra màn hình

Khác biệt giữa `stdout` và `stderr`?
- `stdout`: Dùng để in các thông báo bình thường mà bạn muốn người dùng thấy. Lệnh thường dùng `console.log`
- `stderr`: Dùng để in thông báo lỗi hoặc cảnh báo, tách biệt khỏi kết quả thông thường. Lệnh thường dùng `console.error`

**Câu 3**: Cách dùng `readline`?
`readline` là một module có sẵn trong `Node.js`, dùng để:
-  Tạo ra giao diện tương tác với người dùng thông qua dòng lệnh (command line)
- Cho phép chương trình nhận input từ bàn phím (qua stdin) và hiển thị phản hồi ra màn hình (qua stdout)

Cách dùng `readline`:
- Interface: Tạo một "giao diện" để đọc từng dòng văn bản nhập vào từ người dùng.
- Input, output (thường là process.stdin, process.stdout)
- Phương thức question(): Đặt câu hỏi và chờ người dùng nhập câu trả lời.
- Sự kiện line và close: Dùng để xử lý dòng được nhập và kết thúc chương trình. 

**Bài tập**
1. Viết file `sum.js` tính tổng 2 số từ dòng lệnh.
```
// sum.js
const a = Number(process.argv[2]);
const b = Number(process.argv[3]);

console.log(`Tong cua ${a} va ${b} la: ${a + b}`);
```
Kết quả:
![](screenshots/6.png)

2. Dùng `readline` hỏi tên và in ra `Hello <tên>`.
```
// hello.js
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.question('Nhap ten cua ban: ', (name) => {
    console.log(`Hello ${name}`);
    rl.close();
});
```
Kết quả
![](screenshots/7.png)

3. Bài tập nâng cao
```
// csv-summarizer.js
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
```
Kết quả:
![](screenshots/8.png)

## 3. Phần 15–27: npm & npx
**Câu 1**: `dependencies` vs `devDependencies`?
- `dependencies`: là các gói mà ứng dụng yêu cầu trong quá trình sản xuất, cài đặt: `npm install <package>`
- `devDependencies`: Các gói chỉ cần thiết cho việc phát triển mà thử nghiệm cục bộ (nodemon, eslint, vite), cài đặt: `npm install <package> --save-dev hoặc -D`

**Câu 2**: Khi nào dùng `npx`?
`npx` là công cụ CLI đi kèm với `npm` giúp **chạy trực tiếp một package mà không cần cài đặt toàn cục**.
Ví dụ: Có 2 cách để chạy `prisma studio`:
- Cách 1 là cài toàn cục: (Không phổ biến lắm do gây rác hệ thống, dễ gây lỗi version nếu dùng nhiều project)
```
npm install -g prisma
prisma studio
```
- Cách 2 là dùng `npx`: `npx prisma studio`, npx sẽ kiểm tra trong node_modules xem đã cài prisma hay chưa, nếu cài rồi sẽ dùng bản cục bộ để chạy. Nếu chưa cài npx sẽ tải gói prisma tạm thời và chạy lệnh studio, gói này sẽ bị xoá sau khi chạy xong.

Ưu điểm của `npx`: chạy tool nhanh, tránh rác hệ thống, dễ thử version khác nhau

**Câu 3**: Tác dụng của `package-lock.json`?
Là file tự động tạo bởi `npm`, dùng để ghi lại chính xác **version** và **cấu trúc phụ thuộc** của toàn bộ thư viện trong dự án, file này ghi lại:
- Phiên bản **chính xác** của từng package
- Cấu trúc cây phụ thuộc
- URL tải về từng package

Tác dụng chính:
- Đảm bảo cài đúng `version` trên mọi máy -> Tránh lỗi xung đột version
- Tăng tốc cài đặt do npm dùng cache từ `package-lock.json`

**Bài tập**:
1. Bài tập nhỏ: Tạo `package.json`, cài `chalk`, in dòng màu, tạo script hello-cli gọi bằng npx.
`package.json`:
```

```

`hello.js`: (Trong thư mục hello-cli)
```
#!/usr/bin/env node
// giúp file này có thể chạy như một lệnh trong terminal (nếu được gọi bằng npx hoặc đã cấp quyền thực thi)

import chalk from "chalk";

console.log(chalk.green('Hello from your CLI tool!'));
console.log(chalk.blue.bold('This text is blue and bold.'));
console.log(chalk.red('Let\'s go!'));
```
2. Bài tập nâng cao (folder slugify-cli)
```
// bin/index.js

#!/usr/bin/env node
// Dòng #!/usr/bin/env node để file CLI chạy bằng npx.
import slugify from "../lib/slugify.js";

// slice(2) để bỏ qua 2 tham số đầu tiên là đường dẫn đến node và đường dẫn đến file script
// join(" ") để nối các tham số lại thành một chuỗi
const input = process.argv.slice(2).join(" ");

const output = slugify(input);
console.log(output);
```

```
// lib/slugify.js
function slugify(string) {
  return string
    .normalize("NFD") // Chuẩn hóa Unicode
    .replace(/[\u0300-\u036f]/g, "") // Xóa dấu
    .toLowerCase() // Chuyển thành chữ thường 
    .trim() // Xóa khoảng trắng đầu cuối
    .replace(/[^a-z0-9 -]/g, "") // Chỉ giữ lại chữ thường, số và dấu gạch ngang
    .replace(/\s+/g, "-") // Thay khoảng trắng bằng dấu gạch ngang
}

export default slugify;
```

Kết quả:
![](screenshots/9.png)

## 4. Phần 28–32: Event Loop

**Câu 1**: `process.nextTick()` vs `setTimeout()?`
- `process.nextTick()`: Ưu tiên ngay lập tức, thường dùng cho callback kế tiếp.
- `setTimeout()`: Dù delay = 0, vẫn lùi lại ít nhất 1 vòng event loop
```
console.log('Start');

process.nextTick(() => {
    console.log('Next Tick Callback');
});

setTimeout(() => {
    console.log('Timeout Callback');
}, 0);

console.log('End');
```
Kết quả:
![](screenshots/10.png)

Giải thích:
- `console.log('Start') và 'End'` là đồng bộ, chạy đầu tiên.

- `process.nextTick()` sẽ chạy ngay sau code đồng bộ, trước cả `setTimeout()` dù delay là 0.


**Câu 2**: Stack và queue khác gì nhau?
- Stack: LIFO (Last In, First Out), dùng để gọi hàm, thực thi lệnh (Call Stack)
- Queue: FIFO (First In, First Out), thường dùng xử lý event/callback/asynchronous tasks

Trong JavaScript:
- Stack dùng cho xử lý đồng bộ.
- Queue dùng cho xử lý bất đồng bộ (event/callback queue).

**Câu 3**: Dùng `setImmediate()` khi nào?
`setImmediate()` là một API của Node.js dùng để **thực hiện callback bất đồng bộ**, sau khi I/O đã hoàn tất hoặc **ngay sau vòng lặp hiện tại của event loop**.

Khi nào dùng `setImmediate()`:
- Khi muốn hoãn một tác vụ đến vòng event loop kế tiếp, nhưng sau I/O
- Khi cần tránh chặn luồng chính hoặc call stack bị đầy
- Khi bạn cần thực thi một callback ngay sau các tác vụ I/O (fs, net, stream, etc.)

>`Ưu tiên: process.nextTick() (Trước bất kỳ task bất đồng bộ nào) > setImmediate() (	Sau I/O, trước setTimeout)> setTimeout(fn, 0)`

**Bài tập**
1. Viết đoạn code so sánh thứ tự log của nextTick, setTimeout, setImmediate
```
console.log('Start');

setTimeout(() => {
  console.log('setTimeout');
}, 0);

setImmediate(() => {
  console.log('setImmediate');
});

process.nextTick(() => {
  console.log('process.nextTick');
});

console.log('End');
```

Kết quả: 
![](screenshots/11.png)

2. Bài tập nâng cao: Viết script đo thời gian thực thi:

- Mỗi lần chạy sẽ tạo 100 setTimeout(fn, 0), setImmediate, process.nextTick.
- Ghi lại thứ tự thực thi và tổng thời gian mất bao lâu.
- Bonus: Cho phép config số vòng lặp bằng tham số dòng lệnh.

```
// execution-timing.js
const { performance } = require("perf_hooks");

// Nhận tham số vòng lặp từ dòng lệnh, mặc định là 100
const iterations = parseInt(process.argv[2]) || 100;

const log = [];
const start = performance.now();

let count = 0;
function checkDone() {
  count++;
  if (count === iterations * 3) {
    const end = performance.now();
    console.log(`\n--- Kết quả sau ${iterations} vòng ---`);
    console.log(log.join("\n"));

    console.log(`\nTổng thời gian: ${(end - start).toFixed(2)} ms`);
  }
}

for (let i = 0; i < iterations; i++) {
  process.nextTick(() => {
    log.push(`nextTick [${i}]`);
    checkDone();
  });

  setTimeout(() => {
    log.push(`setTimeout [${i}]`);
    checkDone();
  }, 0);

  setImmediate(() => {
    log.push(`setImmediate [${i}]`);
    checkDone();
  });
}
```
Kết quả:
![](screenshots/12.png)

Nhận xét: `setTimeout` và `setImmediate` không đảm bảo thứ tự tuyệt đối nếu không có I/O blocking.

## 5. Phần 33-40: fs, path, os
**Câu 1**: `fs.readFileSync()` vs `fs.readFile()`
- `fs.readFileSync(path)`: Đồng bộ, khi muốn đọc file **ngay lập tức** và **chấp nhận** việc tạm dừng các thao tác khác trong chương trình
- `fs.readFile(path)`: Bất đồng bộ, khi muốn đọc file **không chặn** luồng xử lý chính. Trong thực tế luôn ưu tiên hàm này

**Câu 2**: `path.join(...)` dùng để làm gì
Dùng để nối các phần của đường dẫn thành 1 đường dẫn hoàn chỉnh, tự động xử lý dấu `/` hoặc `\` tùy theo hệ điều hành.

**Lý do dùng**: Viết code đa nền tảng mà không cần lo lắng về dấu `/` hay `\`.
Ví dụ:
```
const path = require('path');
const fullPath = path.join(__dirname, 'data', 'file.txt');
console.log(fullPath);
```
Trả về sẽ có dạng: `C:\project\data\file.txt`

**Câu 3**: Dùng `os.totalmem()` để làm gì?
Trả về **tổng dung lượng RAM vật lý** (tính bằng byte) của máy tính bạn đang chạy.
```
// os.js
const os = require('os');
console.log(`Ram: ${os.totalmem() / 2 ** 30} GB`);
```
Kết quả:
![](screenshots/13.png)

**Bài tập**:
1. Viết script ghi `log.txt` với dòng Hello at <timestamp>.
```
// write-log.js
const fs = require("fs");
const path = require("path");

const logPath = path.join(__dirname, "log.txt");
const timestamp = new Date().toISOString();

const logMessage = `Hello at ${timestamp}\n`;
fs.appendFileSync(logPath, logMessage, "utf-8");
console.log(`Log written to log.txt`);
```
Kết quả:
```
// log.txt
Hello at 2025-04-16T08:42:05.861Z
```

2. Viết công cụ log-archiver.js:
- Lấy tất cả file .log trong thư mục /logs
- Đổi tên theo format log_YYYYMMDD_HHMM.log
- Nén các log này thành .zip → /archives

```
log-archiver/log-archiver.js

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
```
Kết quả:
![](screenshots/14.png)