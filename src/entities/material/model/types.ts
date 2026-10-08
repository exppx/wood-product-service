interface Material {
  id: string;
  wood: string;
  slug: string;
  length: number;
  width: number;
  height: number;
  volume: number;
  price: number;
  priceM3: number;
}

interface PriceListTableData {
  [key: Material["slug"]]: Material[];
}

const FILTER_NAMES = {
  wood: "wood",
  length: "length",
  width: "width",
  height: "height",
} as const;

type MaterialFilter = (typeof FILTER_NAMES)[keyof typeof FILTER_NAMES];

type StringMaterialFilter = Extract<MaterialFilter, "wood">;

type MaterialFilterValue<K extends MaterialFilter> =
  K extends StringMaterialFilter ? string : number | "";

type MaterialFilters = {
  [key in MaterialFilter]: MaterialFilterValue<key>;
};

export {
  type Material,
  type PriceListTableData,
  FILTER_NAMES,
  type MaterialFilter,
  type MaterialFilterValue,
  type MaterialFilters,
};
