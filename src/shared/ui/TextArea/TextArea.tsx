import type { ComponentProps } from "react";
import clsx from "clsx";

import s from "./TextArea.module.scss";

interface TextAreaProps extends ComponentProps<"textarea"> {
  isError?: boolean;
}

function TextArea({ isError, className, ...rest }: TextAreaProps) {
  return (
    <textarea
      {...rest}
      className={clsx(className, s["textarea"], {
        [s["textarea_invalid"]]: isError,
      })}
      aria-invalid={isError}
    ></textarea>
  );
}

export default TextArea;
