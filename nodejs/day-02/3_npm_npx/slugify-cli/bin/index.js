#!/usr/bin/env node
// Dòng #!/usr/bin/env node để file CLI chạy bằng npx.
import slugify from "../lib/slugify.js";

// slice(2) để bỏ qua 2 tham số đầu tiên là đường dẫn đến node và đường dẫn đến file script
// join(" ") để nối các tham số lại thành một chuỗi
const input = process.argv.slice(2).join(" ");

const output = slugify(input);
console.log(output);