import { useState } from "react";
import { Container } from "@chakra-ui/react";

import { Movie } from "@/types";
import { SearchInput } from "./SearchInput";
import { SearchResults } from "./SearchResults";
import { handleSearch, handleCancel } from "./utils";

type SearchProps = {
  bookmarkedMovies: Movie[];
  setBookmarkedMovies: React.Dispatch<
    React.SetStateAction<Movie[]>
  >;
  bookmarkGroups: string[];
  setBookmarkGroups: React.Dispatch<
    React.SetStateAction<string[]>
  >;
};

export default function Search({
  bookmarkedMovies,
  setBookmarkedMovies,
  bookmarkGroups,
  setBookmarkGroups,
}: SearchProps): JSX.Element {
  const [searchText, setSearchText] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  return (
    <Container
      maxW={"container.xl"}
      py={10}
      position={"relative"}
    >
      <SearchInput
        searchText={searchText}
        setSearchText={setSearchText}
        handleSearch={() =>
          handleSearch(
            searchText,
            setIsLoading,
            setMovies,
            setError
          )
        }
        isLoading={isLoading}
        movies={movies}
        handleCancel={() =>
          handleCancel(setSearchText, setMovies)
        }
      />
      {movies.length > 0 && !isLoading && (
        <SearchResults
          error={error}
          movies={movies}
          bookmarkedMovies={bookmarkedMovies}
          setBookmarkedMovies={setBookmarkedMovies}
          setMovies={setMovies}
          setSearchText={setSearchText}
          bookmarkGroups={bookmarkGroups}
          setBookmarkGroups={setBookmarkGroups}
        />
      )}
    </Container>
  );
}
