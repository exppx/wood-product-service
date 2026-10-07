import { useEffect, useState } from "react";
import clsx from "clsx";
import { Container, Logo } from "@/shared/ui";
import SideMenu from "./SideMenu/SideMenu";

import styles from "./Header.module.scss";

interface HeaderProps {
  isFilled?: boolean;
}

function Header({ isFilled = false }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setIsScrolled(window.scrollY > 0);
    }

    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <header
      data-testid="header"
      className={clsx([
        styles["header"],
        {
          [styles["header_filled"]]: isFilled || isScrolled,
        },
      ])}
    >
      <Container width="xl" className={styles["header__container"]}>
        <div className={styles["header__logo-container"]}>
          <Logo color={isScrolled ? "adaptive" : "light"} />
        </div>
        <SideMenu />
      </Container>
    </header>
  );
}

export default Header;
