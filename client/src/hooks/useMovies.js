import { useCallback, useState } from "react";
import { getFromStorage } from "../utils/sessionStorage";
import { saveToStorage } from './../utils/sessionStorage';

const MAX_MOVIE_COUNT = 10;

const useMovies = () => {
  const [selectedMovies, setSelectedMovies] = useState(
    getFromStorage("selectedMovies") || []
  );
  
  const selectMovie = useCallback(
    (movie) => {
      const isMovieSelected = selectedMovies.find(({ id }) => id === movie.id);
      const length = selectedMovies.length;

      if (!isMovieSelected && length < MAX_MOVIE_COUNT) {
        setSelectedMovies([movie, ...selectedMovies]);
      }
      const moviesFromStorage = getFromStorage("selectedMovies")
      const isMovieAdded = moviesFromStorage
        ? moviesFromStorage.some(({ id }) => id === movie.id)
        : false;

      if (moviesFromStorage && !isMovieAdded) {
        moviesFromStorage.push(movie);
        saveToStorage("selectedMovies", moviesFromStorage)        
      } else {
      saveToStorage("selectedMovies", [movie]);
      }
    },
    [selectedMovies, setSelectedMovies]
  );
  const deleteMovie = useCallback(
    (id) => {
      setSelectedMovies(selectedMovies.filter((job) => job.id !== id));
      const moviesFromStorage = getFromStorage("selectedMovies")
      const newSelectedMovies = moviesFromStorage.filter(
        (movie) => movie.id != id
      );
      saveToStorage("selectedMovies", newSelectedMovies);
    },
    [selectedMovies]
  );

  return {
    selectedMovies,
    selectMovie,
    deleteMovie,
  };
};

export default useMovies;
