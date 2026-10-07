import type { TranslationKey } from "@/shared/types/locales";
import type { SelectOption } from "@/shared/ui/Select/Select";
import type { SortButtonOptions } from "@/shared/ui/SortButtonsGroup/SortButtonsGroup";

const FILTER_NAMES = {
  wood: "wood",
  length: "length",
  width: "width",
  height: "height",
} as const;

type PriceFilter = (typeof FILTER_NAMES)[keyof typeof FILTER_NAMES];

type StringPriceFilter = Extract<PriceFilter, "wood">;

type PriceFilterValue<K extends PriceFilter> = K extends StringPriceFilter
  ? string
  : number | "";

type PriceFilters = {
  [key in PriceFilter]: PriceFilterValue<key>;
};

type PriceFilterSelectOptions = {
  [key in PriceFilter]: SelectOption<PriceFilterValue<key>>[];
};

const SIZE_FILTER_SELECTS_OPTIONS: {
  searchKey: PriceFilter;
  name: PriceFilter;
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

export {
  FILTER_NAMES,
  type PriceFilter,
  type PriceFilters,
  type PriceFilterSelectOptions,
  SIZE_FILTER_SELECTS_OPTIONS,
  SORT_BUTTONS_OPTIONS,
};
