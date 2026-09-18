import { Outlet } from "react-router";

import styles from "./AppLayout.module.scss";

function AppLayout() {
  return (
    <div className={styles["app-layout"]}>
      <header>Header</header>
      <Outlet />
      <footer>Footer</footer>
    </div>
  );
}

export default AppLayout;
