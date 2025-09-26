//Movie Reviews and Ratings

import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchMovieReviews } from "../services/api";

function MovieReviews() {
    const { id } = useParams();
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        let isMounted = true;
        async function load() {
            try {
                const data = await fetchMovieReviews(id);
                if (!isMounted) return;
                setReviews(Array.isArray(data) ? data : []);
            } catch (e) {
                if (!isMounted) return;
                setError("Failed to load reviews");
            } finally {
                if (isMounted) setLoading(false);
            }
        }
        load();
        return () => {
            isMounted = false;
        };
    }, [id]);

    return (
        <div style={{ maxWidth: 900, margin: "0 auto", padding: 16 }}>
            <div style={{ marginBottom: 12 }}>
                <Link to={`/movie/${id}`} style={{ textDecoration: "none" }}>
                    <button>← Back to details</button>
                </Link>
            </div>
            <h2 style={{ marginBottom: 16 }}>Reviews & Ratings</h2>
            {loading && <p>Loading reviews...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            {!loading && !error && reviews.length === 0 && (
                <p>No reviews yet.</p>
            )}
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {reviews.map((r) => (
                    <li key={r.id} style={{ border: "1px solid #eee", borderRadius: 8, padding: 12, marginBottom: 12 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                            <strong>{r.author}</strong>
                            {r.author_details?.rating != null && (
                                <span title="User rating">⭐ {r.author_details.rating}</span>
                            )}
                        </div>
                        <p style={{ whiteSpace: "pre-wrap", margin: 0 }}>{r.content}</p>
                        {r.url && (
                            <div style={{ marginTop: 8 }}>
                                <a href={r.url} target="_blank" rel="noreferrer">Read on TMDB</a>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default MovieReviews;