import type { ComponentProps, MouseEvent } from "react";
import clsx from "clsx";
import { type SortParams } from "./SortButton.config";
import useSortParams from "@/shared/lib/hooks/useSortParams/useSortParams";
import ArrowToUpThinSvg from "@/shared/ui/icons/ArrowToUpThinSvg";

import styles from "./SortButton.module.scss";

interface SortButtonProps extends ComponentProps<"button"> {
  label: string;
  sortByValue: SortParams["sortBy"];
}

function SortButton({
  label,
  sortByValue,
  onClick,
  className,
  ...rest
}: SortButtonProps) {
  const { setSort, sortBy, sortDirection } = useSortParams();

  function handleClick(event: MouseEvent<HTMLButtonElement>) {
    setSort(sortByValue);
    onClick?.(event);
  }

  return (
    <button
      {...rest}
      onClick={handleClick}
      className={clsx([className, styles["sort-button"]], {
        [styles["sort-button_active"]]: sortByValue === sortBy,
      })}
    >
      <div className={styles["sort-button__label"]}>{label}</div>
      <div
        aria-hidden="true"
        className={clsx([
          styles["sort-button__icon"],
          {
            [styles["sort-button__icon_asc"]]:
              sortByValue === sortBy && sortDirection === "asc",
            [styles["sort-button__icon_desc"]]:
              sortByValue === sortBy && sortDirection === "desc",
          },
        ])}
      >
        <ArrowToUpThinSvg />
      </div>
    </button>
  );
}

export default SortButton;
