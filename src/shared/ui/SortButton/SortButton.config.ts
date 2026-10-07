const SORT_BY_KEY = "sortBy";
const SORT_DIRECTION_KEY = "sort";

const SORT_DIRECTION = {
  ascending: "asc",
  descending: "desc",
  unset: "",
} as const;

function isSortDirection(value: string): value is SortDirection {
  return (Object.values(SORT_DIRECTION) as readonly string[]).includes(value);
}

type SortDirection = (typeof SORT_DIRECTION)[keyof typeof SORT_DIRECTION];

type SortParams = {
  sort: SortDirection;
  sortBy: string;
};

export {
  SORT_BY_KEY,
  SORT_DIRECTION_KEY,
  SORT_DIRECTION,
  isSortDirection,
  type SortDirection,
  type SortParams,
};
