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
