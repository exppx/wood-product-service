import { type ComponentProps, type PropsWithChildren } from "react";
import clsx from "clsx";

import s from "./SectionFilled.module.scss";

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
      className={clsx(className, s["section-filled"], {
        [s["section-filled_left"]]: position === "left",
        [s["section-filled_right"]]: position === "right",
      })}
    >
      {children}
    </div>
  );
}

export default SectionFilled;
