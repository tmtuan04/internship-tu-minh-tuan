import dotenv from "dotenv";
import db from "../config/db.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils.js";

dotenv.config();

export const signup = async (req, res) => {
  const { email, name, password } = req.body;
  try {
    const [existing] = await db.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    if (existing.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await db.query(
      "INSERT INTO users (email, name, password) VALUES (?, ?, ?)",
      [email, name, hashedPassword]
    );

    const userId = result[0].insertId;
    const token = generateToken(userId);

    res.status(201).json({ message: "User created successfully", id: userId, email: email, name: name,token: token });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const [user] = await db.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    if (user.length === 0) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const isPasswordValid = await bcrypt.compare(password, user[0].password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = generateToken(user[0].id);
    res
      .status(200)
      .json({ message: "Login successful", id: user[0].id, email: email, token: token });
  } catch (error) {
    console.error("Error during signin:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
