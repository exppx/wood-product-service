import { useTranslation } from "react-i18next";
import { QUESTIONS_FORM_ID } from "@/components/ui/QuestionsSection/QuestionsForm/QuestionsForm.config";
import Container from "@/components/ui/Container/Container";
import Section from "@/components/ui/Section/Section";
import LinkButton from "@/components/ui/LinkButton/LinkButton";

import advantagesImage from "@/assets/images/advantages.webp";
import styles from "./AdvantagesSection.module.scss";

function AdvantagesSection() {
  const { t } = useTranslation();

  return (
    <Container width="xl">
      <Section title={t("AdvantagesSection.title")}>
        <div className={styles["advantages"]}>
          <Container width="lg" className={styles["advantages__main"]}>
            <img
              src={advantagesImage}
              alt={t("AdvantagesSection.imageAlt")}
              className={styles["advantages__image"]}
            />

            <ul className={styles["advantages__list"]}>
              <li className={styles["advantages__item"]}>
                {t("AdvantagesSection.text.1")}
              </li>
              <li className={styles["advantages__item"]}>
                {t("AdvantagesSection.text.2")}
              </li>
              <li className={styles["advantages__item"]}>
                {t("AdvantagesSection.text.3")}
              </li>
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
