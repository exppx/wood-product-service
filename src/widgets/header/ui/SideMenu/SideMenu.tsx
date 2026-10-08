import { useState } from "react";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import { useMedia } from "@/shared/lib/hooks";
import { ToggleThemeButton } from "@/features/toggle-theme";
import { ToggleLocaleButton } from "@/features/toggle-locale";
import { Navigation } from "../Navigation";
import { BurgerButton } from "../BurgerButton";
import { CloseSideMenuButton } from "../CloseSideMenuButton";
import { SIDE_MENU_ID } from "../../model";

import styles from "./SideMenu.module.scss";

function SideMenu() {
  const { t } = useTranslation();
  const [showSideMenu, setShowSideMenu] = useState(false);
  const { isDesktop } = useMedia();

  function closeSideMenu() {
    setShowSideMenu(false);
  }

  function openSideMenu() {
    setShowSideMenu(true);
  }

  return (
    <div className={styles["side-menu"]}>
      <BurgerButton
        title={t("SideMenu.burgerButtonLabel")}
        aria-label={t("SideMenu.burgerButtonLabel")}
        aria-controls={SIDE_MENU_ID}
        aria-expanded={showSideMenu ? "true" : "false"}
        onClick={openSideMenu}
        className={styles["side-menu__burger-button"]}
      />

      <div
        inert={!isDesktop && !showSideMenu}
        id={SIDE_MENU_ID}
        data-testid={SIDE_MENU_ID}
        className={clsx([
          styles["side-menu__panel"],
          {
            [styles["side-menu__panel_active"]]: showSideMenu,
          },
        ])}
      >
        <CloseSideMenuButton
          title={t("SideMenu.closeButtonLabel")}
          aria-label={t("SideMenu.closeButtonLabel")}
          aria-controls={SIDE_MENU_ID}
          aria-expanded={showSideMenu ? "true" : "false"}
          onClick={closeSideMenu}
          className={styles["side-menu__close-button"]}
        />
        <div className={styles["side-menu__tools"]}>
          <Navigation onClose={closeSideMenu} />
          <div className={styles["side-menu__options"]}>
            <ToggleThemeButton />
            <ToggleLocaleButton />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideMenu;
