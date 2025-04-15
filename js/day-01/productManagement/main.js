import {
    addProduct,
    removeProductById,
    getTotalPrice,
    getProductNames,
    findProduct,
    getExpensiveProducts
  } from './productUtils.js';
  
  let products = [
    { id: 1, name: 'iPhone', price: 1000 },
    { id: 2, name: 'iPad', price: 800 },
    { id: 3, name: 'Macbook', price: 2000 }
  ];
  
  // Thêm sản phẩm mới
  const newProduct = { id: 4, name: 'Apple Watch', price: 500 };
  products = addProduct(products, newProduct);
  console.log('After adding:', products);
  
  // Xóa sản phẩm theo id
  products = removeProductById(products, 2);
  console.log('After removing id = 2:', products);
  
  // Tổng giá sản phẩm
  console.log('Total price:', getTotalPrice(products));
  
  // Danh sách tên sản phẩm
  console.log('Product names:', getProductNames(products));
  
  // Tìm sản phẩm chứa từ 'mac'
  console.log('Find "mac":', findProduct(products, 'mac'));
  
  // Lọc sản phẩm có giá > 900
  console.log('Expensive products (>900):', getExpensiveProducts(products, 900));
  