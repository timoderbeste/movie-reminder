import {
  Box,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Heading,
  Icon,
  IconButton,
  Image,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import {
  BsBookmarkDash,
  BsBookmarkPlus,
} from "react-icons/bs";

type Movie = {
  Title: string;
  Year: string;
  Poster: string;
  imdbID: string;
  Type: string;
};

type MovieGridProps = {
  movies: Movie[];
  bookmarkedMovies: Movie[];
  setBookmarkedMovies: React.Dispatch<
    React.SetStateAction<Movie[]>
  >;
};

export default function MovieGrid({
  movies,
  bookmarkedMovies,
  setBookmarkedMovies,
}: MovieGridProps) {
  return (
    <SimpleGrid
      spacing={4}
      templateColumns={
        "repeat(auto-fill, minmax(200px, 1fr))"
      }
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
              >
                <Image
                  src={movie.Poster}
                  alt={movie.Title}
                  height={250}
                />
                <Stack mt={4}>
                  <Heading size={"md"}>
                    {movie.Title}
                  </Heading>
                  <Text>{movie.Year}</Text>
                </Stack>
              </Box>
            </CardBody>
            <Divider />
            <CardFooter>
              {bookmarkedMovies.some(
                (m) => m.imdbID === movie.imdbID
              ) ? (
                <IconButton
                  colorScheme="red"
                  aria-label="Remove from bookmarks"
                  icon={<Icon as={BsBookmarkDash} />}
                  onClick={() => {
                    const filteredMovies =
                      bookmarkedMovies.filter(
                        (m) => m.imdbID !== movie.imdbID
                      );
                    setBookmarkedMovies(filteredMovies);
                    localStorage.setItem(
                      "bookmarkedMovies",
                      JSON.stringify(filteredMovies)
                    );
                  }}
                />
              ) : (
                <IconButton
                  colorScheme="blue"
                  aria-label="Add to bookmarks"
                  icon={<Icon as={BsBookmarkPlus} />}
                  onClick={() => {
                    const newBookmarkedMovies = [
                      ...bookmarkedMovies,
                      movie,
                    ];
                    setBookmarkedMovies(
                      newBookmarkedMovies
                    );
                    localStorage.setItem(
                      "bookmarkedMovies",
                      JSON.stringify(newBookmarkedMovies)
                    );
                  }}
                />
              )}
            </CardFooter>
          </Card>
        </Box>
      ))}
    </SimpleGrid>
  );
}
