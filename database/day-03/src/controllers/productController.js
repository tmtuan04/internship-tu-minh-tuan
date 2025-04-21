import db from "../config/db.js";

export const getAllProducts = (req, res) => {
  db.query("SELECT * FROM products", (err, results) => {
    if (err) {
      console.error("Error fetching products:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
    res.json(results);
  });
};

export const createProduct = (req, res) => {
  const { name, price, description, stock } = req.body;
  db.query(
    "INSERT INTO products (name, price, description, stock) VALUES (?, ?, ?, ?)",
    [name, price, description, stock],
    (err, results) => {
      if (err) {
        console.error("Error creating product:", err);
        return res.status(500).json({ error: "Internal server error" });
      }
      res.status(201).json({
        id: results.insertId,
        name,
        price,
        description,
        stock,
      });
    }
  );
};

export const updateProduct = (req, res) => {
  const { id } = req.params;
  const { name, price, description, stock } = req.body;
  db.query(
    "UPDATE products SET name = ?, price = ?, description = ?, stock = ? WHERE id = ?",
    [name, price, description, stock, id],
    (err, results) => {
      if (err) {
        console.error("Error updating product:", err);
        return res.status(500).json({ error: "Internal server error" });
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ error: "Product not found" });
      }
      res.json({
        id,
        name,
        price,
        description,
        stock,
      });
    }
  );
}

export const deleteProduct = (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM products WHERE id = ?", [id], (err, results) => {
    if (err) {
      console.error("Error deleting product:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  });
}