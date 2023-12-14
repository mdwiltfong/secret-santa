import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";


type NavbarProps = {
  title: string, path: string;
};
function Navbar({ title, path = "/" }: NavbarProps) {
  return (
    <>
      <nav className="navbar">
        <a href="#" className="navbar-brand">
          Secret Santa
        </a>
        <ul className="nav justify-content-end">
            <Link to={path} className="btn btn-primary">
              {title}
          </Link>
        </ul>
      </nav>
    </>
  );
}

export default Navbar;
