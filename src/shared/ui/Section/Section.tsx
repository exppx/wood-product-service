import type { ComponentProps, PropsWithChildren } from "react";
import clsx from "clsx";

import styles from "./Section.module.scss";

interface SectionProps extends PropsWithChildren, ComponentProps<"section"> {
  title?: string;
  titlePosition?: "left" | "right";
  isMainSection?: boolean;
}

function Section({
  title,
  titlePosition = "left",
  isMainSection = false,
  className,
  children,
  ...rest
}: SectionProps) {
  return (
    <section {...rest} className={clsx([className, styles["section"]])}>
      {title &&
        (isMainSection ? (
          <h1
            className={clsx([
              styles["section__title"],
              {
                [styles["section__title_right"]]: titlePosition === "right",
              },
            ])}
          >
            {title}
          </h1>
        ) : (
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
        ))}
      {children}
    </section>
  );
}

export default Section;
