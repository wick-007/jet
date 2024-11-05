import { useTransition } from "react";
import { replace } from "react-router-dom";
import { useDebouncedCallback } from "use-debounce";
import { PlaceholdersAndVanishInput } from "..";
import { SEARCH_PARAMS } from "@/utils/constants/search.constants";
import { useSearch } from "@/utils";

interface IProps<T> {
  entityType: T;
  placeholders?: string[];
  disabled?: boolean;
}

type SearchParamKeys = keyof typeof SEARCH_PARAMS;

export function Search<T extends SearchParamKeys>({
  entityType,
  disabled,
  placeholders = [
    "Search for entity 1",
    "Another Search for entity 2",
    "Search for entity 3",
  ],
}: IProps<T>) {
  const [isPending, startTransition] = useTransition();
  const [params, pathname, serialize] = useSearch();

  const handleSearch = useDebouncedCallback((term: string) => {
    const updatedParams = serialize(SEARCH_PARAMS[entityType], term);

    startTransition(() => {
      replace(`${pathname}?${updatedParams.toString()}`);
    });
  }, 300);

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <PlaceholdersAndVanishInput
        placeholders={placeholders}
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={params.get(SEARCH_PARAMS[entityType])?.toString() || ""}
        isPending={isPending}
        disabled={disabled}
      />
    </div>
  );
}
