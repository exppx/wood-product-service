import type { ComponentProps } from "react";
import clsx from "clsx";

import styles from "./CloseSideMenuButton.module.scss";

function CloseSideMenuButton({ className, ...rest }: ComponentProps<"button">) {
  return (
    <button {...rest} className={clsx([className, styles["close-side-menu"]])}>
      <div className={styles["close-side-menu__lines"]}>
        <div className={styles["close-side-menu__line"]} />
        <div className={styles["close-side-menu__line"]} />
        <div className={styles["close-side-menu__line"]} />
      </div>
    </button>
  );
}

export default CloseSideMenuButton;
