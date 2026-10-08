import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import { LogoSvg } from "@/shared/ui/icons";

import s from "./Logo.module.scss";

interface LogoProps {
  color: "light" | "adaptive";
}

function Logo({ color }: LogoProps) {
  const { t } = useTranslation();

  return (
    <div
      className={clsx(s["logo-container"], {
        [s["logo-container_light"]]: color === "light",
        [s["logo-container_adaptive"]]: color === "adaptive",
      })}
    >
      <Link to="/" aria-label={t("Logo.label")} className={s["logo-link"]}>
        <LogoSvg />
      </Link>
    </div>
  );
}

export default Logo;
