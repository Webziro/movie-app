import MovieCard from "../components/MovieCard";    
import { useState, useEffect } from "react";
import "../css/Home.css";
import { getPopularMovies, searchMovies } from "../services/api.js";


function Home() {

    const [searchQuery, setSearchQuery] = useState("");
    // const [filteredMovies, setFilteredMovies] = useState([]);


    //Storing movies in state to re-render on update
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    
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
    if (error) {
        return <div className="home"><p style={{color: 'red'}}>{error}</p></div>;
    }
    return (
        <div className="home">
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