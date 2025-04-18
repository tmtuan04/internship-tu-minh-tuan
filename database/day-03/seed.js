import db from "./src/db.js";

// Data gen từ ChatGPT
const products = [
  {
    name: "Laptop Dell XPS 13",
    price: 1299.99,
    description: "Laptop cao cấp với thiết kế mỏng nhẹ, hiệu năng mạnh mẽ.",
    stock: 15,
  },
  {
    name: "Chuột Logitech MX Master 3",
    price: 99.99,
    description: "Chuột không dây tiện dụng, đa chức năng.",
    stock: 40,
  },
  {
    name: "Bàn phím cơ Keychron K6",
    price: 89.99,
    description: "Bàn phím cơ không dây nhỏ gọn, hỗ trợ cả Mac và Windows.",
    stock: 30,
  },
  {
    name: 'Màn hình LG UltraWide 34"',
    price: 399.99,
    description: "Màn hình cong siêu rộng, lý tưởng cho công việc đa nhiệm.",
    stock: 10,
  },
  {
    name: "Tai nghe Sony WH-1000XM4",
    price: 299.99,
    description: "Tai nghe chống ồn tốt nhất, pin lâu, âm thanh tuyệt vời.",
    stock: 25,
  },
];

products.forEach((product) => {
  const { name, price, description, stock } = product;
  db.query(
    "INSERT INTO products (name, price, description, stock) VALUES (?, ?, ?, ?)",
    [name, price, description, stock],
    (err) => {
      if (err) {
        console.error("Error inserting product:", err);
      } else {
        console.log(`Inserted product: ${name}`);
      }
    }
  );
});