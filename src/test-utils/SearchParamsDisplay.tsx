import { useSearchParams } from "react-router";

function SearchParamsDisplay() {
  const [searchParams] = useSearchParams();

  return <div data-testid="search-params">{searchParams.toString()}</div>;
}

export default SearchParamsDisplay;
