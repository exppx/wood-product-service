import { type ComponentProps, type PropsWithChildren } from "react";
import clsx from "clsx";

import styles from "./SectionFilled.module.scss";

interface SectionFilledProps extends PropsWithChildren, ComponentProps<"div"> {
  position: "left" | "right";
}

function SectionFilled({
  position,
  className,
  children,
  ...rest
}: SectionFilledProps) {
  return (
    <div
      {...rest}
      className={clsx([
        className,
        styles["section-filled"],
        {
          [styles["section-filled_left"]]: position === "left",
          [styles["section-filled_right"]]: position === "right",
        },
      ])}
    >
      {children}
    </div>
  );
}

export default SectionFilled;
