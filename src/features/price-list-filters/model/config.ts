import type { TranslationKey } from "@/shared/types/locales";
import type { SortButtonOptions } from "@/shared/types/sort";
import { FILTER_NAMES, type MaterialFilter } from "@/entities/material";

const SIZE_FILTER_SELECTS_OPTIONS: {
  searchKey: MaterialFilter;
  name: MaterialFilter;
  label: TranslationKey;
}[] = [
  {
    label: "PriceListFilters.filterLabels.length",
    searchKey: FILTER_NAMES.length,
    name: FILTER_NAMES.length,
  },
  {
    label: "PriceListFilters.filterLabels.width",
    searchKey: FILTER_NAMES.width,
    name: FILTER_NAMES.width,
  },
  {
    label: "PriceListFilters.filterLabels.height",
    searchKey: FILTER_NAMES.height,
    name: FILTER_NAMES.height,
  },
];

const SORT_BUTTONS_OPTIONS: SortButtonOptions[] = [
  {
    visibleLabel: "PriceListFilters.sortLabels.price.visible",
    readableLabel: "PriceListFilters.sortLabels.price.aria",
    sortByValue: "price",
  },
  {
    visibleLabel: "PriceListFilters.sortLabels.priceM3.visible",
    readableLabel: "PriceListFilters.sortLabels.priceM3.aria",
    sortByValue: "priceM3",
  },
];

export { SIZE_FILTER_SELECTS_OPTIONS, SORT_BUTTONS_OPTIONS };
