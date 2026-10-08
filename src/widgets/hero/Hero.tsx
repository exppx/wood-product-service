import { useTranslation } from "react-i18next";
import clsx from "clsx";
import { Container, LinkButton, Section, SectionFilled } from "@/shared/ui";
import { QUESTIONS_FORM_ID } from "@/features/send-question";
import {
  HERO_IMAGE_1_URL,
  HERO_IMAGE_2_URL,
  HERO_IMAGE_3_URL,
  HERO_IMAGE_URL,
} from "./model";

import s from "./Hero.module.scss";

function Hero() {
  const { t } = useTranslation();

  return (
    <Container width="xl" className={s["hero-container"]}>
      <img
        src={HERO_IMAGE_URL}
        alt={t("Hero.imageAlt")}
        className={s["hero-image"]}
      />

      <Section className={s["hero__section"]}>
        <SectionFilled position="right" className={s["hero__section-filled"]}>
          <div className={s["hero__left"]}>
            <h1 className={s["hero__title"]}>{t("Hero.title")}</h1>
            <p className={s["hero__price"]}>
              {t("Hero.price.left")}
              <b>{t("Hero.price.price")}</b>
              {t("Hero.price.right")}
            </p>
            <LinkButton
              isHash
              to={`#${QUESTIONS_FORM_ID}`}
              className={s["hero__button"]}
            >
              {t("Hero.cta")}
            </LinkButton>
          </div>

          <div className={s["hero__divider"]} />

          <div className={s["hero__right"]}>
            <img
              src={HERO_IMAGE_1_URL}
              alt={t("Hero.image1Alt")}
              className={clsx(s["hero__image-aside"], s["hero__image-aside_1"])}
            />
            <img
              src={HERO_IMAGE_2_URL}
              alt={t("Hero.image2Alt")}
              className={clsx(s["hero__image-aside"], s["hero__image-aside_2"])}
            />
            <img
              src={HERO_IMAGE_3_URL}
              alt={t("Hero.image3Alt")}
              className={clsx(s["hero__image-aside"], s["hero__image-aside_3"])}
            />
          </div>
        </SectionFilled>
      </Section>
    </Container>
  );
}

export default Hero;
