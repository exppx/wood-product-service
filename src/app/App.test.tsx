import { render, screen } from "@/test-utils/test-utils";
import App from "./App";

vi.mock("./providers/ReactRouterProvider", () => ({
  default: () => <div data-testid="router-provider">Router provider</div>,
}));

describe("App", () => {
  it("renders without breaking", () => {
    render(<App />);
  });

  it("renders router provider", () => {
    render(<App />);

    expect(screen.getByTestId("router-provider")).toBeInTheDocument();
  });
});
