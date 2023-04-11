import { ChakraProvider, Stack } from "@chakra-ui/react";
import Link from "next/link";
import { Container, Flex, Heading } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Movie } from "@/types";
import SearchPage from "./search";
import BookmarksPage from "./bookmarks";
import { useRouter } from "next/router";

import "@/styles/global.css";

export default function App() {
  const [bookmarkedMovies, setBookmarkedMovies] = useState<
    Movie[]
  >([]);
  const [bookmarkGroups, setBookmarkGroups] = useState<
    string[]
  >([]);
  const router = useRouter();

  const isSearchRoute = router.pathname === "/search";
  const isBookmarksRoute =
    router.pathname === "/bookmarks" ||
    router.pathname === "/";

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
        <Flex
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Link href="/">
            <Heading
              size={"xl"}
              cursor={"pointer"}
            >
              Movie Reminder
            </Heading>
          </Link>
          <Stack
            direction={"row"}
            spacing={10}
          >
            <Link href="/search">
              <Heading
                size={"md"}
                cursor={"pointer"}
                className={
                  isSearchRoute ? "active-link" : ""
                }
              >
                Search
              </Heading>
            </Link>
            <Link href="/bookmarks">
              <Heading
                size={"md"}
                cursor={"pointer"}
                className={
                  isBookmarksRoute ? "active-link" : ""
                }
              >
                Bookmarks
              </Heading>
            </Link>
          </Stack>
        </Flex>
        {isSearchRoute && (
          <SearchPage
            bookmarkedMovies={bookmarkedMovies}
            setBookmarkedMovies={setBookmarkedMovies}
            bookmarkGroups={bookmarkGroups}
            setBookmarkGroups={setBookmarkGroups}
          />
        )}
        {isBookmarksRoute && (
          <BookmarksPage
            bookmarkedMovies={bookmarkedMovies}
            setBookmarkedMovies={setBookmarkedMovies}
            bookmarkGroups={bookmarkGroups}
            setBookmarkGroups={setBookmarkGroups}
          />
        )}
      </Container>
    </ChakraProvider>
  );
}
