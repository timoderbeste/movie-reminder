import { useEffect, useState } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Container,
  Divider,
  Heading,
  Icon,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";

import { SearchIcon } from "@chakra-ui/icons";

import { BsBookmarkDash, BsBookmarkPlus } from "react-icons/bs";

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
    setMovies([]);
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
        isLoading && (
          <Text>Loading...</Text>
        )
      }
      {
        movies && (
          <SimpleGrid 
            spacing={4} 
            templateColumns={"repeat(auto-fill, minmax(200px, 1fr))"}
          >
            {movies.map((movie) => (
              <Box key={movie.imdbID}>
                <Card maxW={"sm"}>
                  <CardBody>
                    <Box 
                      display={"flex"} 
                      height={350} 
                      flexDirection={"column"} 
                      justifyContent={"space-between"} 
                      alignContent={"center"} 
                      // alignItems={"center"}
                    >
                      <Image 
                        src={movie.Poster} 
                        alt={movie.Title}
                        height={250}
                      />
                      <Stack mt={4}>
                        <Heading size={"md"}>{movie.Title}</Heading>
                        <Text>{movie.Year}</Text>
                      </Stack>
                    </Box>
                  </CardBody>
                  <Divider />
                  <CardFooter>
                    <ButtonGroup>
                      <IconButton 
                        colorScheme="blue"
                        aria-label="Add to bookmarks"
                        icon={<Icon as={BsBookmarkPlus} />} 
                      />
                      <IconButton 
                        colorScheme="red"
                        aria-label="Remove from bookmarks"
                        icon={<Icon as={BsBookmarkDash}/>} 
                      />
                    </ButtonGroup>
                  </CardFooter>
                </Card>
              </Box>
            ))}
          </SimpleGrid>
        )
      }
    </Container>
  )
}