import { Outlet } from "react-router";
import Header from "@/components/ui/Header/Header";

import styles from "./AppLayout.module.scss";

function AppLayout() {
  return (
    <div className={styles["app-layout"]}>
      <Header />
      <Outlet />
      <footer>Footer</footer>
    </div>
  );
}

export default AppLayout;
