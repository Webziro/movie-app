import "../css/MovieCard.css";
import { Link, useNavigate } from "react-router-dom";
import {useMovies} from '../contexts/MovieContext.jsx'

function MovieCard({movie}){
    const {favorites, addToFavorites, removeFromFavorites, isFavorite} = useMovies();
    const favorite = isFavorite(movie.id); 
    const navigate = useNavigate();
    
    function onfavoriteClick(e){
        e.preventDefault();
        if(favorite){
            removeFromFavorites(movie.id);
            }else{
            addToFavorites(movie);
        }
    }

    function onWatchTrailerClick(e){
        e.preventDefault();
        navigate(`/watch-trailer/${movie.id}`);
    }

    function onReviewsClick(e){
        e.preventDefault();
        navigate(`/movie-reviews/${movie.id}`);
    }

    function onShareClick(e){
        e.preventDefault();
        const shareData = {
            title: movie.title,
            text: `Check out this movie: ${movie.title}`,
            url: `${window.location.origin}/movie/${movie.id}`
        };

        if (navigator.share) {
            navigator.share(shareData).catch(console.error);
        } else {
            // Fallback: copy to clipboard
            navigator.clipboard.writeText(shareData.url).then(() => {
                alert('Movie link copied to clipboard!');
            }).catch(() => {
                // Final fallback: show URL
                prompt('Copy this link:', shareData.url);
            });
        }
    }

    //Function Movie Recommendations
    function onRecommendationsClick(e) {
        e.preventDefault();
        navigate(`/movie-recommendations/${movie.id}`);
    }

    // TheMovieDB poster base URL
    const posterUrl = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : "https://via.placeholder.com/500x750?text=No+Image";

    return (
        <Link to={`/movie/${movie.id}`} style={{ textDecoration: "none", color: "inherit" }}>
            <div className="movie-card">
                <div className="movie-poster">
                    <img src={posterUrl} alt={movie.title} />
                    <div className="movie-overlay">
                        <button
                            className={`favorite-btn${favorite ? " active" : ""}`}
                            onClick={onfavoriteClick}
                            aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
                            style={favorite ? { color: '#ff4757' } : {}}
                        >
                            ❤️
                        </button>
                        <div className="action-buttons">
                            <button type="button" className="action-btn" onClick={onWatchTrailerClick} title="Watch trailer" aria-label="Watch trailer">▶</button>
                            <button type="button" className="action-btn" onClick={onReviewsClick} title="Reviews & ratings" aria-label="Reviews & ratings">📝</button>
                            <button type="button" className="action-btn" onClick={onShareClick} title="Share movie" aria-label="Share movie">🔗</button>
                            <button type="button" className="action-btn" onClick={onRecommendationsClick} title="Movie Recommendations" aria-label="Movie Recommendations">⭐</button>
                        </div>
                    </div>
                </div>
                <div className="movie-info">
                    <h3 className="movie-title">{movie.title}</h3>
                    <p>{movie.release_date ?.split("-")[0]}</p>
                </div>
            </div>
        </Link>
    );
}
export default MovieCard;

