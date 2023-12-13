import 'bootstrap/dist/css/bootstrap.min.css'

function Navbar({ title }: { title: string }) {

    return(
        <>
        <nav className="navbar">
            <a href="#" className="navbar-brand">Secret Santa</a>
            <ul className="nav justify-content-end">
            <li className="nav-item">
            <button className="btn btn-primary" type="submit">{title}</button>
            </li>
            </ul>
        </nav>
        </>
    )
}

export default Navbar