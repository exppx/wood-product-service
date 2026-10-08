import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import type { Locale } from "@/shared/types/locales";
import type { MaterialFilters } from "@/entities/material";
import getFilterOptions from "../../api/getFilterOptions";
import type { MaterialFilterSelectOptions } from "../types";

function usePriceListFilterOptions(filters: MaterialFilters) {
  const { t, i18n } = useTranslation();
  const [filterOptions, setFilterOptions] =
    useState<MaterialFilterSelectOptions>({
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

export default usePriceListFilterOptions;
