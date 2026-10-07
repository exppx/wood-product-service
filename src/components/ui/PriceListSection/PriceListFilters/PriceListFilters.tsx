import { useSearchParams } from "react-router";
import { useTranslation } from "react-i18next";
import {
  FILTER_NAMES,
  SIZE_FILTER_SELECTS_OPTIONS,
  SORT_BUTTONS_OPTIONS,
} from "./PriceListFilters.config";
import usePriceFilters from "@/hooks/usePriceFilters/usePriceFilters";
import usePriceFilterOptions from "@/hooks/usePriceFilterOptions/usePriceFilterOptions";
import { useSortParams } from "@/shared/lib/hooks";
import { Button, FilterSelect, SortButtonsGroup } from "@/shared/ui";

import styles from "./PriceListFilters.module.scss";

function PriceListFilters() {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const { priceFilters, clearPriceFilterParams } = usePriceFilters();
  const { filterOptions, isLoading, error } =
    usePriceFilterOptions(priceFilters);
  const { clearSortParams } = useSortParams();

  function resetFiltersAndSorting() {
    const newSearchParams = new URLSearchParams(searchParams);

    clearPriceFilterParams(newSearchParams);
    clearSortParams(newSearchParams);

    setSearchParams(newSearchParams);
  }

  if (error) {
    return (
      <p className={styles["price-list-filters__error"]} role="alert">
        {error}
      </p>
    );
  }

  return (
    <div className={styles["price-list-filters"]}>
      <div className={styles["price-list-filters__filters"]}>
        <FilterSelect
          label={t("PriceListFilters.filterLabels.wood")}
          searchKey={FILTER_NAMES.wood}
          name={FILTER_NAMES.wood}
          options={[
            { label: t("PriceListFilters.all"), value: "" },
            ...filterOptions.wood,
          ]}
          disabled={isLoading}
        />

        <div className={styles["price-list-filters__size-filters"]}>
          {SIZE_FILTER_SELECTS_OPTIONS.map(({ label, searchKey, name }) => (
            <FilterSelect
              key={searchKey}
              label={t(label)}
              searchKey={searchKey}
              name={name}
              options={[
                { label: t("PriceListFilters.all"), value: "" },
                ...filterOptions[searchKey],
              ]}
              disabled={isLoading}
            />
          ))}
        </div>
      </div>

      <SortButtonsGroup options={SORT_BUTTONS_OPTIONS} />

      <Button onClick={resetFiltersAndSorting}>
        {t("PriceListFilters.reset")}
      </Button>
    </div>
  );
}

export default PriceListFilters;
