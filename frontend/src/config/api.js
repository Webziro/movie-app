// API Configuration for Production uncomment this when deploying to production
// const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';
// const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY || '52ec3563e14900d11681ced3bf093f1d';
// const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

// export { API_BASE_URL, TMDB_API_KEY, TMDB_BASE_URL };


// Local dev: Point to backend port,use this when developing locally
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';  // Backend on 5000

const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY || '52ec3563e14900d11681ced3bf093f1d';
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

export { API_BASE_URL, TMDB_API_KEY, TMDB_BASE_URL };