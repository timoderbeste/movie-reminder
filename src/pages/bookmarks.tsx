import {
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import MovieGrid from "./movieGrid";
import { useEffect, useState, useTransition } from "react";
import { Movie } from "@/types";

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
  const [movies, setMovies] = useState<Movie[]>(
    bookmarkedMovies
  );
  const [tabIndex, setTabIndex] = useState(0);
  const [isPending, startTransition] = useTransition();

  function handleTabChange(index: number) {
    startTransition(() => {
      setTabIndex(index);
      switch (index) {
        case 0:
          setMovies(bookmarkedMovies);
          break;
        case 1:
          setMovies(
            bookmarkedMovies.filter(
              (movie) =>
                !watchedMovies
                  .map((movie) => movie.imdbID)
                  .includes(movie.imdbID)
            )
          );
          break;
        case 2:
          setMovies(watchedMovies);
          break;
      }
    });
  }

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    const localData = localStorage.getItem("watchedMovies");
    setWatchedMovies(
      localData ? JSON.parse(localData) : []
    );
  }, []);

  useEffect(() => {
    setMovies(bookmarkedMovies);
  }, [bookmarkedMovies]);

  console.log("movies", movies);
  console.log("bookmarkedMovies", bookmarkedMovies);

  return (
    <Container
      maxW={"container.xl"}
      py={10}
    >
      <Tabs
        index={tabIndex}
        onChange={handleTabChange}
      >
        <TabList>
          <Tab>All</Tab>
          <Tab>Unwatched</Tab>
          <Tab>Watched</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            {isPending ? (
              <p>Loading...</p>
            ) : (
              <MovieGrid
                movies={movies}
                bookmarkedMovies={bookmarkedMovies}
                setBookmarkedMovies={setBookmarkedMovies}
                forBookmarks={true}
                watchedMovies={watchedMovies}
                setWatchedMovies={setWatchedMovies}
              />
            )}
          </TabPanel>
          <TabPanel>
            {isPending ? (
              <p>Loading...</p>
            ) : (
              <MovieGrid
                movies={movies}
                bookmarkedMovies={bookmarkedMovies}
                setBookmarkedMovies={setBookmarkedMovies}
                forBookmarks={true}
                watchedMovies={watchedMovies}
                setWatchedMovies={setWatchedMovies}
              />
            )}
          </TabPanel>
          <TabPanel>
            {isPending ? (
              <p>Loading...</p>
            ) : (
              <MovieGrid
                movies={movies}
                bookmarkedMovies={bookmarkedMovies}
                setBookmarkedMovies={setBookmarkedMovies}
                forBookmarks={true}
                watchedMovies={watchedMovies}
                setWatchedMovies={setWatchedMovies}
              />
            )}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
}
