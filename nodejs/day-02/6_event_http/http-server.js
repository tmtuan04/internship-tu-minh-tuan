const http = require('http');

http.createServer((req, res) => {
    // writeHead(statusCode, headers) là phương thức dùng để: gửi mã trạng thái + tiêu đề
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    // end() là phương thức dùng để: gửi nội dung phản hồi và kết thúc phản hồi
    res.end('Hello World');
}).listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});