import { NavLink } from "react-router";
import { NAVIGATION_LINKS } from "./Navigation.config";
import { useTranslation } from "react-i18next";
import clsx from "clsx";

import styles from "./Navigation.module.scss";

interface NavigationProps {
  onClose: VoidFunction;
}

function Navigation({ onClose }: NavigationProps) {
  const { t } = useTranslation();

  return (
    <nav className={styles["navigation"]}>
      <ul className={styles["navigation__links"]}>
        {NAVIGATION_LINKS.map((item) => (
          <li key={item.url} className={styles["navigation__link-container"]}>
            <NavLink
              to={item.url}
              prefetch="intent"
              preventScrollReset={false}
              onClick={onClose}
              className={({ isActive }) =>
                clsx([
                  styles["navigation__link"],
                  {
                    [styles["navigation__link_active"]]: isActive,
                  },
                ])
              }
            >
              {t(item.name)}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navigation;
