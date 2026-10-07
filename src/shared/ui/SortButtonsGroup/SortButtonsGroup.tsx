import { useId, useState } from "react";
import { useTranslation } from "react-i18next";
import type { TranslationKey } from "@/shared/types/locales";
import type { SortParams } from "@/shared/ui/SortButton/SortButton.config";
import useSortParams from "@/shared/lib/hooks/useSortParams/useSortParams";
import SortButton from "@/shared/ui/SortButton/SortButton";

import styles from "./SortButtonsGroup.module.scss";

export interface SortButtonOptions {
  visibleLabel: TranslationKey;
  readableLabel: TranslationKey;
  sortByValue: SortParams["sortBy"];
}

interface SortButtonsGroupProps {
  options: SortButtonOptions[];
}

function SortButtonsGroup({ options }: SortButtonsGroupProps) {
  const { t } = useTranslation();
  const sortTitleId = useId();
  const { sortBy, sortDirection } = useSortParams();
  const [currentSortTitle, setCurrentSortTitle] = useState<TranslationKey>(
    () => {
      const initialTitle = options.find(
        (opt) => opt.sortByValue === sortBy,
      )?.readableLabel;

      return initialTitle || "SortButtonsGroup.notSorted";
    },
  );

  return (
    <div className={styles["sort-buttons"]}>
      <p id={sortTitleId} className={styles["sort-buttons__title"]}>
        {t("SortButtonsGroup.sortBy")}
      </p>

      <div
        className={styles["sort-buttons__buttons"]}
        role="group"
        aria-labelledby={sortTitleId}
      >
        {options.map(({ visibleLabel, readableLabel, sortByValue }) => (
          <SortButton
            key={sortByValue}
            label={t(visibleLabel)}
            aria-label={t(readableLabel)}
            sortByValue={sortByValue}
            onClick={() => setCurrentSortTitle(readableLabel)}
          />
        ))}
      </div>

      <div role="status" className={styles["sort-buttons__status"]}>
        {sortDirection === "" || sortBy === ""
          ? t("SortButtonsGroup.notSorted")
          : t("SortButtonsGroup.sortStatus", {
              by: t(currentSortTitle),
              direction:
                sortDirection === "asc"
                  ? t("SortButtonsGroup.asc")
                  : t("SortButtonsGroup.desc"),
            })}
      </div>
    </div>
  );
}

export default SortButtonsGroup;
