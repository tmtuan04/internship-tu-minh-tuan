export const initialCartState = [];

export function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_TO_CART":
      return [...state, action.payload];

    case "REMOVE_FROM_CART": {
      const indexToRemove = state.findIndex(
        (item) => item.id === action.payload
      );
      if (indexToRemove === -1) return state;
      return [
        ...state.slice(0, indexToRemove),
        ...state.slice(indexToRemove + 1),
      ];
    }

    default:
      return state;
  }
}
