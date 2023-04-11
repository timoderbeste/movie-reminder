import { Box, Card, Text } from "@chakra-ui/react";
import MovieGrid from "../MovieGrid";
import { Movie } from "@/types";

type SearchResultsProps = {
  error: Error | null;
  movies: Movie[];
  bookmarkedMovies: Movie[];
  setBookmarkedMovies: React.Dispatch<
    React.SetStateAction<Movie[]>
  >;
  setMovies: React.Dispatch<React.SetStateAction<Movie[]>>;
  setSearchText: React.Dispatch<
    React.SetStateAction<string>
  >;
  bookmarkGroups: string[];
  setBookmarkGroups: React.Dispatch<
    React.SetStateAction<string[]>
  >;
};
export function SearchResults({
  error,
  movies,
  bookmarkedMovies,
  setBookmarkedMovies,
  setMovies,
  setSearchText,
  bookmarkGroups,
  setBookmarkGroups,
}: SearchResultsProps): JSX.Element {
  return (
    ((movies.length > 1 || error) && (
      <Box
        width={"100%"}
        px={5}
        py={5}
        mt={5}
      >
        {error && (
          <Text color={"red"}>{error.message}</Text>
        )}
        {movies && (
          <MovieGrid
            movies={movies}
            bookmarkedMovies={bookmarkedMovies}
            setBookmarkedMovies={setBookmarkedMovies}
            bookmarkGroups={bookmarkGroups}
            setBookmarkGroups={setBookmarkGroups}
          />
        )}
      </Box>
    )) || <></>
  );
}
