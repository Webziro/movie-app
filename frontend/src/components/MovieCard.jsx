import "../css/MovieCard.css";

function MovieCard({movie}){
    
    function onfavoriteClick(){
        console.log("favorite clicked")
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
                    <button className="favorite-btn" onClick={onfavoriteClick}>
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

//export default MovieCard
export default MovieCard