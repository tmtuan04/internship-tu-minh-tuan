const fs = require('fs');
const EventEmitter = require('events');
const http = require('http');

// EventEmitter custom
class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();

myEmitter.on('request', (message) => {
    console.log(`[LOG] Request event: ${message}`);
    fs.appendFileSync('event.log', `[${new Date().toISOString()}] Request event: ${message}\n`);
});

// Tạo server đơn giản /hello => trả về chuỗi
const server = http.createServer((req, res) => {
    if (req.url === '/hello') {
        myEmitter.emit(`request`, `Access ${req.url}`);
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Hello from custom server!');
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});

server.listen(3000, () => { 
    console.log('Server is running at http://localhost:3000');
});