import React from "react";
import { Home } from "../src/pages/Home";
import { ProductDetail } from "../src/pages/ProductDetail";
import { CartProvider } from "../src/context/CartContext";
import CartPage from "../src/pages/CartPage";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router";
import Header from "../src/components/Header";

const App = () => {
  return (
    <CartProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
};

export default App;
