import MovieCard from "../components/MovieCard";    
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import "../css/Home.css";
import { getPopularMovies, searchMovies } from "../services/api.js";
import { fetchMovieVideos } from "../services/api.js";

//Movie reviews and ratings
import { fetchMovieReviews } from "../services/api.js";



function Home() {
    const { token } = useContext(AuthContext);
    const navigate = useNavigate();
    
    const [searchQuery, setSearchQuery] = useState("");
    // const [filteredMovies, setFilteredMovies] = useState([]);
    
    //Storing movies in state to re-render on update
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [userName, setUserName] = useState("");
    const [userLoading, setUserLoading] = useState(true);

    // Function to get time-based greeting
    const getTimeBasedGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return "Good Morning";
        if (hour < 18) return "Good Afternoon";
        return "Good Evening";
    };

    //Function to fetch movie reviews and ratings
    const fetchMovieReviews = async (movieId) => {
        const reviews = await fetchMovieReviews(movieId);
        console.log("Fetched movie reviews:", reviews);
    };

    //Function to watch trailers and reviews
    const watchTrailer = async (movieId) => {
        try {
            const videos = await fetchMovieVideos(movieId);
            console.log("Fetched movie videos:", videos);
            // Open the first video in a new tab
            if (videos.length > 0) {
                window.open(`https://www.youtube.com/watch?v=${videos[0].key}`, "_blank");
            } else {
                console.log("No videos found");
            }
        } catch (error) {
            console.error("Error fetching movie videos:", error);
        }
    };

    // Function to fetch user data
    const fetchUserData = async () => {
        if (!token) {
            setUserLoading(false);
            return;
        }
        
        try {
            console.log('Fetching user data with token:', token);
            const res = await fetch('http://localhost:3000/user', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            
            console.log('User API response status:', res.status);
            
            if (res.ok) {
                const userData = await res.json();
                console.log('User data received:', userData);
                setUserName(userData.name || "User");
            } else {
                const errorData = await res.json();
                console.error('API error:', errorData);
                setUserName("User");
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
            setUserName("User"); // Fallback name
        } finally {
            setUserLoading(false);
        }
    };

    useEffect(() => {
        if (!token) {
            navigate('/login', { replace: true });
        } else {
            fetchUserData();
        }
    }, [token, navigate]);
    
    useEffect(() => {
        // Fetch popular movies on component mount
        const fetchData = async () => {
            try {
                const popularMovies = await getPopularMovies();
                setMovies(popularMovies);
                console.log("Fetched movies:", popularMovies);
            } catch (error) {
                console.error(error);
                setError("Error fetching popular movies");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);


    const handleSearch = async (e) => { 
        e.preventDefault();
        // Implement search functionality here
        if(!searchQuery.trim()) return
        if(loading) return
            setLoading(true);

            try {
                const searchResults = await searchMovies(searchQuery);
                setMovies(searchResults);
                setError(null);
            } catch (error) {
                setError("Error searching movies");
                console.error(error);
            }finally{
                setLoading(false);
            
        }
        const query = e.target.elements[0].value;
        console.log("Searching for:", query);
        searchQuery("");
    };

    if (loading) {
        return <div className="home"><p>Loading...</p></div>;
    }
    // Don't render anything if not authenticated
    if (!token) {
        return null;
    }

    if (error) {
        return <div className="home"><p style={{color: 'red'}}>{error}</p></div>;
    }
    return (
        <div className="home">
            <div className="welcome-message">
                <h1>
                    {getTimeBasedGreeting()}, {userLoading ? "..." : userName}!
                </h1>
                <p>Discover amazing movies and add them to your favorites.</p>
            </div>
            
            <form onSubmit={handleSearch} className="search-form">
                <input type="text" placeholder="Search Movie..." 
                    className="search-input"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit" className="search-button"> Search</button>        
            </form>

            {error && <div className="error-message">{error}</div>}
            {loading ? (<div className="loading">Loading...</div>) : (

                <div className="movies-grid">
                    {movies.length === 0 ? (
                        <p>No movies found.</p>
                    ) : (
                        movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)
                    )}
                </div>
            )}
           
        </div>
    );
}

export default Home;