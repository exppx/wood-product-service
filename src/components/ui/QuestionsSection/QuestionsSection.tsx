import { useTranslation } from "react-i18next";
import useMedia from "@/hooks/useMedia/useMedia";
import Container from "@/components/ui/Container/Container";
import Section from "@/components/ui/Section/Section";
import QuestionsForm from "./QuestionsForm/QuestionsForm";

import logImage from "@/assets/images/cut-log.webp";
import styles from "./QuestionsSection.module.scss";

function QuestionsSection() {
  const { t } = useTranslation();
  const { isDesktop } = useMedia();

  return (
    <Container width="xl" className={styles["questions-container"]}>
      <Section
        title={t("QuestionsSection.title")}
        titlePosition={isDesktop ? "right" : "left"}
        id="questions-form"
        className={styles["questions-section"]}
      >
        <div className={styles["questions"]}>
          <p className={styles["questions__text"]}>
            {t("QuestionsSection.text")}
          </p>

          <div className={styles["questions-form__form-container"]}>
            <QuestionsForm />
          </div>

          {isDesktop && (
            <img
              className={styles["questions__image"]}
              src={logImage}
              alt={t("QuestionsSection.imageAlt")}
            />
          )}
        </div>
      </Section>
    </Container>
  );
}

export default QuestionsSection;
