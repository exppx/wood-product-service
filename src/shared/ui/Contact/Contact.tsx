import type { ComponentProps, ComponentType } from "react";
import clsx from "clsx";

import s from "./Contact.module.scss";

interface ContactProps extends ComponentProps<"div"> {
  Icon: ComponentType;
  contact: string;
  label: string;
}

function Contact({ Icon, contact, label, className, ...rest }: ContactProps) {
  return (
    <div {...rest} className={clsx(className, s["contact"])}>
      <div className={s["contact__icon"]}>
        <Icon />
      </div>
      <div className={s["contact__label"]}>{label}</div>
      <div className={s["contact__text"]}>{contact}</div>
    </div>
  );
}

export default Contact;
