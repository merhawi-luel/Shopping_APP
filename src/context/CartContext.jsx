import { createContext, useReducer, useEffect } from "react";
import cartReducer from "./cartReducer";

export const CartContext = createContext();

export function CartProvider({ children }) {
  function getInitialCart() {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  }

  const [state, dispatch] = useReducer(cartReducer, [], getInitialCart);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state));
  }, [state]);

  return (
    <CartContext.Provider value={{ cartItems: state, dispatch: dispatch }}>
      {children}
    </CartContext.Provider>
  );
}