import { TabPanel, TabPanels } from "@chakra-ui/react";
import MovieGrid from "../MovieGrid";
import { Movie } from "@/types";

type BookmarksTabPanelsProps = {
  isPending: boolean;
  movies: Movie[];
  bookmarkedMovies: Movie[];
  setBookmarkedMovies: React.Dispatch<
    React.SetStateAction<Movie[]>
  >;
  bookmarkGroups: string[];
};
export function BookmarksTabPanels({
  isPending,
  movies,
  bookmarkedMovies,
  setBookmarkedMovies,
  bookmarkGroups,
}: BookmarksTabPanelsProps): JSX.Element {
  return (
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
          />
        )}
      </TabPanel>
      {bookmarkGroups.map((group) => (
        <TabPanel key={group}>
          {isPending ? (
            <p>Loading...</p>
          ) : (
            <MovieGrid
              movies={movies}
              bookmarkedMovies={bookmarkedMovies}
              setBookmarkedMovies={setBookmarkedMovies}
              forBookmarks={true}
            />
          )}
        </TabPanel>
      ))}
    </TabPanels>
  );
}
