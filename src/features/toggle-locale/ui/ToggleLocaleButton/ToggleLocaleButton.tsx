import { useTranslation } from "react-i18next";
import { IconButton } from "@/shared/ui";
import { useLocale } from "../../model";

import s from "./ToggleLocaleButton.module.scss";

function ToggleLocaleButton() {
  const { t } = useTranslation();
  const [, toggleLocale, nextLocale] = useLocale();

  const title = t("ToggleLocaleButton.label", { locale: nextLocale });

  return (
    <IconButton
      title={title}
      aria-label={title}
      onClick={toggleLocale}
      Icon={<span className={s["locale"]}>{nextLocale}</span>}
    />
  );
}

export default ToggleLocaleButton;
