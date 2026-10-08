import type { ComponentProps } from "react";
import clsx from "clsx";

import s from "./BurgerButton.module.scss";

function BurgerButton({ className, ...rest }: ComponentProps<"button">) {
  return (
    <button {...rest} className={clsx(s["burger-button"], className)}>
      <div className={s["burger-button__lines"]}>
        <div className={s["burger-button__line"]} />
        <div className={s["burger-button__line"]} />
        <div className={s["burger-button__line"]} />
      </div>
    </button>
  );
}

export default BurgerButton;
