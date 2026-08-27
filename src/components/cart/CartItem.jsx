export default function CartItem({ item, dispatch }) {
  return (
    <div className="cart-item">
      <img src={item.image} alt={item.title} />
      <p>{item.title}</p>
      <p>${item.price}</p>

      <div className="quantity-stepper">
        <button
          onClick={() =>
            dispatch({
              type: "UPDATE_QUANTITY",
              payload: { id: item.id, quantity: item.quantity - 1 },
            })
          }
        >
          −
        </button>

        <span>{item.quantity}</span>

        <button onClick={()=>dispatch({
              type: "UPDATE_QUANTITY",
              payload: { id: item.id, quantity: item.quantity + 1 },
            })}>
          +
        </button>
      </div>

      <button
        onClick={() =>
          dispatch({ type: "REMOVE_ITEM", payload: { id: item.id } })
        }
      >
        Remove
      </button>
    </div>
  );
}