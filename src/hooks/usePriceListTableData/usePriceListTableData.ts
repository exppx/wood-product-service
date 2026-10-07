import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import usePriceFilters from "@/hooks/usePriceFilters/usePriceFilters";
import useSortParams from "@/shared/lib/hooks/useSortParams/useSortParams";
import type { PriceListTableData } from "@/components/ui/PriceListSection/PriceListTable/PriceListTable.config";
import getPriceListTableData from "@/api/getPriceListTableData";

function usePriceListTableData() {
  const { t } = useTranslation();
  const { priceFilters } = usePriceFilters();
  const { sortBy, sortDirection } = useSortParams();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<{
    en: PriceListTableData;
    ru: PriceListTableData;
  }>({
    en: {},
    ru: {},
  });

  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      setError(null);

      try {
        const data = await getPriceListTableData(priceFilters, {
          sortBy,
          sort: sortDirection,
        });

        setData(data);
      } catch {
        setError(t("PriceListTable.error"));
      } finally {
        setIsLoading(false);
      }
    }

    void getData();
  }, [priceFilters, sortBy, sortDirection, t]);

  return { isLoading, error, data };
}

export default usePriceListTableData;
