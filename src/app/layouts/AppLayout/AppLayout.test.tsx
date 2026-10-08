import { render, screen } from "@/test-utils/test-utils";
import AppLayout from "./AppLayout";

vi.mock("@/widgets/header", () => ({
  Header: () => <header>Header</header>,
}));

vi.mock("@/widgets/footer", () => ({
  Footer: () => <footer>Footer</footer>,
}));

describe("AppLayout", () => {
  it("renders without breaking", () => {
    render(<AppLayout />);
  });

  it("renders Header", () => {
    render(<AppLayout />);

    expect(screen.getByText("Header")).toBeInTheDocument();
  });

  it("renders Footer", () => {
    render(<AppLayout />);

    expect(screen.getByText("Footer")).toBeInTheDocument();
  });
});
