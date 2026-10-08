import { lazy } from "react";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";

const ScrollRestorationLayout = lazy(
  () => import("../layouts/ScrollRestorationLayout"),
);
const AppLayout = lazy(() => import("../layouts/AppLayout"));
const FilledHeaderAppLayout = lazy(
  () => import("../layouts/FilledHeaderAppLayout"),
);
const NoFooterLayout = lazy(() => import("../layouts/NoFooterLayout"));

const HomePage = lazy(() => import("@/pages/home"));
const GalleryPage = lazy(() => import("@/pages/gallery"));
const PricesPage = lazy(() => import("@/pages/prices"));
const AboutPage = lazy(() => import("@/pages/about"));
const ContactsPage = lazy(() => import("@/pages/contacts"));
const NotFoundPage = lazy(() => import("@/pages/not-found"));

const router = createBrowserRouter([
  {
    Component: ScrollRestorationLayout,
    children: [
      {
        Component: AppLayout,
        children: [
          {
            path: "/",
            Component: HomePage,
          },
        ],
      },
      {
        Component: FilledHeaderAppLayout,
        children: [
          {
            path: "/gallery",
            Component: GalleryPage,
          },
          {
            path: "/prices",
            Component: PricesPage,
          },
          {
            path: "/about",
            Component: AboutPage,
          },
          {
            path: "/contacts",
            Component: ContactsPage,
          },
        ],
      },
      {
        Component: NoFooterLayout,
        children: [
          {
            path: "*",
            Component: NotFoundPage,
          },
        ],
      },
    ],
  },
]);

function ReactRouterProvider() {
  return <RouterProvider router={router} />;
}

export default ReactRouterProvider;
