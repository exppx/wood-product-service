import { render, screen } from "@/test-utils/test-utils";
import AppLayout from "./AppLayout";

vi.mock("@/components/ui/Header/Header", () => ({
  default: () => <header>Header</header>,
}));

describe("AppLayout", () => {
  it("renders without breaking", () => {
    render(<AppLayout />);
  });

  it("renders Header", () => {
    render(<AppLayout />);

    expect(screen.getByText("Header")).toBeInTheDocument();
  });
});
