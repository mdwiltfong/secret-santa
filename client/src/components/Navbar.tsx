import "bootstrap/dist/css/bootstrap.min.css";
type NavbarProps = {
  title: string;
};
function Navbar({ title }: NavbarProps) {
  return (
    <>
      <nav className="navbar">
        <a href="#" className="navbar-brand">
          Secret Santa
        </a>
        <ul className="nav justify-content-end">
          <li className="nav-item">
            <button className="btn btn-primary" type="submit">
              {title}
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Navbar;
