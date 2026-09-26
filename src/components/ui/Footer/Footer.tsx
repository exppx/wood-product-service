import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import { CONTACTS, COPYRIGHT } from "./Footer.config";
import Container from "@/components/ui/Container/Container";
import Logo from "@/components/ui/Logo/Logo";
import Contact from "@/components/ui/Contact/Contact";

import styles from "./Footer.module.scss";

function Footer() {
  const { t } = useTranslation();

  return (
    <footer className={styles["footer"]}>
      <Container width="xl">
        <div className={styles["footer-inner"]}>
          <div className={styles["footer__main"]}>
            <div className={styles["footer__logo-container"]}>
              <Logo color="adaptive" />
            </div>

            <address>
              <ul className={styles["footer__contacts"]}>
                {CONTACTS.map(({ Icon, contact, nowrap }) => (
                  <li
                    key={contact}
                    className={clsx({
                      [styles["footer__contact_nowrap"]]: nowrap,
                    })}
                  >
                    <Contact Icon={Icon} contact={t(contact)} />
                  </li>
                ))}
              </ul>
            </address>
          </div>

          <div className={styles["footer__bottom"]}>
            <div>
              &copy; {COPYRIGHT.year} {COPYRIGHT.company}
            </div>
            <Link to={"#"} className={styles["footer__bottom-link"]}>
              {t("Footer.privacy")}
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
