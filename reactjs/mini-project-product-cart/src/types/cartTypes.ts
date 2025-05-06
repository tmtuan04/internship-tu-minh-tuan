export interface CartItem {
  _id: string;
  name: string;
  price: string;
  stock: number;
  image: string
  description: string
}

export type CartAction =
  | { type: "ADD_ITEM"; payload: CartItem }
  | { type: "REMOVE_ITEM"; payload: string }
  | { type: "UPDATE_QUANTITY"; payload: { id: string; stock: number } };

export type CartContextType = {
  cart: CartItem[];
  dispatch: React.Dispatch<CartAction>;
};
