import { useTranslation } from "react-i18next";
import clsx from "clsx";
import { QUESTIONS_FORM_ID } from "@/components/ui/QuestionsSection/QuestionsForm/QuestionsForm.config";
import {
  HERO_IMAGE_1_URL,
  HERO_IMAGE_2_URL,
  HERO_IMAGE_3_URL,
  HERO_IMAGE_URL,
} from "./Hero.config";
import Container from "@/components/ui/Container/Container";
import Section from "@/components/ui/Section/Section";
import SectionFilled from "@/components/ui/SectionFilled/SectionFilled";
import LinkButton from "@/components/ui/LinkButton/LinkButton";

import styles from "./Hero.module.scss";

function Hero() {
  const { t } = useTranslation();

  return (
    <Container width="xl" className={styles["hero-container"]}>
      <img
        src={HERO_IMAGE_URL}
        alt={t("Hero.imageAlt")}
        className={styles["hero-image"]}
      />

      <Section className={styles["hero__section"]}>
        <SectionFilled
          position="right"
          className={styles["hero__section-filled"]}
        >
          <div className={styles["hero__left"]}>
            <h1>{t("Hero.title")}</h1>
            <p className={styles["hero__price"]}>
              {t("Hero.price.left")}
              <b>{t("Hero.price.price")}</b>
              {t("Hero.price.right")}
            </p>
            <LinkButton
              isHash
              to={`#${QUESTIONS_FORM_ID}`}
              className={styles["hero__button"]}
            >
              {t("Hero.cta")}
            </LinkButton>
          </div>

          <div className={styles["hero__divider"]} />

          <div className={styles["hero__right"]}>
            <img
              src={HERO_IMAGE_1_URL}
              alt={t("Hero.image1Alt")}
              className={clsx([
                styles["hero__image-aside"],
                styles["hero__image-aside_1"],
              ])}
            />
            <img
              src={HERO_IMAGE_2_URL}
              alt={t("Hero.image2Alt")}
              className={clsx([
                styles["hero__image-aside"],
                styles["hero__image-aside_2"],
              ])}
            />
            <img
              src={HERO_IMAGE_3_URL}
              alt={t("Hero.image3Alt")}
              className={clsx([
                styles["hero__image-aside"],
                styles["hero__image-aside_3"],
              ])}
            />
          </div>
        </SectionFilled>
      </Section>
    </Container>
  );
}

export default Hero;
