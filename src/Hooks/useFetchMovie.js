import { useCallback, useState } from "react";
import { API_BASE_URL, API_OPTION } from "../Constants/constants";
import { updataSearchCount } from "../Services/appwrite";

export function useFetchMovie() {
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchMovies = useCallback(async (query) => {
    setIsLoading(true);
    setErrorMessage("");
    try {
      const endPoint = query
        ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
      const response = await fetch(endPoint, API_OPTION);

      if (!response.ok) {
        const error = await response.text();
        throw new Error(`Failed to fetch movie: ${error}`);
      }
      const data = await response.json();

      if (data.Response === "False") {
        setErrorMessage(data.Error || "Failed to fetch movie");
        setMovieList([]);
        return;
      }
      setMovieList(data.results || []);

      if (query && data.results.length > 0) {
        await updataSearchCount(query, data.results[0]);
      }
    } catch (error) {
      setErrorMessage(error.message || "Failed to fetch movies");
      console.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    fetchMovies,
    movieList,
    isLoading,
    errorMessage,
  };
}
