import type { ComponentProps, ReactElement } from "react";
import clsx from "clsx";

import styles from "./IconButton.module.scss";

interface IconButtonProps extends ComponentProps<"button"> {
  Icon: ReactElement;
}

function IconButton({ Icon, className, ...rest }: IconButtonProps) {
  return (
    <button
      type="button"
      {...rest}
      className={clsx([className, styles["icon-button"]])}
    >
      <div className={styles["icon-button__icon-container"]}>{Icon}</div>
    </button>
  );
}

export default IconButton;
