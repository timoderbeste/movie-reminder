import { Movie } from "@/types";
import {
  Box,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Flex,
  Heading,
  Icon,
  IconButton,
  Image,
  SimpleGrid,
  Stack,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import {
  BsBookmarkDash,
  BsBookmarkPlus,
} from "react-icons/bs";
import {
  ImCheckboxChecked,
  ImCheckboxUnchecked,
} from "react-icons/im";

type MovieGridProps = {
  movies: Movie[];
  bookmarkedMovies: Movie[];
  setBookmarkedMovies: React.Dispatch<
    React.SetStateAction<Movie[]>
  >;
  forBookmarks?: boolean;
  onSetBookmarkedMovies?: Function;
};

export default function MovieGrid({
  movies,
  bookmarkedMovies,
  setBookmarkedMovies,
  forBookmarks = false,
  onSetBookmarkedMovies,
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
          <MovieCard
            movie={movie}
            bookmarkedMovies={bookmarkedMovies}
            setBookmarkedMovies={setBookmarkedMovies}
            forBookmarks={forBookmarks}
            onSetBookmarkedMovies={onSetBookmarkedMovies}
          />
        </Box>
      ))}
    </SimpleGrid>
  );
}

type MovieCardProps = {
  movie: Movie;
  bookmarkedMovies: Movie[];
  setBookmarkedMovies: React.Dispatch<
    React.SetStateAction<Movie[]>
  >;
  forBookmarks: boolean;
  onSetBookmarkedMovies?: Function;
};

function MovieCard({
  movie,
  bookmarkedMovies,
  setBookmarkedMovies,
  forBookmarks = false,
  onSetBookmarkedMovies,
}: MovieCardProps): JSX.Element {
  return (
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
            src={movie.poster}
            alt={movie.title}
            height={250}
          />
          <Stack mt={4}>
            <Tooltip label={movie.title}>
              <Heading
                size={"md"}
                noOfLines={2}
              >
                {movie.title}
              </Heading>
            </Tooltip>
            <Text>{movie.year}</Text>
          </Stack>
        </Box>
      </CardBody>
      <Divider />
      <CardFooter>
        <Flex
          justifyContent={"space-between"}
          width={"100%"}
        >
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
                if (onSetBookmarkedMovies) {
                  onSetBookmarkedMovies();
                }
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
                setBookmarkedMovies(newBookmarkedMovies);
                localStorage.setItem(
                  "bookmarkedMovies",
                  JSON.stringify(newBookmarkedMovies)
                );
                if (onSetBookmarkedMovies) {
                  onSetBookmarkedMovies();
                }
              }}
            />
          )}
          {forBookmarks &&
            (movie.watched ? (
              <IconButton
                colorScheme="green"
                aria-label="Mark as unwatched"
                icon={<Icon as={ImCheckboxChecked} />}
                onClick={() => {
                  const updatedMovies =
                    bookmarkedMovies.map((m) =>
                      m.imdbID === movie.imdbID
                        ? { ...m, watched: false }
                        : m
                    );
                  setBookmarkedMovies(updatedMovies);
                  localStorage.setItem(
                    "bookmarkedMovies",
                    JSON.stringify(updatedMovies)
                  );
                }}
              />
            ) : (
              <IconButton
                colorScheme="green"
                aria-label="Mark as watched"
                icon={<Icon as={ImCheckboxUnchecked} />}
                onClick={() => {
                  const updatedMovies =
                    bookmarkedMovies.map((m) =>
                      m.imdbID === movie.imdbID
                        ? { ...m, watched: true }
                        : m
                    );
                  setBookmarkedMovies(updatedMovies);
                  localStorage.setItem(
                    "bookmarkedMovies",
                    JSON.stringify(updatedMovies)
                  );
                }}
              />
            ))}
        </Flex>
      </CardFooter>
    </Card>
  );
}
