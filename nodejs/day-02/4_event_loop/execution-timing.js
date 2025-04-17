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
