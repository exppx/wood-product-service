import type { ParseKeys } from "i18next";

interface NavigationLinkData {
  name: ParseKeys<"translation">;
  url: string;
}

const NAVIGATION_LINKS = [
  {
    name: "Navigation.gallery",
    url: "/gallery",
  },
  {
    name: "Navigation.prices",
    url: "/prices",
  },
  {
    name: "Navigation.about",
    url: "/about",
  },
  {
    name: "Navigation.contacts",
    url: "/contacts",
  },
] as const satisfies NavigationLinkData[];

export { NAVIGATION_LINKS };
