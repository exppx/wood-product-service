import type { Locale } from "@/shared/types/locales";
import type { MaterialFilters } from "@/entities/material";
import type { MaterialFilterSelectOptions } from "../model";

import materials from "@/db/materials";
import materialsRu from "@/db/materials_ru";

function getFilterOptionsForLocale(
  data: typeof materials,
  filters: MaterialFilters,
) {
  const result: MaterialFilterSelectOptions =
    data.reduce<MaterialFilterSelectOptions>(
      (acc, material) => {
        const passesWoodFilter =
          filters.wood === "" || filters.wood === material.slug;
        const passesLengthFilter =
          filters.length === "" || filters.length === material.length;
        const passesWidthFilter =
          filters.width === "" || filters.width === material.width;
        const passesHeightFilter =
          filters.height === "" || filters.height === material.height;

        if (
          passesLengthFilter &&
          passesWidthFilter &&
          passesHeightFilter &&
          !acc.wood.map(({ value }) => value).includes(material.slug)
        )
          acc.wood.push({ label: material.wood, value: material.slug });

        if (
          passesWoodFilter &&
          passesWidthFilter &&
          passesHeightFilter &&
          !acc.length.map(({ value }) => value).includes(material.length)
        )
          acc.length.push({
            label: material.length.toString(),
            value: material.length,
          });

        if (
          passesWoodFilter &&
          passesLengthFilter &&
          passesHeightFilter &&
          !acc.width.map(({ value }) => value).includes(material.width)
        )
          acc.width.push({
            label: material.width.toString(),
            value: material.width,
          });

        if (
          passesWoodFilter &&
          passesLengthFilter &&
          passesWidthFilter &&
          !acc.height.map(({ value }) => value).includes(material.height)
        )
          acc.height.push({
            label: material.height.toString(),
            value: material.height,
          });

        return acc;
      },
      {
        wood: [],
        length: [],
        width: [],
        height: [],
      },
    );

  result.wood.sort(({ value: a }, { value: b }) => a.localeCompare(b));
  result.length.sort(({ value: a }, { value: b }) => Number(a) - Number(b));
  result.width.sort(({ value: a }, { value: b }) => Number(a) - Number(b));
  result.height.sort(({ value: a }, { value: b }) => Number(a) - Number(b));

  return result;
}

async function getFilterOptions(
  filters: MaterialFilters,
): Promise<Record<Locale, MaterialFilterSelectOptions>> {
  await new Promise<void>((res) => setTimeout(res, Math.random() * 500));

  return {
    en: getFilterOptionsForLocale(materials, filters),
    ru: getFilterOptionsForLocale(materialsRu, filters),
  };
}

export default getFilterOptions;
