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

  function handleSearch() {
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
  function handleCancel() {
    setSearchText("");
    setMovies([]);
  }

  return (
    <Container
      maxW={"container.xl"}
      py={10}
      position={"relative"}
    >
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
              onChange={(e) =>
                setSearchText(e.target.value)
              }
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
      {movies.length > 0 && !isLoading && (
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
          {error && (
            <Text color={"red"}>{error.message}</Text>
          )}
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
      )}
    </Container>
  );
}
