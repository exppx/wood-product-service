import { useEffect, useState } from "react";
import type { SortParams } from "@/shared/types/sort";
import type { PriceListTableData, MaterialFilters } from "../types";
import getPriceListTableData from "../../api/getPriceListTableData";

function useMaterialPriceList(filters: MaterialFilters, sort: SortParams) {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
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
      setIsError(false);

      try {
        const data = await getPriceListTableData(filters, {
          sortBy: sort.sortBy,
          sort: sort.sort,
        });

        setData(data);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }

    void getData();
  }, [filters, sort.sortBy, sort.sort]);

  return { isLoading, isError, data };
}

export default useMaterialPriceList;
