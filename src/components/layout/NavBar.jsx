import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import useCart from "../../hooks/useCart";
import "../../styles/NavBar.css";

export default function Navbar() {
  const { cartItems } = useCart();
 const totalItems = cartItems.reduce((accumulator, currentItem) => {
  return accumulator + currentItem.quantity;
}, 0);

  return (
    <nav className="navbar">
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/shop">Shop</Link>
      </div>
      <Link to="/cart" className="cart-link">
        <ShoppingCart size={20} />
        {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
      </Link>
    </nav>
  );
}