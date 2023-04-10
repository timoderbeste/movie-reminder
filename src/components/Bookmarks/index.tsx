import {
  Alert,
  AlertIcon,
  Container,
  Tab,
  TabList,
  Tabs,
} from "@chakra-ui/react";
import { useEffect, useState, useTransition } from "react";
import { Movie } from "@/types";
import { BookmarksTabPanels } from "./BookmarksTabPanels";

function handleTabChange(
  index: number,
  startTransition: (fn: () => void) => void,
  setTabIndex: React.Dispatch<React.SetStateAction<number>>,
  setMovies: React.Dispatch<React.SetStateAction<Movie[]>>,
  bookmarkedMovies: Movie[],
  bookmarkGroups: string[]
) {
  startTransition(() => {
    setTabIndex(index);
    switch (index) {
      case 0:
        setMovies(bookmarkedMovies);
        break;
      case 1:
        setMovies(
          bookmarkedMovies.filter((movie) => !movie.watched)
        );
        break;
      case 2:
        setMovies(
          bookmarkedMovies.filter((movie) => movie.watched)
        );
        break;
      default:
        const bookmarkGroup = bookmarkGroups[index - 3];
        setMovies(
          bookmarkedMovies.filter(
            (movie) => movie.bookmarkGroup === bookmarkGroup
          )
        );
        break;
    }
  });
}

type BookmarksProps = {
  bookmarkedMovies: Movie[];
  setBookmarkedMovies: React.Dispatch<
    React.SetStateAction<Movie[]>
  >;
  bookmarkGroups: string[];
  setBookmarkGroups: React.Dispatch<
    React.SetStateAction<string[]>
  >;
};

export default function Bookmarks({
  bookmarkedMovies,
  setBookmarkedMovies,
  bookmarkGroups,
  setBookmarkGroups,
}: BookmarksProps): JSX.Element {
  const [movies, setMovies] = useState<Movie[]>(
    bookmarkedMovies
  );
  const [tabIndex, setTabIndex] = useState(0);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(() => {
      handleTabChange(
        tabIndex,
        startTransition,
        setTabIndex,
        setMovies,
        bookmarkedMovies,
        bookmarkGroups
      );
    });
  }, [tabIndex, bookmarkGroups, bookmarkedMovies]);

  return (
    <Container maxW={"container.xl"}>
      {bookmarkedMovies.length === 0 ? (
        isPending ? null : (
          <Alert>
            <AlertIcon />
            No movies bookmarked. Try searching for a movie
            and then bookmarking it.
          </Alert>
        )
      ) : (
        <Tabs
          index={tabIndex}
          onChange={(index) =>
            handleTabChange(
              index,
              startTransition,
              setTabIndex,
              setMovies,
              bookmarkedMovies,
              bookmarkGroups
            )
          }
        >
          <TabList
            overflowY={"hidden"}
            overflowX={"auto"}
          >
            <Tab>All</Tab>
            <Tab>Unwatched</Tab>
            <Tab>Watched</Tab>
            {bookmarkGroups.map((group) => (
              <Tab key={group}>{group}</Tab>
            ))}
          </TabList>
          <BookmarksTabPanels
            isPending={isPending}
            movies={movies}
            bookmarkedMovies={bookmarkedMovies}
            setBookmarkedMovies={setBookmarkedMovies}
            bookmarkGroups={bookmarkGroups}
          />
        </Tabs>
      )}
    </Container>
  );
}
