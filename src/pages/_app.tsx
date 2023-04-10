import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";
import Link from "next/link";
import { Container, Flex, Heading, Spacer, Stack } from "@chakra-ui/react";
import Search from "./search";

export default function App({ Component, pageProps }: AppProps) {
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
        {Component === Search && <Search />}
      </Container>
    </ChakraProvider>
  );
};