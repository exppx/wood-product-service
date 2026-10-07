import type { ComponentProps, PropsWithChildren } from "react";
import { Link } from "react-router";
import clsx from "clsx";

import styles from "./LinkButton.module.scss";

interface LinkButtonProps
  extends PropsWithChildren, ComponentProps<typeof Link> {
  isHash?: boolean;
}

function LinkButton({
  isHash,
  to,
  className,
  children,
  ...rest
}: LinkButtonProps) {
  const href =
    typeof to === "string" ? to : (to.hash ?? "") + (to.search ?? "");

  return isHash ? (
    <a
      {...rest}
      href={href}
      className={clsx([className, styles["link-button"]])}
    >
      {children}
    </a>
  ) : (
    <Link
      {...rest}
      to={to}
      className={clsx([className, styles["link-button"]])}
    >
      {children}
    </Link>
  );
}

export default LinkButton;
