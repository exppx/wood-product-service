import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import { Contact, Container, Logo } from "@/shared/ui";
import { CONTACTS, COPYRIGHT } from "./model";

import s from "./Footer.module.scss";

function Footer() {
  const { t } = useTranslation();

  return (
    <footer className={s["footer"]}>
      <Container width="xl">
        <div className={s["footer-inner"]}>
          <div className={s["footer__main"]}>
            <div className={s["footer__logo-container"]}>
              <Logo color="adaptive" />
            </div>

            <address>
              <ul className={s["footer__contacts"]}>
                {CONTACTS.map(({ Icon, contact, label, nowrap }) => (
                  <li
                    key={contact}
                    className={clsx({
                      [s["footer__contact_nowrap"]]: nowrap,
                    })}
                  >
                    <Contact
                      Icon={Icon}
                      label={t(label)}
                      contact={t(contact)}
                    />
                  </li>
                ))}
              </ul>
            </address>
          </div>

          <div className={s["footer__bottom"]}>
            <div>
              &copy; {COPYRIGHT.year} {COPYRIGHT.company}
            </div>
            <Link to={"#"} className={s["footer__bottom-link"]}>
              {t("Footer.privacy")}
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
