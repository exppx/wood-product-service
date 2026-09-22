import type { ComponentProps, PropsWithChildren } from "react";
import clsx from "clsx";

import styles from "./Section.module.scss";

interface SectionProps extends PropsWithChildren, ComponentProps<"section"> {
  title?: string;
  titlePosition?: "left" | "right";
}

function Section({
  title,
  titlePosition = "left",
  className,
  children,
  ...rest
}: SectionProps) {
  return (
    <section {...rest} className={clsx([className, styles["section"]])}>
      {title && (
        <h2
          className={clsx([
            styles["section__title"],
            {
              [styles["section__title_right"]]: titlePosition === "right",
            },
          ])}
        >
          {title}
        </h2>
      )}
      {children}
    </section>
  );
}

export default Section;
