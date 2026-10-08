import { Outlet, ScrollRestoration } from "react-router";

function ScrollRestorationLayout() {
  return (
    <>
      <Outlet />
      <ScrollRestoration />
    </>
  );
}

export default ScrollRestorationLayout;
