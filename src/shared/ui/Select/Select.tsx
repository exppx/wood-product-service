import type { ComponentProps } from "react";
import clsx from "clsx";
import type { SelectOption } from "@/shared/types/select";

import styles from "./Select.module.scss";

interface SelectProps<
  T extends string | number,
> extends ComponentProps<"select"> {
  options: SelectOption<T>[];
}

function Select<T extends string | number>({
  options,
  className,
  ...rest
}: SelectProps<T>) {
  return (
    <div className={styles["select-wrapper"]}>
      <select {...rest} className={clsx([className, styles["select"]])}>
        {options.map((opt) => (
          <option
            key={opt.value}
            value={opt.value}
            className={styles["select__option"]}
          >
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Select;
