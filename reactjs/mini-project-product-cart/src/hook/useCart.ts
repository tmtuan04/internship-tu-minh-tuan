import { useContext } from "react";
import { CartContext } from "../context/CartContext";

// Hook này giúp dễ dàng dùng cart và dispatch trong component bằng cách
export const useCart = () => useContext(CartContext);