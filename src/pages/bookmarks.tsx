import Bookmarks from "@/components/Bookmarks";
import { Movie } from "@/types";

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

export default function BookmarksPage({
  bookmarkedMovies,
  setBookmarkedMovies,
  bookmarkGroups,
  setBookmarkGroups,
}: BookmarksProps): JSX.Element {
  return (
    <Bookmarks
      bookmarkedMovies={bookmarkedMovies}
      setBookmarkedMovies={setBookmarkedMovies}
      bookmarkGroups={bookmarkGroups}
      setBookmarkGroups={setBookmarkGroups}
    />
  );
}
