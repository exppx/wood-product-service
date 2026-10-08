import type { ComponentProps, PropsWithChildren } from "react";
import clsx from "clsx";

import s from "./Section.module.scss";

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
    <section {...rest} className={clsx(className, s["section"])}>
      {title &&
        (isMainSection ? (
          <h1
            className={clsx(s["section__title"], {
              [s["section__title_right"]]: titlePosition === "right",
            })}
          >
            {title}
          </h1>
        ) : (
          <h2
            className={clsx(s["section__title"], {
              [s["section__title_right"]]: titlePosition === "right",
            })}
          >
            {title}
          </h2>
        ))}
      {children}
    </section>
  );
}

export default Section;
