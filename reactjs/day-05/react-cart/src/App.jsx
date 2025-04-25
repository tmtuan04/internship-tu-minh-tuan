import React, { useState } from "react";
import "./App.css";
import { Cart } from "./components/Cart";
import { ProductList } from "./components/ProductList";

const App = () => {
  const [cartItems, setCartItems] = useState([]);

  const handleAddToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      console.log(existingItem);

      if (existingItem) {
        // Nếu đã có sản phẩm, cập nhật số lượng
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Nếu chưa có, thêm mới với quantity = 1
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gray-50">
      <h1 className="text-center text-3xl font-bold text-[#161179] mb-8">
        🛒 Tuan Shop
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-6xl mx-auto">
        <Cart cartItems={cartItems} />
        <ProductList onAddToCart={handleAddToCart} />
      </div>
    </div>
  );
};

export default App;
