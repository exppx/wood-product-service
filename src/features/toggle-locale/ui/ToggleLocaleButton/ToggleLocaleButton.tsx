import { useTranslation } from "react-i18next";
import { IconButton } from "@/shared/ui";
import { useLocale } from "../../model";

import styles from "./ToggleLocaleButton.module.scss";

function ToggleLocaleButton() {
  const { t } = useTranslation();
  const [, toggleLocale, nextLocale] = useLocale();

  const title = t("ToggleLocaleButton.label", { locale: nextLocale });

  return (
    <IconButton
      title={title}
      aria-label={title}
      onClick={toggleLocale}
      Icon={<span className={styles["locale"]}>{nextLocale}</span>}
    />
  );
}

export default ToggleLocaleButton;
