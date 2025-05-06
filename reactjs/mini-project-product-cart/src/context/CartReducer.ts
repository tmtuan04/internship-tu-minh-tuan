import { CartItem, CartAction } from "../types/cartTypes";

export const initialState: CartItem[] = JSON.parse(
  localStorage.getItem("cart") || "[]"
);

export function cartReducer(state: CartItem[], action: CartAction): CartItem[] {
  let updatedCart: CartItem[];

  switch (action.type) {
    case "ADD_ITEM": {
      const exists = state.find((item) => item._id === action.payload._id);
      updatedCart = exists
        ? state.map((item) =>
            item._id === action.payload._id
              ? { ...item, stock: item.stock + 1 }
              : item
          )
        : [...state, { ...action.payload, stock: 1 }];
      break;
    }

    case "REMOVE_ITEM": {
      updatedCart = state.filter((item) => item._id !== action.payload);
      break;
    }

    case "UPDATE_QUANTITY": {
      updatedCart = state
        .map((item) =>
          item._id === action.payload.id
            ? { ...item, stock: action.payload.stock }
            : item
        )
        .filter((item) => item.stock > 0);
      break;
    }

    default:
      updatedCart = state;
  }

  localStorage.setItem("cart", JSON.stringify(updatedCart));
  return updatedCart;
}