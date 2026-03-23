import MovieCard from "../components/MovieCard";
// Hooks
import { useState, useEffect } from "react";
// service functions for fetching
import { SearchMovies, getPopularMovies } from "../services/api";

import "../css/Home.css";

// display movies and allows searching
function Home() {
  // Hold users input
  const [searchQuery, setSearchQuery] = useState("");
  // store the list of movies for display
  const [movies, setMovies] = useState([]);
  // store error messages
  const [error, setError] = useState(null);
  // when fetching show loading
  const [loading, setLoading] = useState(true);

  // load popular movies
  useEffect(() => 
  {
    const loadPopularMovies = async () => 
    {
      try {
        //fetch movie data
        const popularMovies = await getPopularMovies();
        setMovies(popularMovies);
      } 
      catch (err) {
        console.log(err);
        setError("Failed to load movies...");
      } finally {
        setLoading(false);
      }
    };

    loadPopularMovies();
  }, []);

  // handles form submission
  const handleSearch = async (e) => {
    // prevent reload
    e.preventDefault();
    // incase input is empty
    if (!searchQuery.trim()) return
    if (loading) return

    setLoading(true)
    try 
    {
      const searchResults = await SearchMovies(searchQuery)
      // update movie list
      setMovies(searchResults)
      setError(null)
    } 
    catch (err) 
    {
      console.log(err)
      setError("Failed to search movies...")
    } 
    finally 
    {
      setLoading(false)
    }
  };

  return (
    <div className="home">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search for movies..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>

      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="movies-grid">
          {movies.map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;