import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import type { Locale } from "@/shared/types/locales";
import getFilterOptions from "@/api/getFilterOptions";
import type {
  PriceFilterSelectOptions,
  PriceFilters,
} from "@/components/ui/PriceListSection/PriceListFilters/PriceListFilters.config";

function usePriceFilterOptions(filters: PriceFilters) {
  const { t, i18n } = useTranslation();
  const [filterOptions, setFilterOptions] = useState<PriceFilterSelectOptions>({
    wood: [],
    length: [],
    width: [],
    height: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function updateFilterOptions() {
      setError(null);
      setIsLoading(true);

      try {
        const newFilterOptions = await getFilterOptions(filters);

        setFilterOptions(newFilterOptions[i18n.language as Locale]);
      } catch {
        setError(t("PriceListFilters.error"));
      } finally {
        setIsLoading(false);
      }
    }

    void updateFilterOptions();
  }, [i18n.language, filters, t]);

  return { isLoading, error, filterOptions } as const;
}

export default usePriceFilterOptions;
