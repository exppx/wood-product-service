import { Outlet } from "react-router";
import { Header } from "@/widgets/header";

import s from "./NoFooterLayout.module.scss";

function NoFooterLayout() {
  return (
    <div className={s["no-footer-layout"]}>
      <Header />
      <Outlet />
    </div>
  );
}

export default NoFooterLayout;
