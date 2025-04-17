#!/usr/bin/env node
// giúp file này có thể chạy như một lệnh trong terminal (nếu được gọi bằng npx hoặc đã cấp quyền thực thi)

import chalk from "chalk";

console.log(chalk.green('Hello from your CLI tool!'));
console.log(chalk.blue.bold('This text is blue and bold.'));
console.log(chalk.red('Let\'s go!'));