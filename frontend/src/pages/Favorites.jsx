import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import "../css/Favorites.css";
import {useMovies} from '../contexts/MovieContext.jsx';
import MovieCard from '../components/MovieCard.jsx'


function Favorite() {
    const { token } = useContext(AuthContext);
    const navigate = useNavigate();
    const { favorites } = useMovies();

    useEffect(() => {
        if (!token) {
            navigate('/login');
        }
    }, [token, navigate]);

    // Don't render anything if not authenticated
    if (!token) { 
        return null;
    }

    if (!favorites || favorites.length === 0) {
        return (
            <div className="favorites-empty">
                <h2>No Favorite yet!</h2>
                <p>Start adding favorite movies!</p>
            </div>
        );
    }
    return (
        <div className="favorites">   
            <h2>Your Favorite Movies</h2>
            <div className="movies-grid">
                {favorites.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>
        </div>
    );
}

export default Favorite;