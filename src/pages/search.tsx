import { useEffect, useState } from "react";
import {
  Button,
  Container,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  List,
  ListItem,
  Text,
} from "@chakra-ui/react";

import { SearchIcon } from "@chakra-ui/icons";

type Movie = {
  Title: string,
  Year: string,
  Poster: string,
  imdbID: string,
  Type: string,
};

export default function Search() {
  const [searchText, setSearchText] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  function handleSearch() {
    if (searchText.length === 0) {
      return;
    }
    setIsLoading(true);
    fetch(`/api/movies?title=${searchText}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setError(new Error(data.error));
        }
        else {
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
    <Container maxW={"container.xl"} py={10}>
      <InputGroup mb={4}>
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
      <Button onClick={handleSearch}>Search</Button>
      {error && <Text color={"red"}>{error.message}</Text>}
      {
        movies && (
          <List>
            {movies.map((movie) => (
              <ListItem key={movie.imdbID}>
                <Text>{movie.Title} ({movie.Year})</Text>
              </ListItem>
            ))}
          </List>
        )
      }
    </Container>
  )
}