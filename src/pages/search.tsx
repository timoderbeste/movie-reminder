import { useState } from "react";
import {
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
import useSWR from "swr";

type Movie = {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
};

export default function SearchPage() {
  const [searchText, setSearchText] = useState("");
  const { data, error } = useSWR<Movie[]>(searchText ? `/api/movies?title=${searchText}` : null);

  return (
    <Container maxW={"container.xl"} py={10}>
      <Heading mb={4}>Search Movies</Heading>
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
      {error && <Text color={"red"}>{error.message}</Text>}
      {
        data && (
          <List>
            {data.map((movie) => (
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