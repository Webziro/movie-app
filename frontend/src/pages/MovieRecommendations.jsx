import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchMovieDetails } from "../services/api.js";
import { useMovies } from "../contexts/MovieContext.jsx";
import "../css/MovieCard.css";

import { fetchMovieRecommendations } from "../services/api.js";

function MovieRecommendations() {
  const { id } = useParams();
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getRecommendations = async () => {
      const data = await fetchMovieRecommendations(id);
      setRecommendations(data);
      setLoading(false);
    };
    getRecommendations();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Recommended Movies</h2>
      <div className="movie-list">
        {recommendations.map((movie) => (
          <div key={movie.id} className="movie-card">
            <Link to={`/movies/${movie.id}`}>
              <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
              <h3>{movie.title}</h3>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MovieRecommendations;
    const favorite = isFavorite(movie.id);