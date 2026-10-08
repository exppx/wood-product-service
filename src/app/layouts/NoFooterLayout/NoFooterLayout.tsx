import { Outlet } from "react-router";
import { Header } from "@/widgets/header";

import styles from "./NoFooterLayout.module.scss";

function NoFooterLayout() {
  return (
    <div className={styles["no-footer-layout"]}>
      <Header />
      <Outlet />
    </div>
  );
}

export default NoFooterLayout;
