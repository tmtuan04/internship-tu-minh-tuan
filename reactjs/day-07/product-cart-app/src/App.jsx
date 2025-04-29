import React, { useState, useEffect } from 'react';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import AddProductForm from './components/AddProductForm';
import './App.css';

const App = () => {

  // Sử dụng lazy initialization trong useState
  // Kiểm tra và lấy dữ liệu từ localStorage ngay khi khởi tạo state
  // Nếu không có dữ liệu, trả về mảng rỗng []
  const [products, setProducts] = useState(() => {
    const storedProducts = localStorage.getItem('products');
    return storedProducts ? JSON.parse(storedProducts) : [];
  });
  
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : [];
  });

  useEffect(() => {
    const storedProducts = localStorage.getItem('products');
    const storedCart = localStorage.getItem('cart');

    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    }
  
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  // Lưu vào localStorage mỗi khi products thay đổi
  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  // Lưu vào localStorage mỗi khi cart thay đổi
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const handleAddToCart = (product) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      const updatedCart = cart.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const handleUpdateCartItem = (productId, quantity) => {
    if (quantity <= 0) {
      setCart(cart.filter(item => item.id !== productId));
    } else {
      setCart(cart.map(item =>
        item.id === productId ? { ...item, quantity } : item
      ));
    }
  };

  const handleAddProduct = (newProduct) => {
    const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
    setProducts([...products, { ...newProduct, id: newId }]);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">🛒 Product & Cart App</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Product List */}
        <div className="md:col-span-2">
          <ProductList products={products} onAddToCart={handleAddToCart} />
        </div>

        {/* Cart */}
        <div>
          <Cart cartItems={cart} onUpdateCartItem={handleUpdateCartItem} />
        </div>
      </div>

      {/* Add Product Form */}
      <div className="mt-10">
        <AddProductForm onAddProduct={handleAddProduct} />
      </div>
    </div>
  );
};

export default App;