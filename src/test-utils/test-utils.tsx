import { render, type RenderOptions } from "@testing-library/react";
import type { PropsWithChildren, ReactElement } from "react";
import AllTheProviders from "./AllTheProviders";

interface CustomRenderOptions extends Omit<RenderOptions, "wrapper"> {
  route?: string;
}

const customRender = (
  ui: ReactElement,
  { route = "/", ...options }: CustomRenderOptions = {},
) => {
  function Wrapper({ children }: PropsWithChildren) {
    return <AllTheProviders route={route}>{children}</AllTheProviders>;
  }

  return render(ui, { wrapper: Wrapper, ...options });
};

// eslint-disable-next-line react-refresh/only-export-components
export * from "@testing-library/react";
export { customRender as render };
