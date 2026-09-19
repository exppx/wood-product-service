import { render } from "@testing-library/react";
import App from "./App";

vi.mock("@/providers/ReactRouterProvider", () => ({
  default: () => <div>Router provider</div>,
}));

describe("App", () =>
  it("renders without breaking", () => {
    render(<App />);
  }));
