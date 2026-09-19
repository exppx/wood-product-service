import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string, options: Record<string, string> | undefined) => {
      const optionsString = options ? Object.values(options).join(" ") : "";
      return key + optionsString;
    },
    i18n: {
      changeLanguage: () => Promise.resolve(),
    },
  }),
  initReactI18next: {
    type: "3rdParty",
    init: () => {},
  },
}));
