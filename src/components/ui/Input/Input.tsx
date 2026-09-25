import type { ComponentProps } from "react";
import clsx from "clsx";

import styles from "./Input.module.scss";

interface InputProps extends ComponentProps<"input"> {
  isError?: boolean;
}

function Input({ isError, className, ...rest }: InputProps) {
  return (
    <input
      {...rest}
      className={clsx([
        className,
        styles["input"],
        {
          [styles["input_invalid"]]: isError,
        },
      ])}
      aria-invalid={isError}
    />
  );
}

export default Input;
