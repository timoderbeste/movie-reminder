import { useState } from "react";
import {
  Box,
  Button,
  Card,
  Container,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Spinner,
  Text,
} from "@chakra-ui/react";

import { SearchIcon } from "@chakra-ui/icons";

import MovieGrid from "./movieGrid";
import { Movie } from "@/types";

function handleSearch(
  searchText: string,
  setIsLoading: (isLoading: boolean) => void,
  setMovies: (movies: Movie[]) => void,
  setError: (error: Error | null) => void
) {
  if (searchText.length === 0) {
    return;
  }
  setIsLoading(true);
  setMovies([]);
  fetch(`/api/movies?title=${searchText}`)
    .then((res) => res.json())
    .then((data) => {
      if (data.error) {
        setError(new Error(data.error));
      } else {
        setError(null);
        setMovies(
          data.map((movie: any) => ({
            imdbID: movie.imdbID,
            title: movie.Title,
            year: movie.Year,
            poster: movie.Poster,
            type: movie.Type,
            watched: false,
          }))
        );
      }
    })
    .catch((err) => {
      setError(err);
    })
    .finally(() => {
      setIsLoading(false);
    });
}
function handleCancel(setSearchText, setMovies) {
  setSearchText("");
  setMovies([]);
}

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

function SearchResults({
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

type SearchInputProps = {
  searchText: string;
  setSearchText: React.Dispatch<
    React.SetStateAction<string>
  >;
  handleSearch: () => void;
  isLoading: boolean;
  movies: Movie[];
  handleCancel: () => void;
};

function SearchInput({
  searchText,
  setSearchText,
  handleSearch,
  isLoading,
  movies,
  handleCancel,
}: SearchInputProps): JSX.Element {
  return (
    <Flex>
      <InputGroup mr={5}>
        <InputLeftElement pointerEvents="none">
          <SearchIcon color="gray.300" />
        </InputLeftElement>
        <Flex
          position={"relative"}
          width={"100%"}
        >
          <Input
            type="text"
            placeholder="Search for a movie"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
            disabled={isLoading}
            pr={isLoading ? 35 : 0}
            pl={10}
          />
          {isLoading && (
            <Spinner
              size={"sm"}
              position={"absolute"}
              top={"30%"}
              right={5}
            />
          )}
        </Flex>
      </InputGroup>
      <Button
        onClick={
          movies.length > 0 ? handleCancel : handleSearch
        }
        mr={5}
      >
        {movies.length > 0 ? "Cancel" : "Search"}
      </Button>
    </Flex>
  );
}
