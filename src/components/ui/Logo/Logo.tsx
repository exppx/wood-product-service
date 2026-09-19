import { useTranslation } from "react-i18next";
import LogoSvg from "@/components/svg/LogoSvg";
import { Link } from "react-router";

import styles from "./Logo.module.scss";

function Logo() {
  const { t } = useTranslation();

  return (
    <div className={styles["logo-container"]}>
      <Link to="/" aria-label={t("Logo.label")} className={styles["logo-link"]}>
        <LogoSvg />
      </Link>
    </div>
  );
}

export default Logo;
