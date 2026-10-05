import { Outlet } from "react-router";
import Header from "@/components/ui/Header/Header";
import Footer from "@/components/ui/Footer/Footer";

import styles from "./FilledHeaderAppLayout.module.scss";

function FilledHeaderAppLayout() {
  return (
    <div className={styles["filled-header-app-layout"]}>
      <Header isFilled={true} />
      <Outlet />
      <Footer />
    </div>
  );
}

export default FilledHeaderAppLayout;
