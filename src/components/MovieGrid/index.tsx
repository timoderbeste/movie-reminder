import { Movie } from "@/types";
import { Box, SimpleGrid } from "@chakra-ui/react";
import { MovieCard } from "./MovieCard";

type MovieGridProps = {
  movies: Movie[];
  bookmarkedMovies: Movie[];
  setBookmarkedMovies: React.Dispatch<
    React.SetStateAction<Movie[]>
  >;
  forBookmarks?: boolean;
  onSetBookmarkedMovies?: Function;
  bookmarkGroups?: string[];
  setBookmarkGroups?: React.Dispatch<
    React.SetStateAction<string[]>
  >;
};

export default function MovieGrid({
  movies,
  bookmarkedMovies,
  setBookmarkedMovies,
  forBookmarks = false,
  onSetBookmarkedMovies,
  bookmarkGroups,
  setBookmarkGroups,
}: MovieGridProps) {
  return (
    <SimpleGrid
      spacing={4}
      templateColumns={
        "repeat(auto-fill, minmax(200px, 1fr))"
      }
    >
      {movies.map((movie) => (
        <Box key={movie.imdbID}>
          <MovieCard
            movie={movie}
            bookmarkedMovies={bookmarkedMovies}
            setBookmarkedMovies={setBookmarkedMovies}
            forBookmarks={forBookmarks}
            onSetBookmarkedMovies={onSetBookmarkedMovies}
            bookmarkGroups={bookmarkGroups}
            setBookmarkGroups={setBookmarkGroups}
          />
        </Box>
      ))}
    </SimpleGrid>
  );
}
