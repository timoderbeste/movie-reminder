import { Card, Text } from "@chakra-ui/react";
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
    <Card
      zIndex={100}
      position={"absolute"}
      width={"100%"}
      height={500}
      overflow={"auto"}
      px={5}
      py={5}
      mt={5}
      variant={"filled"}
    >
      {error && <Text color={"red"}>{error.message}</Text>}
      {movies && (
        <MovieGrid
          movies={movies}
          bookmarkedMovies={bookmarkedMovies}
          setBookmarkedMovies={setBookmarkedMovies}
          onSetBookmarkedMovies={() => {
            setMovies([]);
            setSearchText("");
          }}
          bookmarkGroups={bookmarkGroups}
          setBookmarkGroups={setBookmarkGroups}
        />
      )}
    </Card>
  );
}
