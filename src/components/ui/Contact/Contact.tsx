import type { ComponentType } from "react";

import styles from "./Contact.module.scss";

interface ContactProps {
  Icon: ComponentType;
  contact: string;
  nowrap?: boolean;
}

function Contact({ Icon, contact }: ContactProps) {
  return (
    <div className={styles["contact"]}>
      <div className={styles["contact__icon"]}>
        <Icon />
      </div>
      <div className={styles["contact__text"]}>{contact}</div>
    </div>
  );
}

export default Contact;
