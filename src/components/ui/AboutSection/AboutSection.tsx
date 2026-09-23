import { useTranslation } from "react-i18next";
import Container from "@/components/ui/Container/Container";
import Section from "@/components/ui/Section/Section";
import SectionFilled from "@/components/ui/SectionFilled/SectionFilled";

import image_1 from "@/assets/images/about_1.webp";
import image_2 from "@/assets/images/about_2.webp";
import image_3 from "@/assets/images/about_3.webp";
import styles from "./AboutSection.module.scss";
import clsx from "clsx";

function AboutSection() {
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
              <h2 className={styles["about__title"]}>
                {t("AboutSection.title")}
              </h2>
              <p className={styles["about__text"]}>
                <b>{t("AboutSection.text.company")}</b>
                {t("AboutSection.text.description")}
              </p>
            </div>

            <div className={styles["about__images"]}>
              <img
                className={clsx([
                  styles["about__image"],
                  styles["about__image_1"],
                ])}
                src={image_1}
                alt={t("AboutSection.images.image1Alt")}
              />
              <img
                className={clsx([
                  styles["about__image"],
                  styles["about__image_2"],
                ])}
                src={image_2}
                alt={t("AboutSection.images.image2Alt")}
              />
              <img
                className={clsx([
                  styles["about__image"],
                  styles["about__image_3"],
                ])}
                src={image_3}
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
