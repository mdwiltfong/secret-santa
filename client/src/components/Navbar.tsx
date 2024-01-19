import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <>
      <nav className="navbar">
        <Link to="/" className="navbar-link">
          Secret Santa
        </Link>

        <ul className="nav justify-content-end">
          <Link to="/organize" className="border-underline">
            Organize
          </Link>
          <Link to="/buy" className="border-underline">
            Buy Gifts
          </Link>
          <Link to="/login" className="border-underline">
            Log in
          </Link>
        </ul>
      </nav>
    </>
  );
}

export default Navbar;
