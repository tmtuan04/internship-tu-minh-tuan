const fs = require("fs");
const path = require("path");

const logPath = path.join(__dirname, "log.txt");
const timestamp = new Date().toISOString();

const logMessage = `Hello at ${timestamp}\n`;
fs.appendFileSync(logPath, logMessage, "utf-8");
console.log(`Log written to log.txt`);