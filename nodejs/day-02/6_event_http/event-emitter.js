const EventEmitter = require('events');
const emitter = new EventEmitter();

// Sử dụng .on() - lắng nghe nhiều lần
emitter.on("click", () => {
    console.log("Click event handle by .on()");
});

// Sử dụng .once() - Lắng nghe 1 lần
emitter.once("click", () => {
    console.log("Click event handle by .once()");
});

// Phát sự kiện
emitter.emit("click"); // In ra cả 2 message

// Chỉ in ra message của .on()
// vì .once() đã được xóa bỏ sau khi phát sự kiện đầu tiên
emitter.emit("click");