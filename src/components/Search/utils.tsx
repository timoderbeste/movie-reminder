import { Movie } from "@/types";

export function handleSearch(
  searchText: string,
  setIsLoading: (isLoading: boolean) => void,
  setMovies: (movies: Movie[]) => void,
  setError: (error: Error | null) => void
) {
  if (searchText.length === 0) {
    return;
  }
  setIsLoading(true);
  setMovies([]);
  fetch(`/api/movies?title=${searchText}`)
    .then((res) => res.json())
    .then((data) => {
      if (data.error) {
        setError(new Error(data.error));
        setMovies([]);
      } else {
        setError(null);
        setMovies(
          data.map((movie: any) => ({
            imdbID: movie.imdbID,
            title: movie.Title,
            year: movie.Year,
            poster: movie.Poster,
            type: movie.Type,
            watched: false,
          }))
        );
      }
    })
    .catch((err) => {
      setError(err);
    })
    .finally(() => {
      setIsLoading(false);
    });
}
export function handleCancel(
  setSearchText: (searchText: string) => void,
  setMovies: (movies: Movie[]) => void
) {
  setSearchText("");
  setMovies([]);
}
