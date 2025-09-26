
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchMovieVideos } from "../services/api.js";

const WatchTrailer = () => {
	const { id } = useParams();
	const [videoKey, setVideoKey] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		let isMounted = true;
		async function loadVideos() {
			try {
				const videos = await fetchMovieVideos(id);
				if (!isMounted) return;
				// Prefer an official YouTube trailer; fallback to any YouTube video
				const officialTrailer = videos?.find(
					(v) => v.site === "YouTube" && v.type === "Trailer" && v.official
				);
				const anyYouTube = videos?.find((v) => v.site === "YouTube");
				setVideoKey(officialTrailer?.key || anyYouTube?.key || null);
			} catch (e) {
				if (!isMounted) return;
				setError("Failed to load trailer");
			} finally {
				if (isMounted) setLoading(false);
			}
		}
		loadVideos();
		return () => {
			isMounted = false;
		};
	}, [id]);

	return (
		<div className="watch-trailer-container" style={{ maxWidth: 900, margin: "0 auto", padding: 16 }}>
			<div style={{ marginBottom: 12 }}>
				<Link to={`/movie/${id}`} style={{ textDecoration: "none" }}>
					<button>← Back to details</button>
				</Link>
			</div>
			<h2 style={{ marginBottom: 16 }}>Watch Movie Trailer</h2>
			{loading && <p>Loading trailer...</p>}
			{error && <p style={{ color: "red" }}>{error}</p>}
			{!loading && !videoKey && !error && (
				<p>No trailer available for this movie.</p>
			)}
			{videoKey && (
				<div style={{ position: "relative", paddingBottom: "56.25%", height: 0, overflow: "hidden", borderRadius: 8 }}>
					<iframe
						src={`https://www.youtube.com/embed/${videoKey}`}
						title="Movie Trailer"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
						allowFullScreen
						style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: 0 }}
					/>
				</div>
			)}
		</div>
	);
};

export default WatchTrailer;
