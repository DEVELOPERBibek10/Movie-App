import { useEffect, useState } from "react";
import Search from "./Components/Search";
import { useFetchMovie } from "./Hooks/useFetchMovie";
import Loader from "./Components/Loader";
import MovieCard from "./Components/MovieCard";
import { useDebounce } from "./Hooks/useDebounce";

function App() {
  const [searchText, setSearchText] = useState("");
  const { movieList, isLoading, errorMessage, fetchMovies } = useFetchMovie();
  const debouncedFunction = useDebounce(fetchMovies, 800);

  useEffect(() => {
    debouncedFunction(searchText);
  }, [debouncedFunction, searchText]);

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
          <section className="all-movies">
            <h2 className="mt-[40px]">All Movies</h2>

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
