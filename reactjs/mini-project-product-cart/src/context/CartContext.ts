import { createContext } from "react";
import { CartContextType } from "../types/cartTypes";

// 1. Context API
export const CartContext = createContext<CartContextType>({
  cart: [],
  dispatch: () => {}, // () => {} là một hàm rỗng, tức là gọi nó không làm gì cả.
});