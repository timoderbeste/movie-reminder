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
} from "@chakra-ui/react";
import {
  BsBookmarkDash,
  BsBookmarkPlus,
} from "react-icons/bs";
import {
  ImCheckboxChecked,
  ImCheckboxUnchecked,
} from "react-icons/im";

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
  forBookmarks?: boolean;
  watchedMovies?: Movie[];
  setWatchedMovies?: React.Dispatch<
    React.SetStateAction<Movie[]>
  >;
};

export default function MovieGrid({
  movies,
  bookmarkedMovies,
  setBookmarkedMovies,
  forBookmarks = false,
  watchedMovies,
  setWatchedMovies,
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
            watchedMovies={watchedMovies}
            setWatchedMovies={setWatchedMovies}
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
  watchedMovies?: Movie[];
  setWatchedMovies?: React.Dispatch<
    React.SetStateAction<Movie[]>
  >;
};

function MovieCard({
  movie,
  bookmarkedMovies,
  setBookmarkedMovies,
  forBookmarks = false,
  watchedMovies,
  setWatchedMovies,
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
              }}
            />
          )}
          {forBookmarks &&
            (watchedMovies?.some(
              (m: Movie) => m.imdbID === movie.imdbID
            ) ?? false ? (
              <IconButton
                colorScheme="green"
                aria-label="Mark as unwatched"
                icon={<Icon as={ImCheckboxChecked} />}
                onClick={() => {
                  const filteredMovies =
                    watchedMovies?.filter(
                      (m) => m.imdbID !== movie.imdbID
                    ) ?? [];
                  setWatchedMovies &&
                    setWatchedMovies(filteredMovies);
                  localStorage.setItem(
                    "watchedMovies",
                    JSON.stringify(filteredMovies)
                  );
                }}
              />
            ) : (
              <IconButton
                colorScheme="green"
                aria-label="Mark as watched"
                icon={<Icon as={ImCheckboxUnchecked} />}
                onClick={() => {
                  const newWatchedMovies = [
                    ...(watchedMovies || []),
                    movie,
                  ];
                  setWatchedMovies &&
                    setWatchedMovies(newWatchedMovies);
                  localStorage.setItem(
                    "watchedMovies",
                    JSON.stringify(newWatchedMovies)
                  );
                }}
              />
            ))}
        </Flex>
      </CardFooter>
    </Card>
  );
}
