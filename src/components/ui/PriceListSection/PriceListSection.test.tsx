import { render, screen } from "@/test-utils/test-utils";
import PriceListSection from "./PriceListSection";

vi.mock("./PriceListFilters/PriceListFilters", () => ({
  default: () => <div data-testid="filters">Filters</div>,
}));

vi.mock("./PriceListTable/PriceListTable", () => ({
  default: () => <div data-testid="table">Table</div>,
}));

describe("PriceListSection", () => {
  it("renders", () => {
    render(<PriceListSection />);

    const filters = screen.getByTestId("filters");
    const table = screen.getByTestId("table");

    expect(filters).toBeInTheDocument();
    expect(table).toBeInTheDocument();
  });
});
