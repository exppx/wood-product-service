import type { SelectOption } from "@/shared/types/select";
import type { MaterialFilter, MaterialFilterValue } from "@/entities/material";

type MaterialFilterSelectOptions = {
  [key in MaterialFilter]: SelectOption<MaterialFilterValue<key>>[];
};

export type { MaterialFilterSelectOptions };
