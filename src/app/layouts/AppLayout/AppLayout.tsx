import { Outlet } from "react-router";
import { Header } from "@/widgets/header";
import { Footer } from "@/widgets/footer";

import styles from "./AppLayout.module.scss";

function AppLayout() {
  return (
    <div className={styles["app-layout"]}>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default AppLayout;
