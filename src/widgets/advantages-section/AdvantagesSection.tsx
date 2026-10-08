import { useTranslation } from "react-i18next";
import { Container, LinkButton, Section } from "@/shared/ui";
import { QUESTIONS_FORM_ID } from "@/features/send-question";
import { ADVANTAGES_IMAGE } from "./model";

import styles from "./AdvantagesSection.module.scss";

function AdvantagesSection() {
  const { t } = useTranslation();

  return (
    <Container width="xl">
      <Section title={t("AdvantagesSection.title")}>
        <div className={styles["advantages"]}>
          <Container width="lg" className={styles["advantages__main"]}>
            <img
              src={ADVANTAGES_IMAGE}
              alt={t("AdvantagesSection.imageAlt")}
              className={styles["advantages__image"]}
            />

            <ul className={styles["advantages__list"]}>
              <li>{t("AdvantagesSection.text.1")}</li>
              <li>{t("AdvantagesSection.text.2")}</li>
              <li>{t("AdvantagesSection.text.3")}</li>
            </ul>
          </Container>

          <div className={styles["advantages__button-container"]}>
            <LinkButton to={`#${QUESTIONS_FORM_ID}`} isHash>
              {t("AdvantagesSection.cta")}
            </LinkButton>
          </div>
        </div>
      </Section>
    </Container>
  );
}

export default AdvantagesSection;
