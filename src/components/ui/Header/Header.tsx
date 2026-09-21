import { useEffect, useState } from "react";
import clsx from "clsx";
import Container from "../Container/Container";
import Logo from "@/components/ui/Logo/Logo";
import SideMenu from "./SideMenu/SideMenu";

import styles from "./Header.module.scss";

function Header() {
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
          [styles["header_filled"]]: isScrolled,
        },
      ])}
    >
      <Container width="xl" className={styles["header__container"]}>
        <Logo color={isScrolled ? "adaptive" : "light"} />
        <SideMenu />
      </Container>
    </header>
  );
}

export default Header;
