import type { ComponentProps, ComponentType } from "react";
import clsx from "clsx";

import styles from "./Contact.module.scss";

interface ContactProps extends ComponentProps<"div"> {
  Icon: ComponentType;
  contact: string;
  label: string;
}

function Contact({ Icon, contact, label, className, ...rest }: ContactProps) {
  return (
    <div {...rest} className={clsx([className, styles["contact"]])}>
      <div className={styles["contact__icon"]}>
        <Icon />
      </div>
      <div className={styles["contact__label"]}>{label}</div>
      <div className={styles["contact__text"]}>{contact}</div>
    </div>
  );
}

export default Contact;
