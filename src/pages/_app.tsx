import { ChakraProvider } from "@chakra-ui/react";
import Link from "next/link";
import { Container, Flex, Heading } from "@chakra-ui/react";
import Search from "./search";
import Bookmarks from "./bookmarks";
import { useState } from "react";

type Movie = {
  Title: string,
  Year: string,
  Poster: string,
  imdbID: string,
  Type: string,
};

export default function App() {
  const [bookmarkedMovies, setBookmarkedMovies] = useState<Movie[]>([]);
  return (
    <ChakraProvider>
      <Container maxW={"container.xl"} py={10}>
        <Flex alignItems={"center"}>
          <Link href="/">
            <Heading size={"xl"} cursor={"pointer"}>
              Movie Reminder
            </Heading>
          </Link>
        </Flex>
        <Search />
        <Bookmarks />
      </Container>
    </ChakraProvider>
  );
};