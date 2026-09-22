import { useState } from "react";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import IconButton from "@/components/ui/IconButton/IconButton";
import ArrowToLeftSvg from "@/components/svg/ArrowToLeftSvg";
import ArrowToRightSvg from "@/components/svg/ArrowToRightSvg";

import styles from "./Carousel.module.scss";

export interface CarouselProps {
  images: { imageUrl: string; alt: string }[];
}

function Carousel({ images }: CarouselProps) {
  const { t } = useTranslation();
  const [position, setPosition] = useState(0);

  if (images.length === 0) {
    return null;
  }

  const currentImage = images[position];
  const isLastPosition = position === images.length - 1;
  const isFirstPosition = position === 0;

  function next() {
    if (isLastPosition) return;

    setPosition((p) => p + 1);
  }

  function prev() {
    if (isFirstPosition) return;

    setPosition((p) => p - 1);
  }

  return (
    <div
      role="region"
      aria-label={t("Carousel.label")}
      className={styles["carousel"]}
    >
      <div className={styles["carousel__main"]}>
        <div
          className={clsx([
            styles["carousel__button-container"],
            {
              [styles["carousel__button-container_disabled"]]: isFirstPosition,
            },
          ])}
          onClick={prev}
          data-testid="prev-button-container"
        >
          <IconButton
            aria-label={t("Carousel.buttonLeftLabel")}
            className={clsx([
              styles["carousel__button"],
              styles["carousel__button_left"],
            ])}
            Icon={<ArrowToLeftSvg />}
            disabled={isFirstPosition}
          />
        </div>

        <div
          role="group"
          aria-label={t("Carousel.progress", {
            current: position + 1,
            total: images.length,
          })}
          className={styles["carousel__image-container"]}
        >
          <img
            className={styles["carousel__image"]}
            src={currentImage.imageUrl}
            alt={currentImage.alt}
          />
        </div>

        <div
          className={clsx([
            styles["carousel__button-container"],
            {
              [styles["carousel__button-container_disabled"]]: isLastPosition,
            },
          ])}
          onClick={next}
          data-testid="next-button-container"
        >
          <IconButton
            aria-label={t("Carousel.buttonRightLabel")}
            className={clsx([
              styles["carousel__button"],
              styles["carousel__button_right"],
            ])}
            Icon={<ArrowToRightSvg />}
            disabled={isLastPosition}
          />
        </div>
      </div>

      <div className={styles["carousel__progress"]} aria-hidden="true">
        {Array.from({ length: images.length }).map((_, index) => (
          <div
            key={index}
            className={clsx([
              styles["carousel__progress-item"],
              {
                [styles["carousel__progress-item_active"]]: index === position,
              },
            ])}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default Carousel;
