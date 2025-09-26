const API_KEY = "52ec3563e14900d11681ced3bf093f1d"; // Replace with your actual API key
const BASE_URL = "https://api.themoviedb.org/3";



async function fetchMovies() {
    const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
    const data = await response.json();
    return data.results;
}
export { fetchMovies };

export async function searchMovies(query) {
    const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`);
    const data = await response.json();
    return data.results;
}

export async function fetchMovieDetails(movieId) {
    const response = await fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`);
    const data = await response.json();
    return data;
}

export async function getPopularMovies() {
    const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
    const data = await response.json();
    return data.results;
}
export async function getTopRatedMovies() {
    const response = await fetch(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}`);
    const data = await response.json();
    return data.results;
}

//Watch movie reviews and trailers
export async function fetchMovieVideos(movieId) {
    const response = await fetch(`${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}`);
    const data = await response.json();
    return data.results;
}

// Movie reviews
export async function fetchMovieReviews(movieId) {
    const response = await fetch(`${BASE_URL}/movie/${movieId}/reviews?api_key=${API_KEY}`);
    const data = await response.json();
    return data.results || [];
}