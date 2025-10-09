import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext.jsx";
import "../css/NavBar.css";

function NavBar() {
    const { token, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    
    const handleLogout = (e) => {
        e.preventDefault();
        logout();
        // Replace current history entry and navigate to login
        navigate('/login', { replace: true });
        // Clear any remaining history by pushing a new state
        window.history.pushState(null, '', '/login');
    };
    
    return (
        <nav className="navbar">
            <div className="navbar-brand"> < Link to ="/home"> Movie App</Link> </div>
            <div className="navbar-brand"> 
                {!token && < Link to ="/" className="nav-link"> Register</Link>}
                < Link to ="/favorites" className="nav-link"> Favorites</Link>
                < Link to ="/movie-recommendations/:id" className="nav-link"> Movie Recommendations </Link>
                < Link to ="/contact" className="nav-link"> Contact </Link>
                < Link to ="/full-movies" className="nav-link"> Full Movies </Link>
                {token && < Link to ="/change-password" className="nav-link"> Change Password</Link>}
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