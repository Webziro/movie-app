import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import "../css/NavBar.css";

function NavBar() {
    const { token, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    
    const handleLogout = (e) => {
        e.preventDefault();
        logout();
        navigate('/login');
    };
    
    return (
        <nav className="navbar">
            <div className="navbar-brand"> < Link to ="/"> Movie App</Link> </div>
            <div className="navbar-brand"> 
                {!token && < Link to ="/" className="nav-link"> Register</Link>}
                < Link to ="/favorites" className="nav-link"> Favorites</Link>
                < Link to ="/contact" className="nav-link"> Contact </Link>
                {token ? (
                    <a href="#" onClick={handleLogout} className="nav-link"> Logout </a>
                ) : (
                    < Link to ="/login" className="nav-link"> Login </Link>
                )}
                </div>
            </nav>
    );
}

export default NavBar;