export default function OrderSummary({ cartItems }) {
  const itemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const tax = subtotal * 0.15;

  const total = subtotal + tax;

  return (
    <div className="order-summary">
      <p>Items: {itemCount}</p>
      <p>Subtotal: ${subtotal.toFixed(2)}</p>
      <p>Tax (15%): ${tax.toFixed(2)}</p>
      <p>Total: ${total.toFixed(2)}</p>
    </div>
  );
}