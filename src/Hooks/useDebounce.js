import { useCallback, useRef } from "react";

export function useDebounce(fetchMovies, delay) {
  const timer = useRef(null);
  const debouncedFunction = useCallback(
    (searchText) => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
      timer.current = setTimeout(() => {
        fetchMovies(searchText.trim());
      }, delay);
    },
    [fetchMovies, delay]
  );
  return debouncedFunction;
}
