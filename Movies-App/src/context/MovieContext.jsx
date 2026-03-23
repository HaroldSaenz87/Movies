import { createContext, useState, useContext, useEffect } from "react";

const MovieContext = createContext()

export const useMovieContext = () => useContext(MovieContext)

export const MovieProvider = ({children}) => 
{
    const [favorites, setFavorites] = useState([])

    useEffect(() => {
  const storedFavs = localStorage.getItem("favorites");

  try {
    if (storedFavs) {
      const parsed = JSON.parse(storedFavs);
      if (Array.isArray(parsed)) {
        setFavorites(parsed);
      } else {
        setFavorites([]);
      }
    }
  } catch (err) {
    console.error("Error parsing favorites from localStorage:", err);
    localStorage.removeItem("favorites"); // clear bad data
    setFavorites([]);
  }
}, []);

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites))
    }, [favorites])

    const addToFavorites = (movie) => {
        setFavorites(prev => [...prev, movie])
    }

    const removeFromFavorites = (movieId) => {
        setFavorites(prev => prev.filter(movie => movie.id !== movieId))
    }
    
    const isFavorite = (movieId) => {
        return favorites.some(movie => movie.id === movieId)
    }

    const value = {
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite
    }


    return <MovieContext.Provider value={value}>
        {children}
    </MovieContext.Provider>
}