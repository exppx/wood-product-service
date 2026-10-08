import type { ComponentProps } from "react";
import clsx from "clsx";

import s from "./CloseSideMenuButton.module.scss";

function CloseSideMenuButton({ className, ...rest }: ComponentProps<"button">) {
  return (
    <button {...rest} className={clsx(className, s["close-side-menu"])}>
      <div className={s["close-side-menu__lines"]}>
        <div className={s["close-side-menu__line"]} />
        <div className={s["close-side-menu__line"]} />
        <div className={s["close-side-menu__line"]} />
      </div>
    </button>
  );
}

export default CloseSideMenuButton;
