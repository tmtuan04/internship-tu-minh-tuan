const os = require('os');
console.log(`Ram: ${os.totalmem() / 2 ** 30} GB`);