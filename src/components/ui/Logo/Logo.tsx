import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import LogoSvg from "@/components/svg/LogoSvg";

import styles from "./Logo.module.scss";

interface LogoProps {
  color: "light" | "adaptive";
}

function Logo({ color }: LogoProps) {
  const { t } = useTranslation();

  return (
    <div
      className={clsx([
        styles["logo-container"],
        {
          [styles["logo-container_light"]]: color === "light",
          [styles["logo-container_adaptive"]]: color === "adaptive",
        },
      ])}
    >
      <Link to="/" aria-label={t("Logo.label")} className={styles["logo-link"]}>
        <LogoSvg />
      </Link>
    </div>
  );
}

export default Logo;
