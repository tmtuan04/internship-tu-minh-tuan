import { BrowserRouter, Routes, Route } from "react-router";
import { Toaster } from "react-hot-toast"; // Import ToastContainer
import './App.css'

import { HomePage } from './pages/HomePage'
import { ProductPage } from "./pages/ProductPage";
import { CartPage } from "./pages/CartPage";

import Header from "./components/Header";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />

      </Routes>
      <Toaster position="bottom-right"/>
    </BrowserRouter>
  )
}