import { ReactNode, useReducer } from "react";
import { CartContext } from "./CartContext";
import { cartReducer, initialState } from "./CartReducer";

export const CartProvider = ({ children }: { children: ReactNode }) => {
  
  const [cart, dispatch] = useReducer(cartReducer, initialState);

  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};