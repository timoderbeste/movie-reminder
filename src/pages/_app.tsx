import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";
import Link from "next/link";
import { Container, Flex, Heading, Spacer, Stack, VStack } from "@chakra-ui/react";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Container maxW={"container.xl"} py={10}>
        <Flex alignItems={"center"}>
          <Link href="/">
            <Heading size={"sm"} cursor={"pointer"}>
              Movie Reminder
            </Heading>
          </Link>
          <Spacer />
          <Stack spacing={4} direction={"row"}>
            <Link href="/search">
              <Heading size={"sm"} cursor={"pointer"}>
                Search
              </Heading>
            </Link>
            <Spacer />
            <Link href="/bookmarks">
              <Heading size={"sm"} cursor={"pointer"}>
                Bookmarks
              </Heading>
            </Link>
          </Stack>
        </Flex>
        <Component {...pageProps} />
      </Container>
    </ChakraProvider>
  );
};