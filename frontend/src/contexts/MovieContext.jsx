//Let users be able to add favorite movies onClick of the 
// love icon button and view them in the favorite movies page saving it to localsotrage. On succces 
//show a success message using react-toastify.

// Create a MovieContext to manage movie data and state
// Refactor Home component to use MovieContext for data fetching and state management

import React, { createContext, useContext, useState, useEffect } from "react";
const MovieContext = createContext();

export const useMovies = () => useContext(MovieContext);
export const MovieProvider = ({ children }) => {
    //Set states realated to movies here
    const [favorites, setFavorites] = useState([]);
    //store to localsotrage
    useEffect(() => {
        const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
        setFavorites(storedFavorites);
    }, []);

    //ONCE THE FAVORITE CHANGES, THIS FAVORITE RUNS TO SAVE THE NEW FAV.
    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }, [favorites]);

    //Add and remove from favorite
    const addToFavorites = (movie) => {
        if (!favorites.find((fav) => fav.id === movie.id)) {
            setFavorites(prev => {
                const updated = [...prev, movie];
                console.log('Added to favorites:', updated);
                return updated;
            });
    }
    }

    const removeFromFavorites = (movieId) => {
        setFavorites(prev => {
            const updated = prev.filter((fav) => fav.id !== movieId);
            console.log('Removed from favorites:', updated);
            return updated;
        });
    }

    const  isFavorite = (movieId) => {
        return favorites.some((fav) => fav.id === movieId);
    }

    const value = { favorites, addToFavorites, removeFromFavorites, isFavorite };

    return <MovieContext.Provider value={value}>{children}</MovieContext.Provider>;
}
