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
  Stack,
  Text,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import {
  BsBookmarkDash,
  BsBookmarkPlus,
} from "react-icons/bs";
import {
  ImCheckboxChecked,
  ImCheckboxUnchecked,
} from "react-icons/im";
import BookmarkCreationModal from "../BookmarkCreationModal";

type MovieCardProps = {
  movie: Movie;
  bookmarkedMovies: Movie[];
  setBookmarkedMovies: React.Dispatch<
    React.SetStateAction<Movie[]>
  >;
  forBookmarks: boolean;
  bookmarkGroups?: string[];
  setBookmarkGroups?: React.Dispatch<
    React.SetStateAction<string[]>
  >;
};
export function MovieCard({
  movie,
  bookmarkedMovies,
  setBookmarkedMovies,
  forBookmarks = false,
  bookmarkGroups,
  setBookmarkGroups,
}: MovieCardProps): JSX.Element {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Card
        maxW={"sm"}
        variant={"outline"}
      >
        <CardBody>
          <Box
            display={"flex"}
            height={350}
            flexDirection={"column"}
            justifyContent={"space-between"}
            alignContent={"center"}
          >
            <Tooltip label={<Image src={movie.poster} />}>
              <Image
                src={movie.poster}
                alt={movie.title}
                height={250}
                objectFit={"cover"}
              />
            </Tooltip>
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
                }}
              />
            ) : (
              <IconButton
                colorScheme="blue"
                aria-label="Add to bookmarks"
                icon={<Icon as={BsBookmarkPlus} />}
                onClick={() => {
                  onOpen();
                }}
              />
            )}
            {forBookmarks &&
              (movie.watched ? (
                <IconButton
                  colorScheme="blue"
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
                  colorScheme="blue"
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
      {bookmarkGroups !== null && setBookmarkGroups && (
        <BookmarkCreationModal
          isOpen={isOpen}
          onClose={onClose}
          movie={movie}
          bookmarkedMovies={bookmarkedMovies}
          setBookmarkedMovies={setBookmarkedMovies}
          bookmarkGroups={bookmarkGroups ?? []}
          setBookmarkGroups={setBookmarkGroups ?? null}
        />
      )}
    </>
  );
}
