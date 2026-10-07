import { render, screen } from "@/test-utils/test-utils";
import FilledHeaderAppLayout from "./FilledHeaderAppLayout";

vi.mock("@/components/ui/Header/Header", () => ({
  default: ({ isFilled }: { isFilled: boolean }) => (
    <header data-isFilled={isFilled}>Header</header>
  ),
}));

vi.mock("@/components/ui/Footer/Footer", () => ({
  default: () => <header>Footer</header>,
}));

describe("FilledHeaderAppLayout", () => {
  it("renders without breaking", () => {
    render(<FilledHeaderAppLayout />);
  });

  it("renders Header", () => {
    render(<FilledHeaderAppLayout />);

    expect(screen.getByText("Header")).toBeInTheDocument();
  });

  it("renders filled Header", () => {
    render(<FilledHeaderAppLayout />);

    expect(screen.getByText("Header")).toHaveAttribute("data-isFilled", "true");
  });

  it("renders Footer", () => {
    render(<FilledHeaderAppLayout />);

    expect(screen.getByText("Footer")).toBeInTheDocument();
  });
});
