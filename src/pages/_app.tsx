import {
  ChakraProvider,
  Spacer,
  Stack,
} from "@chakra-ui/react";
import Link from "next/link";
import { Container, Flex, Heading } from "@chakra-ui/react";
import Search from "./search";
import Bookmarks from "./bookmarks";
import { useEffect, useState } from "react";
import { Movie } from "@/types";

export default function App() {
  const [bookmarkedMovies, setBookmarkedMovies] = useState<
    Movie[]
  >([]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    const localData = localStorage.getItem(
      "bookmarkedMovies"
    );
    setBookmarkedMovies(
      localData ? JSON.parse(localData) : []
    );
  }, []);

  return (
    <ChakraProvider>
      <Container
        maxW={"container.xl"}
        py={10}
        px={10}
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
        />
        <Bookmarks
          bookmarkedMovies={bookmarkedMovies}
          setBookmarkedMovies={setBookmarkedMovies}
        />
      </Container>
    </ChakraProvider>
  );
}
