import Head from "next/head";
import App from "./_app";

export default function Home() {
  return (
    <>
      <Head>
        <title>Movie Reminder</title>
        <meta
          name="description"
          content="Reminding people of movies to watch"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <link
          rel="icon"
          href="/favicon.ico"
        />
      </Head>
      <main></main>
    </>
  );
}
