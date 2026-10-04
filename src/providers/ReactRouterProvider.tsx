import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import AppLayout from "@/components/layouts/AppLayout/AppLayout";
import HomePage from "@/pages/HomePage/HomePage";
import GalleryPage from "@/pages/GalleryPage/GalleryPage";
import PricesPage from "@/pages/PricesPage/PricesPage";
import AboutPage from "@/pages/AboutPage/AboutPage";
import ContactsPage from "@/pages/ContactsPage/ContactsPage";
import NoFooterLayout from "@/components/layouts/NoFooterLayout/NoFooterLayout";
import NotFoundPage from "@/pages/NotFoundPage/NotFoundPage";

const router = createBrowserRouter([
  {
    Component: AppLayout,
    children: [
      {
        path: "/",
        Component: HomePage,
      },
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
]);

function ReactRouterProvider() {
  return <RouterProvider router={router} />;
}

export default ReactRouterProvider;
