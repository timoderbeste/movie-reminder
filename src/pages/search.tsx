import Search from "@/components/Search";
import { Movie } from "@/types";

type SearchPageProps = {
  bookmarkedMovies: Movie[];
  setBookmarkedMovies: React.Dispatch<
    React.SetStateAction<Movie[]>
  >;
  bookmarkGroups: string[];
  setBookmarkGroups: React.Dispatch<
    React.SetStateAction<string[]>
  >;
};

export default function SearchPage({
  bookmarkedMovies,
  setBookmarkedMovies,
  bookmarkGroups,
  setBookmarkGroups,
}: SearchPageProps): JSX.Element {
  return (
    <Search
      bookmarkedMovies={bookmarkedMovies}
      setBookmarkedMovies={setBookmarkedMovies}
      bookmarkGroups={bookmarkGroups}
      setBookmarkGroups={setBookmarkGroups}
    />
  );
}
