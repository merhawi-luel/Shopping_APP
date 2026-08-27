import { Link } from "react-router-dom";
import useCart from "../hooks/useCart";
import CartItem from "../components/cart/CartItem";
import OrderSummary from "../components/cart/OrderSummary";

export default function Cart() {
  const { cartItems, dispatch } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="empty-cart">
        <p>Your cart is empty.</p>
        <Link to="/shop">Continue shopping</Link>
      </div>
    );
  }

  function handleClearCart() {
    if (window.confirm("Are you sure you want to clear your cart?")) {
      dispatch({ type: "CLEAR_CART" });
    }
  }

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>

      {cartItems.map((item) => (
        <CartItem key={item.id} item={item} dispatch={dispatch} />
      ))}

      <button onClick={handleClearCart}>Clear Cart</button>

      <OrderSummary cartItems={cartItems} />
    </div>
  );
}