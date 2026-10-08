import { render, screen } from "@/test-utils/test-utils";
import { useSortParams } from "@/shared/lib/hooks";
import { useMaterialPriceList } from "@/entities/material";
import { usePriceListFilters } from "@/features/price-list-filters";
import PriceListSection from "./PriceListSection";

const i18nState = vi.hoisted(() => ({ language: "en" }));

vi.mock("react-i18next", async (importOriginal) => {
  const actual = await importOriginal<typeof import("react-i18next")>();

  return {
    ...actual,
    useTranslation: () => ({
      t: (key: string) => key,
      i18n: { language: i18nState.language },
    }),
  };
});

vi.mock("@/shared/lib/hooks", () => ({
  useSortParams: vi.fn(),
}));

vi.mock("@/entities/material", () => ({
  useMaterialPriceList: vi.fn(),
}));

vi.mock("@/features/price-list-filters", () => ({
  PriceListFilters: () => <div data-testid="filters">Filters</div>,
  usePriceListFilters: vi.fn(),
}));

vi.mock("./ui", () => ({
  PriceListTable: ({
    data,
    isLoading,
    error,
  }: {
    data: unknown;
    isLoading: boolean;
    error: string | null;
  }) => (
    <div
      data-testid="table"
      data-loading={String(isLoading)}
      data-error={error ?? ""}
    >
      {JSON.stringify(data)}
    </div>
  ),
}));

type HookResult = ReturnType<typeof useMaterialPriceList>;

const priceListFilters = { wood: "oak" } as ReturnType<
  typeof usePriceListFilters
>["priceListFilters"];

const enData = { oak: [{ id: "1", wood: "Oak" }] };
const ruData = { oak: [{ id: "1", wood: "Дуб" }] };

function mockMaterialPriceList(overrides: Partial<HookResult> = {}) {
  vi.mocked(useMaterialPriceList).mockReturnValue({
    data: { en: enData, ru: ruData },
    isLoading: false,
    isError: false,
    ...overrides,
  } as HookResult);
}

describe("PriceListSection", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    i18nState.language = "en";

    vi.mocked(usePriceListFilters).mockReturnValue({
      priceListFilters,
    } as ReturnType<typeof usePriceListFilters>);
    vi.mocked(useSortParams).mockReturnValue({
      sortBy: "price",
      sortDirection: "asc",
    } as ReturnType<typeof useSortParams>);
    mockMaterialPriceList();
  });

  it("renders the title, filters and table", () => {
    render(<PriceListSection />);

    expect(screen.getByText("PriceListSection.title")).toBeInTheDocument();
    expect(screen.getByTestId("filters")).toBeInTheDocument();
    expect(screen.getByTestId("table")).toBeInTheDocument();
  });

  it("passes filters and sort params to useMaterialPriceList", () => {
    render(<PriceListSection />);

    expect(useMaterialPriceList).toHaveBeenCalledWith(priceListFilters, {
      sortBy: "price",
      sort: "asc",
    });
  });

  describe("data language", () => {
    it("passes English data to the table when the language is en", () => {
      render(<PriceListSection />);

      expect(screen.getByTestId("table")).toHaveTextContent(
        JSON.stringify(enData),
      );
    });

    it("passes Russian data to the table when the language is ru", () => {
      i18nState.language = "ru";

      render(<PriceListSection />);

      expect(screen.getByTestId("table")).toHaveTextContent(
        JSON.stringify(ruData),
      );
    });
  });

  describe("loading state", () => {
    it("passes isLoading=true to the table", () => {
      mockMaterialPriceList({ isLoading: true });

      render(<PriceListSection />);

      expect(screen.getByTestId("table")).toHaveAttribute(
        "data-loading",
        "true",
      );
    });

    it("passes isLoading=false to the table when loaded", () => {
      render(<PriceListSection />);

      expect(screen.getByTestId("table")).toHaveAttribute(
        "data-loading",
        "false",
      );
    });
  });

  describe("error state", () => {
    it("passes a translated error message to the table when the request fails", () => {
      mockMaterialPriceList({ isError: true });

      render(<PriceListSection />);

      expect(screen.getByTestId("table")).toHaveAttribute(
        "data-error",
        "PriceListSection.errors.table",
      );
    });

    it("passes no error to the table when the request succeeds", () => {
      render(<PriceListSection />);

      expect(screen.getByTestId("table")).toHaveAttribute("data-error", "");
    });
  });
});
