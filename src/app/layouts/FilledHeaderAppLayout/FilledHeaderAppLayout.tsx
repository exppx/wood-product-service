import { Outlet } from "react-router";
import { Header } from "@/widgets/header";
import { Footer } from "@/widgets/footer";

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
