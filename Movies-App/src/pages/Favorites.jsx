import { useMovieContext } from "../context/MovieContext";
import "../css/Favorites.css";
import MovieCard from "../components/MovieCard";

function Favorites() {
  const { favorites = [] } = useMovieContext();

  if (favorites.length === 0) {
    return (
      <div className="favorites-empty" style={{ padding: 20, color: "#222" }}>
        <h2>No Favorite Movies Yet</h2>
        <p>Start adding movies to your favorites and they will appear here</p>
      </div>
    );
  }

  return (
    <div className="favorites-page">
        <div className="movies-grid">
            {favorites.map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
            ))}
        </div>
    </div>

  );
}

export default Favorites;
