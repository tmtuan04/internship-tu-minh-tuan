const http = require("http");

// Cấu hình options cho requet
const options = {
  hostname: "jsonplaceholder.typicode.com",
  path: "/posts/1",
  method: "GET",
};

// Tạo request
const req = http.request(options, (res) => {
    console.log(`Status Code: ${res.statusCode}`);

    let data = '';
    // Nhận dữ liệu từ response
    res.on('data', (chunk) => {
        data += chunk;
    })

    // Kết thúc response
    res.on('end', () => {
        console.log('Response:', JSON.parse(data));
    });

    // Xử lý lỗi nếu có
    res.on('error', (error) => {
        console.error('Error:', error);
    });
})

req.end(); // Kết thúc request