import { useTranslation } from "react-i18next";
import { useMedia } from "@/shared/lib/hooks";
import { Container, Section } from "@/shared/ui";
import { QuestionsForm } from "@/features/send-question";
import { LOG_IMAGE } from "./model";

import s from "./QuestionsSection.module.scss";

function QuestionsSection() {
  const { t } = useTranslation();
  const { isDesktop } = useMedia();

  return (
    <Container width="xl" className={s["questions-container"]}>
      <Section
        title={t("QuestionsSection.title")}
        titlePosition={isDesktop ? "right" : "left"}
        id="questions-form"
        className={s["questions-section"]}
      >
        <div className={s["questions"]}>
          <p className={s["questions__text"]}>{t("QuestionsSection.text")}</p>

          <div className={s["questions-form__form-container"]}>
            <QuestionsForm />
          </div>

          {isDesktop && (
            <img
              className={s["questions__image"]}
              src={LOG_IMAGE}
              alt={t("QuestionsSection.imageAlt")}
            />
          )}
        </div>
      </Section>
    </Container>
  );
}

export default QuestionsSection;
