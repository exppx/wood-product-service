import type { ComponentProps, PropsWithChildren } from "react";
import clsx from "clsx";

import s from "./Button.module.scss";

type ButtonProps = PropsWithChildren & ComponentProps<"button">;

function Button({ className, children, ...rest }: ButtonProps) {
  return (
    <button {...rest} className={clsx(className, s["button"])}>
      {children}
    </button>
  );
}

export default Button;
