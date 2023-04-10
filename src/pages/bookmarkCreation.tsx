import { Movie } from "@/types";
import {
  Button,
  FormControl,
  FormLabel,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { useState } from "react";
import Creatable from "react-select/creatable";

type BookmarkCreationProps = {
  isOpen: boolean;
  onClose: () => void;
  movie: Movie;
  bookmarkedMovies: Movie[];
  setBookmarkedMovies: React.Dispatch<
    React.SetStateAction<Movie[]>
  >;
  onSetBookmarkedMovies?: Function;
  bookmarkGroups: string[];
  setBookmarkGroups: React.Dispatch<
    React.SetStateAction<string[]>
  >;
};

type OptionType = {
  value: string;
  label: string;
};

export default function BookmarkCreationModal({
  isOpen,
  onClose,
  movie,
  bookmarkedMovies,
  setBookmarkedMovies,
  onSetBookmarkedMovies,
  bookmarkGroups,
  setBookmarkGroups,
}: BookmarkCreationProps): JSX.Element {
  const [bookmarkGroup, setBookmarkGroup] = useState("All");

  const options = bookmarkGroups.map((group) => {
    return {
      label: group,
      value: group,
    } as OptionType;
  });

  return (
    <Modal
      closeOnOverlayClick={false}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          Add <u>{movie.title}</u> to your bookmarks
        </ModalHeader>
        <ModalBody>
          <FormControl>
            <FormLabel>Bookmark Group</FormLabel>
            <Creatable
              options={options}
              value={options.find(
                (option) => option.value === bookmarkGroup
              )}
              onChange={(e) =>
                setBookmarkGroup(e?.value as string)
              }
              onCreateOption={(inputValue) => {
                const newBookmarkGroups = [
                  ...bookmarkGroups,
                  inputValue,
                ];
                setBookmarkGroup(inputValue);
                setBookmarkGroups(newBookmarkGroups);
                localStorage.setItem(
                  "bookmarkGroups",
                  JSON.stringify(newBookmarkGroups)
                );
              }}
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            onClick={() => {
              movie.bookmarkGroup = bookmarkGroup;
              const newBookmarkedMovies = [
                ...bookmarkedMovies,
                movie,
              ];
              setBookmarkedMovies(newBookmarkedMovies);
              localStorage.setItem(
                "bookmarkedMovies",
                JSON.stringify(newBookmarkedMovies)
              );

              if (!bookmarkGroups.includes(bookmarkGroup)) {
                const newBookmarkGroups = [
                  ...bookmarkGroups,
                  bookmarkGroup,
                ];
                setBookmarkGroups(newBookmarkGroups);
                localStorage.setItem(
                  "bookmarkGroups",
                  JSON.stringify(newBookmarkGroups)
                );
              }

              if (onSetBookmarkedMovies) {
                onSetBookmarkedMovies();
              }
              onClose();
            }}
          >
            Save
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
