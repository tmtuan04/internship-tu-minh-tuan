import morgan from "morgan";
import fs from "fs";
import path from "path";

const accessLogStream = fs.createWriteStream(path.join("access.log"), { flags: "a" });

export const devLogger = morgan("dev");
export const fileLogger = morgan("combined", { stream: accessLogStream });