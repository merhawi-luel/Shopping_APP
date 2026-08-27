export default function CartItem({ item, dispatch }) {
  function handleIncrease() {
    dispatch({ type: "UPDATE_QUANTITY", payload: { id: item.id, quantity: item.quantity + 1 } });
  }

  function handleDecrease() {
    if (item.quantity > 1) {
      dispatch({ type: "UPDATE_QUANTITY", payload: { id: item.id, quantity: item.quantity - 1 } });
    }
  }

  function handleRemove() {
    dispatch({ type: "REMOVE_ITEM", payload: { id: item.id } });
  }

  return (
    <div className="cart-item">
      <div className="cart-item-info">
        <h3>{item.name}</h3>
        <p>${item.price}</p>
      </div>

      <div className="cart-item-controls">
        <button onClick={handleDecrease}>-</button>
        <span>{item.quantity}</span>
        <button onClick={handleIncrease}>+</button>
        <button onClick={handleRemove}>Remove</button>
      </div>
    </div>
  );
}