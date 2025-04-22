import db from "../config/db.js";

export const getAllUsers = async (req, res) => {
  try {
    const [users] = await db.query("SELECT * FROM users");
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Khóa/mở tài khoản: PATCH /admin/users/:id/lock
export const lockUser = async (req, res) => {
    const { id } = req.params;
    const { isLocked } = req.body; // true or false
    
    try {
        const [user] = await db.query("SELECT * FROM users WHERE id = ?", [id]);
        if (user.length === 0) {
        return res.status(404).json({ message: "User not found" });
        }
    
        await db.query("UPDATE users SET is_Locked = ? WHERE id = ?", [isLocked, id]);
    
        res.status(200).json({ message: `User ${isLocked ? "locked" : "unlocked"} successfully` });
    } catch (error) {
        console.error("Error locking/unlocking user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}