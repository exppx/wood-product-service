import { useTranslation } from "react-i18next";
import { HERO_IMAGE_URL } from "./NotFoundPage.config";
import Container from "@/shared/ui/Container/Container";
import FourOhFourSvg from "@/shared/ui/icons/FourOhFourSvg";
import LinkButton from "@/shared/ui/LinkButton/LinkButton";

import styles from "./NotFoundPage.module.scss";

function NotFoundPage() {
  const { t } = useTranslation();

  return (
    <div>
      <Container width="xl" className={styles["not-found-container"]}>
        <img
          src={HERO_IMAGE_URL}
          aria-hidden="true"
          className={styles["bg-image"]}
        />

        <h1 className={styles["not-found__heading"]}>
          {t("NotFoundPage.heading")}
        </h1>

        <Container width="md" className={styles["not-found__inner-container"]}>
          <div className={styles["not-found__404-container"]}>
            <FourOhFourSvg />
          </div>

          <div className={styles["not-found__info"]}>
            <div className={styles["not-found__text"]}>
              <p className={styles["not-found__title"]}>
                {t("NotFoundPage.title")}
              </p>

              <p className={styles["not-found__message"]}>
                {t("NotFoundPage.message")}
              </p>
            </div>

            <LinkButton to="/">{t("NotFoundPage.buttonText")}</LinkButton>
          </div>
        </Container>
      </Container>
    </div>
  );
}

export default NotFoundPage;
