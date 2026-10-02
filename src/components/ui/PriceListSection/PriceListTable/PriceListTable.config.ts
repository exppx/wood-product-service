import type { TranslationKey } from "@/types/locales";
import type { Material } from "@/types/db";

interface PriceListTableData {
  [key: Material["slug"]]: Material[];
}

const TABLE_HEADERS: { visible: TranslationKey; readable: TranslationKey }[] = [
  {
    visible: "PriceListTable.headers.wood.visible",
    readable: "PriceListTable.headers.wood.readable",
  },
  {
    visible: "PriceListTable.headers.length.visible",
    readable: "PriceListTable.headers.length.readable",
  },
  {
    visible: "PriceListTable.headers.width.visible",
    readable: "PriceListTable.headers.width.readable",
  },
  {
    visible: "PriceListTable.headers.height.visible",
    readable: "PriceListTable.headers.height.readable",
  },
  {
    visible: "PriceListTable.headers.volume.visible",
    readable: "PriceListTable.headers.volume.readable",
  },
  {
    visible: "PriceListTable.headers.price.visible",
    readable: "PriceListTable.headers.price.readable",
  },
  {
    visible: "PriceListTable.headers.priceM3.visible",
    readable: "PriceListTable.headers.priceM3.readable",
  },
];

const COLUMN_GROUPS_END_INDEXES = [3];
const COLUMN_GROUPS_START_INDEXES = COLUMN_GROUPS_END_INDEXES.map((i) => i + 1);

export {
  type PriceListTableData,
  TABLE_HEADERS,
  COLUMN_GROUPS_END_INDEXES,
  COLUMN_GROUPS_START_INDEXES,
};
