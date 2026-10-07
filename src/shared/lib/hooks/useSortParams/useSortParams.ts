import { useSearchParams } from "react-router";
import {
  isSortDirection,
  SORT_BY_KEY,
  SORT_DIRECTION,
  SORT_DIRECTION_KEY,
  type SortDirection,
  type SortParams,
} from "@/shared/ui/SortButton/SortButton.config";

function useSortParams() {
  const [searchParams, setSearchParams] = useSearchParams();

  const sortBy: SortParams["sortBy"] = searchParams.get(SORT_BY_KEY) || "";

  const sortDirectionRaw = searchParams.get(SORT_DIRECTION_KEY) || "";
  let sortDirection: SortDirection;

  if (!isSortDirection(sortDirectionRaw)) {
    sortDirection = SORT_DIRECTION.unset;
  } else {
    sortDirection = sortDirectionRaw;
  }

  function setSort(sortByValue: SortParams["sortBy"]) {
    const newSearchParams = new URLSearchParams(searchParams);

    if (sortByValue !== sortBy) {
      newSearchParams.set(SORT_BY_KEY, sortByValue);
      newSearchParams.set(SORT_DIRECTION_KEY, SORT_DIRECTION.ascending);
    } else if (sortDirection === "") {
      newSearchParams.set(SORT_DIRECTION_KEY, SORT_DIRECTION.ascending);
    } else if (sortDirection === "asc") {
      newSearchParams.set(SORT_DIRECTION_KEY, SORT_DIRECTION.descending);
    } else {
      newSearchParams.delete(SORT_DIRECTION_KEY);
      newSearchParams.delete(SORT_BY_KEY);
    }

    setSearchParams(newSearchParams);
  }

  function clearSortParams(params: URLSearchParams) {
    params.delete(SORT_DIRECTION_KEY);
    params.delete(SORT_BY_KEY);
  }

  return {
    sortDirection,
    sortBy,
    setSort,
    clearSortParams,
  } as const;
}

export default useSortParams;
