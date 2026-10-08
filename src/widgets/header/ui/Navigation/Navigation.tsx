import { NavLink } from "react-router";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import { NAVIGATION_LINKS } from "../../model";

import s from "./Navigation.module.scss";

interface NavigationProps {
  onClose: VoidFunction;
}

function Navigation({ onClose }: NavigationProps) {
  const { t } = useTranslation();

  return (
    <nav className={s["navigation"]}>
      <ul className={s["navigation__links"]}>
        {NAVIGATION_LINKS.map((item) => (
          <li key={item.url} className={s["navigation__link-container"]}>
            <NavLink
              to={item.url}
              prefetch="intent"
              preventScrollReset={false}
              onClick={onClose}
              className={({ isActive }) =>
                clsx(s["navigation__link"], {
                  [s["navigation__link_active"]]: isActive,
                })
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
