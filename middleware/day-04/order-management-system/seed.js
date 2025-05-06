import db from "./src/config/db.js";

// Mảng dữ liệu mẫu với ảnh thực tế
const products = [
  {
    name: "Laptop Lenovo ThinkPad X1",
    price: 1500.0,
    stock: 10,
    description: "High-end business laptop with great performance.",
    category: "Electronics",
    image: "https://laptopkhanhtran.vn/pic/product/ThinkPad-_638640830315610019_HasThumb.jpg"
  },
  {
    name: "Wireless Mouse Logitech",
    price: 29.99,
    stock: 50,
    description: "Comfortable wireless mouse with long battery life.",
    category: "Accessories",
    image: "https://product.hstatic.net/1000333506/product/gvn_logitech_gpro_wless_3d113e4c2ea74904bb2b01fd6d75be84_8e3405eb646e466a8bbffd12bf81134e.png"
  },
  {
    name: "Office Chair Ergonomic",
    price: 199.99,
    stock: 20,
    description: "Ergonomic chair suitable for long working hours.",
    category: "Furniture",
    image: "https://images-cdn.ubuy.co.in/633bc22597235258d52d0584-office-chair-felixking-ergonomic-desk.jpg"
  },
  {
    name: "Standing Desk Adjustable",
    price: 399.0,
    stock: 5,
    description: "Electric standing desk with adjustable height.",
    category: "Furniture",
    image: "https://www.vari.com/dw/image/v2/BDFT_PRD/on/demandware.static/-/Sites-vari-master-catalog/default/dwe7f95fef/images/large/DC-PP36/42431-black/vari-desktop-converter_42431_black_raised.jpg?sw=800&sh=800"
  },
  {
    name: "Noise Cancelling Headphones",
    price: 249.0,
    stock: 15,
    description: "Over-ear headphones with active noise cancellation.",
    category: "Electronics",
    image: "https://product.hstatic.net/1000259254/product/tai_nghe_bose_noise_cancelling_headphone_700-3_2a7f13b9fa6748b486a0fae71a9d098b_grande.jpg"
  },
];

products.forEach(async (product) => {
  try {
    const result = await db.query(
      "INSERT INTO products (name, price, stock, description, category, image) VALUES (?, ?, ?, ?, ?, ?)",
      [
        product.name,
        product.price,
        product.stock,
        product.description,
        product.category,
        product.image
      ]
    );
    console.log("Inserted product:", product.name);
  } catch (error) {
    console.error("Error inserting product:", product.name, error);
  }
});