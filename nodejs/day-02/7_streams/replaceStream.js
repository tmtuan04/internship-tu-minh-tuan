const fs = require("fs");
const { Transform } = require("stream");

const inputFilePath = "input2.txt";
const outputFilePath = "output2.txt";

//  Transform stream để thay thế "ERROR" bằng "⚠️ Warning"
const replaceTransform = new Transform({
  transform(chunk, encoding, callback) {
    const chunkString = chunk.toString(); // CHUYỂN buffer thành string
    const replaced = chunkString.replace(/ERROR/g, "⚠️ Warning");
    callback(null, replaced);
  },
});

// Readable và Writable streams
const readStream = fs.createReadStream(inputFilePath, { encoding: "utf8" });
const writeStream = fs.createWriteStream(outputFilePath, { encoding: "utf8" });

// Kết nối các stream lại với nhau
readStream
  .pipe(replaceTransform)
  .pipe(writeStream)
  .on("finish", () => {
    console.log("File processed successfully!!");
  })
  .on("error", (err) => {
    console.error("Error:", err);
  });
