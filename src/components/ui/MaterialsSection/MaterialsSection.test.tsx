import { render, screen } from "@/test-utils/test-utils";
import MaterialsSection from "./MaterialsSection";

vi.mock("./MaterialCard/MaterialCard", () => ({
  default: () => <div>Card</div>,
}));

describe("MaterialsSection", () => {
  it("renders without breaking", () => {
    render(<MaterialsSection />);
  });

  it("renders cards list", () => {
    render(<MaterialsSection />);

    const list = screen.getByRole("list");
    const items = screen.getAllByRole("listitem");

    expect(list).toBeInTheDocument();
    expect(items.length).toBeGreaterThan(0);
  });
});
