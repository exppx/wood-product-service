import { useTranslation } from "react-i18next";
import { IconButton } from "@/shared/ui";
import { BulbOnSvg, BulbOffSvg } from "@/shared/ui/icons";
import { useTheme } from "../../model";

import s from "./ToggleThemeButton.module.scss";

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
      className={s["toggle-theme-button"]}
      onClick={toggleTheme}
      Icon={
        currentTheme === "dark" ? (
          <BulbOffSvg className={s["toggle-theme-button__icon"]} />
        ) : (
          <BulbOnSvg className={s["toggle-theme-button__icon"]} />
        )
      }
    />
  );
}

export default ToggleThemeButton;
