import { useState } from "react";
import { CartContext } from "./useCart";

// children là một props đặc biệt trong React, đại diện cho nội dung con được bao bọc bên trong component.
// Đây là pattern phổ biến khi dùng Context API trong React.
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prev) => [...prev, product]);
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item, index) => item.id !== id || index !== prev.findIndex(p => p.id === id)));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};