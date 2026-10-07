import { Outlet } from "react-router";
import Header from "@/components/ui/Header/Header";
import Footer from "@/components/ui/Footer/Footer";

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
