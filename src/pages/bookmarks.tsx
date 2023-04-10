import { Container, Heading } from "@chakra-ui/react";
import MovieGrid from "./movieGrid";
import { useEffect, useState } from "react";

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
  const [watchedMovies, setWatchedMovies] = useState<
    Movie[]
  >([]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    const localData = localStorage.getItem("watchedMovies");
    setWatchedMovies(
      localData ? JSON.parse(localData) : []
    );
  }, []);

  return (
    <Container
      maxW={"container.xl"}
      py={10}
    >
      {bookmarkedMovies && (
        <MovieGrid
          movies={bookmarkedMovies}
          bookmarkedMovies={bookmarkedMovies}
          setBookmarkedMovies={setBookmarkedMovies}
          forBookmarks={true}
          watchedMovies={watchedMovies}
          setWatchedMovies={setWatchedMovies}
        />
      )}
    </Container>
  );
}
