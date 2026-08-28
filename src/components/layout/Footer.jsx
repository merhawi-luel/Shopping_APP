import "../../styles/Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} All rights reserved.</p>
    </footer>
  );
}
