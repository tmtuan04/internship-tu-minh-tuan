import { createContext } from "react";
import { CartContextType } from "../types/cartTypes";

export const CartContext = createContext<CartContextType>({
  cart: [],
  dispatch: () => {},
});