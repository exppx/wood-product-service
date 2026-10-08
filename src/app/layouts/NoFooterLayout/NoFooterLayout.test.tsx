import { render, screen } from "@/test-utils/test-utils";
import NoFooterLayout from "./NoFooterLayout";

vi.mock("@/widgets/header", () => ({
  Header: () => <header>Header</header>,
}));

describe("NoFooterLayout", () => {
  it("renders without breaking", () => {
    render(<NoFooterLayout />);
  });

  it("renders Header", () => {
    render(<NoFooterLayout />);

    expect(screen.getByText("Header")).toBeInTheDocument();
  });
});
