//Watch full movies online

import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchMovieVideos } from "../services/api";

function WatchFullMovie() {
    const { id } = useParams();
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;
        async function load() {
            try {
                const data = await fetchMovieVideos(id);
                if (!isMounted) return;
                setVideos(Array.isArray(data) ? data : []);
            } catch (e) {
                if (!isMounted) return;
                setError("Failed to load videos");
            } finally {
                if (isMounted) setLoading(false);
            }
        }
        load();
        return () => {
            isMounted = false;
        };
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (videos.length === 0) return <div>No videos found</div>;

    return (
        <div>
            <h2>Watch Full Movie</h2>
            <div>
                {videos.map((video) => (
                    <div key={video.id}>
                        <h3>{video.name}</h3>
                        <iframe src={`https://www.youtube.com/embed/${video.key}`} title={video.name} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default WatchFullMovie;