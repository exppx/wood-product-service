import Header from "@/components/ui/Header/Header";
import styles from "./NoFooterLayout.module.scss";
import { Outlet } from "react-router";

function NoFooterLayout() {
  return (
    <div className={styles["no-footer-layout"]}>
      <Header />
      <Outlet />
    </div>
  );
}

export default NoFooterLayout;
