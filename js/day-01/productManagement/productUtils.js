// productUtils.js

// Thêm sản phẩm mới
export const addProduct = (products, product) => [...products, product];

// Xóa sản phẩm theo id
export const removeProductById = (products, id) =>
  products.filter(({ id: productId }) => productId !== id);

// Tính tổng giá
export const getTotalPrice = (products) =>
  products.reduce((total, { price }) => total + price, 0);

// Lấy danh sách tên sản phẩm
export const getProductNames = (products) => products.map(({ name }) => name);

// Tìm sản phẩm theo từ khóa trong tên
export const findProduct = (products, keyword) =>
  products.filter(({ name }) =>
    name.toLowerCase().includes(keyword.toLowerCase())
  );

// Lọc sản phẩm có giá cao hơn minPrice
export const getExpensiveProducts = (products, minPrice) =>
  products.filter(({ price }) => price > minPrice);
