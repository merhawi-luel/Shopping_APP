import { Link } from "react-router-dom";
import useCart from "../hooks/useCart";
import CartItem from "../components/cart/CartItem";
import OrderSummary from "../components/cart/OrderSummary";
import "../styles/Cart.css";

export default function Cart() {
  const { cartItems, dispatch } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <h1>Your Cart</h1>
        <div className="empty-cart">
          <p>Your cart is empty.</p>
          <Link to="/shop">Continue shopping</Link>
        </div>
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

      <div className="cart-layout">
        <div className="cart-items-col">
          <div className="cart-items-list">
            {cartItems.map((item) => (
              <CartItem key={item.id} item={item} dispatch={dispatch} />
            ))}
          </div>
          <button className="clear-cart-btn" onClick={handleClearCart}>Clear Cart</button>
        </div>

        <aside className="cart-summary-col">
          <OrderSummary cartItems={cartItems} />
        </aside>
      </div>
    </div>
  );
}