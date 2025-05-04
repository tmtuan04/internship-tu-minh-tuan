import { useReducer } from "react";
import { CartContext } from "./useCart";
import { cartReducer, initialCartState } from "./cartReducer";

export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, initialCartState);

  const addToCart = (product) => {
    dispatch({ type: "ADD_TO_CART", payload: product });
  };

  const removeFromCart = (id) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: id });
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};