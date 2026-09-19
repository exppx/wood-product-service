import { useTranslation } from "react-i18next";
import useTheme from "@/hooks/useTheme/useTheme";
import IconButton from "@/components/ui/IconButton/IconButton";
import BulbOffSvg from "@/components/svg/BulbOffSvg";
import BulbOnSvg from "@/components/svg/BulbOnSvg";

import styles from "./ToggleThemeButton.module.scss";

function ToggleThemeButton() {
  const { t } = useTranslation();
  const [currentTheme, toggleTheme] = useTheme();

  const title = t("ToggleThemeButton.label", {
    theme:
      currentTheme === "dark"
        ? t("ToggleThemeButton.light")
        : t("ToggleThemeButton.dark"),
  });

  return (
    <IconButton
      title={title}
      aria-label={title}
      className={styles["toggle-theme-button"]}
      onClick={toggleTheme}
      Icon={
        currentTheme === "dark" ? (
          <BulbOffSvg className={styles["toggle-theme-button__icon"]} />
        ) : (
          <BulbOnSvg className={styles["toggle-theme-button__icon"]} />
        )
      }
    />
  );
}

export default ToggleThemeButton;
