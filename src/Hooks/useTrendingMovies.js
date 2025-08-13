import { useState } from "react";
import { getTrendingMovies } from "../Services/appwrite";

export function useTrendingMovies() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [trendingLoading, setTrendingLoading] = useState(false);
  const [trendingError, setTrendingError] = useState("");

  async function fetchTrendingMovies() {
    setTrendingLoading(true);
    setTrendingError("");
    try {
      const trendingMovies = await getTrendingMovies();
      setTrendingMovies(trendingMovies);
    } catch (error) {
      setTrendingError(`Failed to fetch trending movies: ${error}`);
      console.error(error);
    } finally {
      setTrendingLoading(false);
    }
  }

  return {
    fetchTrendingMovies,
    trendingMovies,
    trendingLoading,
    trendingError,
  };
}
