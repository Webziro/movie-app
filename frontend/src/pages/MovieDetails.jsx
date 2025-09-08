import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchMovieDetails } from "../services/api";
import { useMovies } from "../contexts/MovieContext.jsx";
import "../css/MovieCard.css";

function MovieDetails() {
  const { addToFavorites, removeFromFavorites, isFavorite } = useMovies();
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getDetails() {
      const data = await fetchMovieDetails(id);
      setMovie(data);
      setLoading(false);
    }
    getDetails();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!movie) return <div>Movie not found.</div>;

  const favorite = isFavorite(movie.id);
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Image";

  function onfavoriteClick(e) {
    e.preventDefault();
    if (favorite) {
      removeFromFavorites(movie.id);
    } else {
      addToFavorites(movie);
    }
  }

  return (
    <div className="movie-details-page">
      <h2>{movie.title}</h2>
      <div className="movie-card" style={{ maxWidth: 500, margin: "0 auto" }}>
        <div className="movie-poster">
          <img src={posterUrl} alt={movie.title} />
          <div className="movie-overlay" style={{ opacity: 1 }}>
            <button
              className={`favorite-btn${favorite ? " active" : ""}`}
              onClick={onfavoriteClick}
              aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
              style={favorite ? { color: '#ff4757' } : {}}
            >
              ❤️
            </button>
          </div>
        </div>
        <div className="movie-info">
          <p>{movie.overview}</p>
          {/* Add more details as needed */}
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;