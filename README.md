# Movie Reminder

Movie Reminder is a simple app that allows you to search for a movie and bookmark it watch it later.

## Demo Link

You can access the app deployed on vercel [here](https://movie-reminder.vercel.app).

## Current Features

It has the following features:

1. Search for movies by title.
2. Bookmark a movie you like or remove one from your bookmark list.
3. Create or choose a bookmark group for your bookmarks for easy bookmark navigation.
4. View bookmarked movies in a tab view: all, unwatched, watched bookmarked movies as well as those for your custom bookmark groups.
5. Mark a bookmarked movie as watched/unwatched.
6. Bookmarked movies are cached locally using `localStorage`.

## Possible New Features

1. Remove bookmark groups
2. Move one movie from one bookmark group to another without having to unbookmark and bookmark again.
3. Add pagination to the movie grid view when the number of bookmarked movies grow larger.
4. For searching, fetch results from the api automatically after the user stops typing for a few moment.

## Getting Started for Dev

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
