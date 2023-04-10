import { useState } from "react";
import {
  Box,
  Button,
  Container,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
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
};

export default function Search({
  bookmarkedMovies,
  setBookmarkedMovies,
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
          setMovies(data);
        }
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
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
          <Input
            type="text"
            placeholder="Search for a movie"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </InputGroup>
        <Button
          onClick={handleSearch}
          mr={5}
        >
          Search
        </Button>
        <Button
          onClick={() => {
            setSearchText("");
            setMovies([]);
          }}
        >
          Clear
        </Button>
      </Flex>
      <Box
        zIndex={100}
        position={"absolute"}
        width={"100%"}
      >
        {error && (
          <Text color={"red"}>{error.message}</Text>
        )}
        {isLoading && <Text>Loading...</Text>}
        {movies && (
          <MovieGrid
            movies={movies}
            bookmarkedMovies={bookmarkedMovies}
            setBookmarkedMovies={setBookmarkedMovies}
            onSetBookmarkedMovies={() => {
              setMovies([]);
              setSearchText("");
            }}
          />
        )}
      </Box>
    </Container>
  );
}
