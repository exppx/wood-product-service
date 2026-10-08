import type { ComponentProps, ReactElement } from "react";
import clsx from "clsx";

import s from "./IconButton.module.scss";

interface IconButtonProps extends ComponentProps<"button"> {
  Icon: ReactElement;
}

function IconButton({ Icon, className, ...rest }: IconButtonProps) {
  return (
    <button
      type="button"
      {...rest}
      className={clsx(className, s["icon-button"])}
    >
      <div className={s["icon-button__icon-container"]}>{Icon}</div>
    </button>
  );
}

export default IconButton;
