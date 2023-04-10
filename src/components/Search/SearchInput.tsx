import {
  Button,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Spinner,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { Movie } from "@/types";

type SearchInputProps = {
  searchText: string;
  setSearchText: React.Dispatch<
    React.SetStateAction<string>
  >;
  handleSearch: () => void;
  isLoading: boolean;
  movies: Movie[];
  handleCancel: () => void;
};
export function SearchInput({
  searchText,
  setSearchText,
  handleSearch,
  isLoading,
  movies,
  handleCancel,
}: SearchInputProps): JSX.Element {
  return (
    <Flex>
      <InputGroup mr={5}>
        <InputLeftElement pointerEvents="none">
          <SearchIcon color="gray.300" />
        </InputLeftElement>
        <Flex
          position={"relative"}
          width={"100%"}
        >
          <Input
            type="text"
            placeholder="Search for a movie"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
            disabled={isLoading}
            pr={isLoading ? 35 : 0}
            pl={10}
          />
          {isLoading && (
            <Spinner
              size={"sm"}
              position={"absolute"}
              top={"30%"}
              right={5}
            />
          )}
        </Flex>
      </InputGroup>
      <Button
        onClick={
          movies.length > 0 ? handleCancel : handleSearch
        }
        mr={5}
      >
        {movies.length > 0 ? "Cancel" : "Search"}
      </Button>
    </Flex>
  );
}
