import type { PriceFilters } from "@/components/ui/PriceListSection/PriceListFilters/PriceListFilters.config";
import type { SortParams } from "@/shared/ui/SortButton/SortButton.config";
import type { Material } from "@/types/db";
import type { PriceListTableData } from "@/components/ui/PriceListSection/PriceListTable/PriceListTable.config";

import materials from "@/db/materials";
import materialsRu from "@/db/materials_ru";

function getPriceListTableDataForLocale(
  data: Material[],
  filters: PriceFilters,
  sorting: SortParams,
) {
  const filtered = data.reduce<PriceListTableData>((res, material) => {
    const passesWoodFilter =
      filters.wood === "" || material.slug === filters.wood;
    const passesLengthFilter =
      filters.length === "" || material.length === filters.length;
    const passesWidthFilter =
      filters.width === "" || material.width === filters.width;
    const passesHeightFilter =
      filters.height === "" || material.height === filters.height;

    if (
      passesWoodFilter &&
      passesLengthFilter &&
      passesWidthFilter &&
      passesHeightFilter
    ) {
      if (!res[material.slug]) {
        res[material.slug] = [];
      }

      res[material.slug].push(material);
    }

    return res;
  }, {});

  if (!sorting.sort || !sorting.sortBy) return filtered;

  if (sorting.sortBy === "price") {
    Object.keys(filtered).map((wood) => {
      filtered[wood].sort(({ price: a }, { price: b }) =>
        sorting.sort === "asc" ? a - b : b - a,
      );
    });
  }

  if (sorting.sortBy === "priceM3") {
    Object.keys(filtered).map((wood) => {
      filtered[wood].sort(({ priceM3: a }, { priceM3: b }) =>
        sorting.sort === "asc" ? a - b : b - a,
      );
    });
  }

  return filtered;
}

async function getPriceListTableData(
  filters: PriceFilters,
  sorting: SortParams,
): Promise<{
  en: PriceListTableData;
  ru: PriceListTableData;
}> {
  await new Promise<void>((res) => setTimeout(res, Math.random() * 1000));

  return {
    en: getPriceListTableDataForLocale(materials, filters, sorting),
    ru: getPriceListTableDataForLocale(materialsRu, filters, sorting),
  };
}

export default getPriceListTableData;
