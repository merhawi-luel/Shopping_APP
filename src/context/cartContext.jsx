import { createContext, useReducer } from "react";
import cartReducer from "./cartReducer";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, []);

  return (
    <CartContext.Provider value={{ cartItems: state, dispatch: dispatch }}>
      {children}
    </CartContext.Provider>
  );
}