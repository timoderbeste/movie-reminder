import { Heading } from "@chakra-ui/react";
import MovieGrid from "./movieGrid";

type Movie = {
  Title: string;
  Year: string;
  Poster: string;
  imdbID: string;
  Type: string;
};

type BookmarksProps = {
  bookmarkedMovies: Movie[];
  setBookmarkedMovies: React.Dispatch<
    React.SetStateAction<Movie[]>
  >;
};

export default function Bookmarks({
  bookmarkedMovies,
  setBookmarkedMovies,
}: BookmarksProps): JSX.Element {
  return (
    bookmarkedMovies && (
      <MovieGrid
        movies={bookmarkedMovies}
        bookmarkedMovies={bookmarkedMovies}
        setBookmarkedMovies={setBookmarkedMovies}
      />
    )
  );
}
