import "../css/MovieCard.css";
import {useMovies} from '../contexts/MovieContext.jsx'

function MovieCard({movie}){
    const {favorites, addToFavorites, removeFromFavorites, isFavorite} = useMovies();
    const favorite = isFavorite(movie.id); // This line remains unchanged
    
    function onfavoriteClick(e){
        e.preventDefault();
        if(favorite){
            removeFromFavorites(movie.id);
        } else {
            addToFavorites(movie);
        }
    }

    // TheMovieDB poster base URL
    const posterUrl = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : "https://via.placeholder.com/500x750?text=No+Image";

    return (
        <div className="movie-card">
            <div className="movie-poster">
                <img src={posterUrl} alt={movie.title} />
                <div className="movie-overlay">
                    <button
                        className={`favorite-btn${favorite ? " active" : ""}`}
                        onClick={onfavoriteClick}
                        aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
                    >
                        ❤️
                    </button>
                </div>
            </div>
            <div className="movie-info">
                <h3 className="movie-title">{movie.title}</h3>
                <p>{movie.release_date ?.split("-")[0]}</p>
            </div>
        </div>
    );
}

export default MovieCard;
