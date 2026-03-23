import { Link, useLocation } from "react-router-dom";
import "../css/NavBar.css"

function NavBar()
{

    const location = useLocation();

    const handleHomeClick = (e) => {
        // In React Router, the home path inside the basename is always just "/"
        if (location.pathname === "/") {
            window.location.reload();
        }
    };

    return(
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/" onClick={handleHomeClick}>Movie App</Link>
            </div>
            <div className="navbar-links">
                <Link to="/"  className="nav-link" onClick={handleHomeClick}>Home</Link>
                <Link to="/favorites" className="nav-link">Favorites</Link>
            </div>
        </nav>
    );
}

export default NavBar;