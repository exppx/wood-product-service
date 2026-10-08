import type { ComponentProps, PropsWithChildren } from "react";
import clsx from "clsx";
import type { BreakPoint } from "@/shared/types/theme";

import styles from "./Container.module.scss";

interface ContainerProps extends PropsWithChildren, ComponentProps<"div"> {
  width: BreakPoint;
}

function Container({ width, children, className, ...rest }: ContainerProps) {
  return (
    <div
      {...rest}
      className={clsx([
        className,
        styles["container"],
        styles[`container_${width}`],
      ])}
    >
      {children}
    </div>
  );
}

export default Container;
