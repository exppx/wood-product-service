import { useTranslation } from "react-i18next";
import clsx from "clsx";
import { Container, Section, SectionFilled } from "@/shared/ui";
import { IMAGE_1, IMAGE_2, IMAGE_3 } from "./model";

import styles from "./AboutSection.module.scss";

interface AboutSectionProps {
  isMainSection?: boolean;
}

function AboutSection({ isMainSection }: AboutSectionProps) {
  const { t } = useTranslation();

  return (
    <Container width="xl" className={styles["about-container"]}>
      <Section>
        <SectionFilled
          position="left"
          className={styles["about-section-filled"]}
        >
          <div className={styles["about"]}>
            <div className={styles["about__info-container"]}>
              {isMainSection ? (
                <h1 className={styles["about__title"]}>
                  {t("AboutSection.title")}
                </h1>
              ) : (
                <h2 className={styles["about__title"]}>
                  {t("AboutSection.title")}
                </h2>
              )}
              <p>
                <b>{t("AboutSection.text.company")}</b>
                {t("AboutSection.text.description")}
              </p>
            </div>

            <div className={styles["about__images"]}>
              <img
                className={clsx(
                  styles["about__image"],
                  styles["about__image_1"],
                )}
                src={IMAGE_1}
                alt={t("AboutSection.images.image1Alt")}
              />
              <img
                className={clsx(
                  styles["about__image"],
                  styles["about__image_2"],
                )}
                src={IMAGE_2}
                alt={t("AboutSection.images.image2Alt")}
              />
              <img
                className={clsx(
                  styles["about__image"],
                  styles["about__image_3"],
                )}
                src={IMAGE_3}
                alt={t("AboutSection.images.image3Alt")}
              />
            </div>
          </div>
        </SectionFilled>
      </Section>
    </Container>
  );
}

export default AboutSection;
