export default function OrderSummary({ cartItems }) {
  const itemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const tax = subtotal * 0.15;

  const total = subtotal + tax;

  return (
    <div className="order-summary">
      <h2>Order Summary</h2>
      <div className="order-summary-row">
        <span>Items</span>
        <span>{itemCount}</span>
      </div>
      <div className="order-summary-row">
        <span>Subtotal</span>
        <span>${subtotal.toFixed(2)}</span>
      </div>
      <div className="order-summary-row">
        <span>Tax (15%)</span>
        <span>${tax.toFixed(2)}</span>
      </div>
      <div className="order-summary-total">
        <span>Total</span>
        <span>${total.toFixed(2)}</span>
      </div>
      <button>Proceed to Checkout</button>
    </div>
  );
}