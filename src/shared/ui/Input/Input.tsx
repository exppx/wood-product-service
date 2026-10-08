import type { ComponentProps } from "react";
import clsx from "clsx";

import s from "./Input.module.scss";

interface InputProps extends ComponentProps<"input"> {
  isError?: boolean;
}

function Input({ isError, className, ...rest }: InputProps) {
  return (
    <input
      {...rest}
      className={clsx(className, s["input"], {
        [s["input_invalid"]]: isError,
      })}
      aria-invalid={isError}
    />
  );
}

export default Input;
