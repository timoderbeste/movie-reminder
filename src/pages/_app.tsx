import { ChakraProvider } from "@chakra-ui/react";
import Link from "next/link";
import { Container, Flex, Heading } from "@chakra-ui/react";
import Search from "../components/Search";
import Bookmarks from "../components/Bookmarks";
import { useEffect, useState } from "react";
import { Movie } from "@/types";

export default function App() {
  const [bookmarkedMovies, setBookmarkedMovies] = useState<
    Movie[]
  >([]);
  const [bookmarkGroups, setBookmarkGroups] = useState<
    string[]
  >([]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    const bookmarkedMoviesString = localStorage.getItem(
      "bookmarkedMovies"
    );
    setBookmarkedMovies(
      bookmarkedMoviesString
        ? JSON.parse(bookmarkedMoviesString)
        : []
    );

    const bookmarkGroupsString = localStorage.getItem(
      "bookmarkGroups"
    );
    setBookmarkGroups(
      bookmarkGroupsString
        ? JSON.parse(bookmarkGroupsString)
        : []
    );
  }, []);

  return (
    <ChakraProvider>
      <Container
        maxW={"container.xl"}
        py={10}
        px={5}
      >
        <Flex alignItems={"center"}>
          <Link href="/">
            <Heading
              size={"xl"}
              cursor={"pointer"}
            >
              Movie Reminder
            </Heading>
          </Link>
        </Flex>
        <Search
          bookmarkedMovies={bookmarkedMovies}
          setBookmarkedMovies={setBookmarkedMovies}
          bookmarkGroups={bookmarkGroups}
          setBookmarkGroups={setBookmarkGroups}
        />
        <Bookmarks
          bookmarkedMovies={bookmarkedMovies}
          setBookmarkedMovies={setBookmarkedMovies}
          bookmarkGroups={bookmarkGroups}
          setBookmarkGroups={setBookmarkGroups}
        />
      </Container>
    </ChakraProvider>
  );
}
