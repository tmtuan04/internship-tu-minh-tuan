import db from "./src/config/db.js";

// Mảng dữ liệu mẫu
const products = [
  {
    name: "Laptop Lenovo ThinkPad X1",
    price: 1500.0,
    stock: 10,
    description: "High-end business laptop with great performance.",
    category: "Electronics",
  },
  {
    name: "Wireless Mouse Logitech",
    price: 29.99,
    stock: 50,
    description: "Comfortable wireless mouse with long battery life.",
    category: "Accessories",
  },
  {
    name: "Office Chair Ergonomic",
    price: 199.99,
    stock: 20,
    description: "Ergonomic chair suitable for long working hours.",
    category: "Furniture",
  },
  {
    name: "Standing Desk Adjustable",
    price: 399.0,
    stock: 5,
    description: "Electric standing desk with adjustable height.",
    category: "Furniture",
  },
  {
    name: "Noise Cancelling Headphones",
    price: 249.0,
    stock: 15,
    description: "Over-ear headphones with active noise cancellation.",
    category: "Electronics",
  },
];

products.forEach(async (product) => {
  try {
    const result = await db.query(
      "INSERT INTO products (name, price, stock, description, category) VALUES (?, ?, ?, ?, ?)",
      [
        product.name,
        product.price,
        product.stock,
        product.description,
        product.category,
      ]
    );
    console.log("Inserted product:", result);
  } catch (error) {
    console.error("Error inserting product:", error);
  }
});