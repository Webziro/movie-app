import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard.jsx";
import "../css/Home.css";
import { fetchMovieRecommendations } from "../services/api.js";

function MovieRecommendations() {
  const { id } = useParams();
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    async function getRecommendations() {
      try {
        const data = await fetchMovieRecommendations(id);
        if (!isMounted) return;
        const list = Array.isArray(data) ? data : [];
        // Debug: surface what's being set
        console.log('Recommendations fetched:', { id, count: list.length, sample: list[0] });
        setRecommendations(list);
      } catch (e) {
        if (!isMounted) return;
        setError("Failed to load recommendations");
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    getRecommendations();
    return () => {
      isMounted = false;
    };
  }, [id]);

  if (loading) return <div style={{ padding: 16 }}>Loading recommendations...</div>;

  return (
    <div className="home">
      <div className="welcome-message" style={{ marginBottom: 12 }}>
        <Link to={`/movie/${id}`} style={{ textDecoration: "none" }}>
          <button>← Back to details</button>
        </Link>
      </div>
      <h2 style={{ marginBottom: 16 }}>Recommended Movies</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!error && recommendations.length === 0 && (
        <p>No recommendations found for this movie.</p>
      )}
      <div className="movies-grid">
        {recommendations.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default MovieRecommendations;