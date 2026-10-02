import type { ComponentProps } from "react";
import clsx from "clsx";

import styles from "./Select.module.scss";

export interface SelectOption<T extends string | number> {
  label: string;
  value: T;
}

export interface SelectProps extends ComponentProps<"select"> {
  options: SelectOption<string | number>[];
}

function Select({ options, className, ...rest }: SelectProps) {
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
