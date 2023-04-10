import { Movie } from "@/types";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { useRef, useState } from "react";

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
  const inputRef = useRef<HTMLInputElement>(null);
  const [bookmarkGroup, setBookmarkGroup] = useState("All");
  return (
    <Modal
      closeOnOverlayClick={false}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          Add {"<<"} {movie.title} {">>"} to your bookmarks
        </ModalHeader>
        <ModalBody>
          <FormControl>
            <FormLabel>Bookmark Group</FormLabel>
            <Input
              ref={inputRef}
              value={bookmarkGroup}
              onChange={(e) => {
                setBookmarkGroup(e.target.value);
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
