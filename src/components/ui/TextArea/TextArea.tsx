import clsx from "clsx";
import type { ComponentProps } from "react";

import styles from "./TextArea.module.scss";

interface TextAreaProps extends ComponentProps<"textarea"> {
  isError?: boolean;
}

function TextArea({ isError, className, ...rest }: TextAreaProps) {
  return (
    <textarea
      {...rest}
      className={clsx([
        className,
        styles["textarea"],
        {
          [styles["textarea_invalid"]]: isError,
        },
      ])}
      aria-invalid={isError}
    ></textarea>
  );
}

export default TextArea;
