import { useEffect, useState } from "react";
import Search from "./Components/Search";
import { useFetchMovie } from "./Hooks/useFetchMovie";
import Loader from "./Components/Loader";
import MovieCard from "./Components/MovieCard";
import { useDebounce } from "./Hooks/useDebounce";
import { useTrendingMovies } from "./Hooks/useTrendingMovies";

function App() {
  const [searchText, setSearchText] = useState("");
  const { movieList, isLoading, errorMessage, fetchMovies } = useFetchMovie();
  const debouncedFunction = useDebounce(fetchMovies, 800);
  const {
    fetchTrendingMovies,
    trendingMovies,
    trendingLoading,
    trendingError,
  } = useTrendingMovies();

  useEffect(() => {
    debouncedFunction(searchText);
  }, [debouncedFunction, searchText]);

  useEffect(() => {
    fetchTrendingMovies();
  }, []);

  return (
    <>
      <div className="pattern">
        <div className="wrapper">
          <header>
            <img src="./hero.png" alt="hero" />
            <h1>
              Find <span className="text-gradient">Movies</span> You'll Enjoy
              Without the Hassle
            </h1>
            <Search searchText={searchText} setSearchText={setSearchText} />
          </header>
          {trendingLoading ? (
            <div className="w-[80vw] flex justify-center items-center">
              <Loader />
            </div>
          ) : trendingError ? (
            <p className="text-red-500 text-center">{errorMessage}</p>
          ) : (
            trendingMovies.length > 0 && (
              <section className="trending">
                <h2>Trending</h2>
                <ul>
                  {trendingMovies.map((movie, idx) => (
                    <li key={movie.$id}>
                      <p>{idx + 1}</p>
                      <img src={movie.posterUrl} alt={movie.title} />
                    </li>
                  ))}
                </ul>
              </section>
            )
          )}
          <section className="all-movies">
            <h2 className="mt-[20px]">All Movies</h2>

            {isLoading ? (
              <div className="w-[80vw] flex justify-center items-center">
                <Loader />
              </div>
            ) : errorMessage ? (
              <p className="text-red-500 text-center">{errorMessage}</p>
            ) : (
              <ul>
                {movieList.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </ul>
            )}
          </section>
        </div>
      </div>
    </>
  );
}

export default App;
