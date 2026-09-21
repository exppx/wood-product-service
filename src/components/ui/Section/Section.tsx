import type { ComponentProps, PropsWithChildren } from "react";
import clsx from "clsx";

import styles from "./Section.module.scss";

type SectionProps = PropsWithChildren & ComponentProps<"section">;

function Section({ className, children, ...rest }: SectionProps) {
  return (
    <section {...rest} className={clsx([className, styles["section"]])}>
      {children}
    </section>
  );
}

export default Section;
