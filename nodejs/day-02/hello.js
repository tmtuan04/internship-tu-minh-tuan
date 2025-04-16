const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.question('Nhap ten cua ban: ', (name) => {
    console.log(`Hello ${name}`);
    rl.close();
});