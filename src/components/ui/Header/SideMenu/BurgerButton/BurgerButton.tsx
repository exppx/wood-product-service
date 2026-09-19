import type { ComponentProps } from "react";
import clsx from "clsx";

import styles from "./BurgerButton.module.scss";

function BurgerButton({ className, ...rest }: ComponentProps<"button">) {
  return (
    <button {...rest} className={clsx([styles["burger-button"], className])}>
      <div className={styles["burger-button__lines"]}>
        <div className={styles["burger-button__line"]} />
        <div className={styles["burger-button__line"]} />
        <div className={styles["burger-button__line"]} />
      </div>
    </button>
  );
}

export default BurgerButton;
