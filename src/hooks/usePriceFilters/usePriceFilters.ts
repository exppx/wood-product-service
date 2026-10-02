import { useMemo } from "react";
import { useSearchParams } from "react-router";
import {
  FILTER_NAMES,
  type PriceFilters,
} from "@/components/ui/PriceListSection/PriceListFilters/PriceListFilters.config";

function usePriceFilters() {
  const [searchParams] = useSearchParams();

  const lengthFilterRaw = Number.parseInt(
    searchParams.get(FILTER_NAMES.length) || "",
  );
  const widthFilterRaw = Number.parseInt(
    searchParams.get(FILTER_NAMES.width) || "",
  );
  const heightFilterRaw = Number.parseInt(
    searchParams.get(FILTER_NAMES.height) || "",
  );

  const woodFilter = searchParams.get(FILTER_NAMES.wood);
  const lengthFilter =
    Number.isNaN(lengthFilterRaw) || lengthFilterRaw < 0 ? "" : lengthFilterRaw;
  const widthFilter =
    Number.isNaN(widthFilterRaw) || widthFilterRaw < 0 ? "" : widthFilterRaw;
  const heightFilter =
    Number.isNaN(heightFilterRaw) || heightFilterRaw < 0 ? "" : heightFilterRaw;

  const priceFilters: PriceFilters = useMemo(
    () => ({
      wood: woodFilter || "",
      length: lengthFilter,
      width: widthFilter,
      height: heightFilter,
    }),
    [woodFilter, lengthFilter, widthFilter, heightFilter],
  );

  function clearPriceFilterParams(params: URLSearchParams) {
    for (const filterName of Object.values(FILTER_NAMES)) {
      params.delete(filterName);
    }
  }

  return { priceFilters, clearPriceFilterParams } as const;
}

export default usePriceFilters;
