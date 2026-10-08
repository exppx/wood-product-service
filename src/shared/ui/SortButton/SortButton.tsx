import type { ComponentProps, MouseEvent } from "react";
import clsx from "clsx";
import { type SortParams } from "@/shared/types/sort";
import { useSortParams } from "@/shared/lib/hooks";
import { ArrowToUpThinSvg } from "@/shared/ui/icons";

import s from "./SortButton.module.scss";

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
      className={clsx(className, s["sort-button"], {
        [s["sort-button_active"]]: sortByValue === sortBy,
      })}
    >
      <div className={s["sort-button__label"]}>{label}</div>
      <div
        aria-hidden="true"
        className={clsx(s["sort-button__icon"], {
          [s["sort-button__icon_asc"]]:
            sortByValue === sortBy && sortDirection === "asc",
          [s["sort-button__icon_desc"]]:
            sortByValue === sortBy && sortDirection === "desc",
        })}
      >
        <ArrowToUpThinSvg />
      </div>
    </button>
  );
}

export default SortButton;
