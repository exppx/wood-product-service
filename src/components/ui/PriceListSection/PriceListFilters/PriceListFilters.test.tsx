import { render, screen, within } from "@/test-utils/test-utils";
import SearchParamsDisplay from "@/test-utils/SearchParamsDisplay";
import userEvent from "@testing-library/user-event";
import usePriceFilters from "@/hooks/usePriceFilters/usePriceFilters";
import usePriceFilterOptions from "@/hooks/usePriceFilterOptions/usePriceFilterOptions";
import { useSortParams } from "@/shared/lib/hooks";
import { SORT_BUTTONS_OPTIONS } from "./PriceListFilters.config";
import PriceListFilters from "./PriceListFilters";

vi.mock("./PriceListFilters.config", () => ({
  FILTER_NAMES: { wood: "wood" },
  SIZE_FILTER_SELECTS_OPTIONS: [
    {
      label: "PriceListFilters.filterLabels.thickness",
      searchKey: "thickness",
      name: "thickness",
    },
    {
      label: "PriceListFilters.filterLabels.width",
      searchKey: "width",
      name: "width",
    },
  ],
  SORT_BUTTONS_OPTIONS: [
    {
      visibleLabel: "Sort.priceVisible",
      readableLabel: "Sort.priceReadable",
      sortByValue: "price",
    },
  ],
}));

vi.mock("@/hooks/usePriceFilters/usePriceFilters", () => ({
  default: vi.fn(),
}));
vi.mock("@/hooks/usePriceFilterOptions/usePriceFilterOptions", () => ({
  default: vi.fn(),
}));
vi.mock("@/shared/lib/hooks", () => ({ useSortParams: vi.fn() }));

vi.mock("@/shared/ui", () => ({
  Button: ({
    children,
    onClick,
  }: {
    children: React.ReactNode;
    onClick?: () => void;
  }) => (
    <button type="button" onClick={onClick}>
      {children}
    </button>
  ),
  FilterSelect: ({
    label,
    searchKey,
    name,
    options,
    disabled,
  }: {
    label: string;
    searchKey: string;
    name: string;
    options: { label: string; value: string | number }[];
    disabled?: boolean;
  }) => (
    <select
      aria-label={label}
      name={name}
      data-search-key={searchKey}
      disabled={disabled}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  ),
  SortButtonsGroup: ({ options }: { options: unknown[] }) => (
    <div
      data-testid="sort-buttons-group"
      data-options={JSON.stringify(options)}
    />
  ),
}));

const priceFilters = { wood: "oak", thickness: "20", width: "" };

const filterOptions = {
  wood: [
    { label: "Oak", value: "oak" },
    { label: "Pine", value: "pine" },
  ],
  thickness: [{ label: "20 mm", value: "20" }],
  width: [
    { label: "100 mm", value: "100" },
    { label: "150 mm", value: "150" },
  ],
};

const clearPriceFilterParams = vi.fn((params: URLSearchParams) => {
  ["wood", "thickness", "width"].forEach((key) => params.delete(key));
});
const clearSortParams = vi.fn((params: URLSearchParams) => {
  ["sortBy", "sortDirection"].forEach((key) => params.delete(key));
});

interface OptionsState {
  isLoading: boolean;
  error: string | null;
}

function mockHooks({
  isLoading = false,
  error = null,
}: Partial<OptionsState> = {}) {
  vi.mocked(usePriceFilters).mockReturnValue({
    priceFilters,
    clearPriceFilterParams,
  } as unknown as ReturnType<typeof usePriceFilters>);

  vi.mocked(usePriceFilterOptions).mockReturnValue({
    filterOptions,
    isLoading,
    error,
  } as unknown as ReturnType<typeof usePriceFilterOptions>);

  vi.mocked(useSortParams).mockReturnValue({
    clearSortParams,
  } as unknown as ReturnType<typeof useSortParams>);
}

function renderComponent(initialEntry = "/") {
  return render(
    <>
      <PriceListFilters />
      <SearchParamsDisplay />
    </>,
    { route: initialEntry },
  );
}

function getSelectOptions(name: string) {
  const select = screen.getByRole("combobox", { name });
  return within(select)
    .getAllByRole("option")
    .map((option) => ({
      label: option.textContent?.trim(),
      value: (option as HTMLOptionElement).value,
    }));
}

describe("PriceListFilters", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockHooks();
  });

  describe("data and hooks", () => {
    it("passes priceFilters into usePriceFilterOptions", () => {
      renderComponent();

      expect(usePriceFilterOptions).toHaveBeenCalledWith(priceFilters);
    });
  });

  describe("filters", () => {
    it("renders wood select and size selects in proper order", () => {
      renderComponent();

      const selects = screen.getAllByRole("combobox");

      expect(selects).toHaveLength(3);
      expect(selects.map((select) => select.getAttribute("name"))).toEqual([
        "wood",
        "thickness",
        "width",
      ]);
      expect(
        selects.map((select) => select.getAttribute("data-search-key")),
      ).toEqual(["wood", "thickness", "width"]);
    });

    it("labels selects with translated labels", () => {
      renderComponent();

      expect(
        screen.getByRole("combobox", {
          name: "PriceListFilters.filterLabels.wood",
        }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("combobox", {
          name: "PriceListFilters.filterLabels.thickness",
        }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("combobox", {
          name: "PriceListFilters.filterLabels.width",
        }),
      ).toBeInTheDocument();
    });

    it("adds option 'all' first, and then options from filterOptions", () => {
      renderComponent();

      expect(getSelectOptions("PriceListFilters.filterLabels.wood")).toEqual([
        { label: "PriceListFilters.all", value: "" },
        { label: "Oak", value: "oak" },
        { label: "Pine", value: "pine" },
      ]);
      expect(
        getSelectOptions("PriceListFilters.filterLabels.thickness"),
      ).toEqual([
        { label: "PriceListFilters.all", value: "" },
        { label: "20 mm", value: "20" },
      ]);
      expect(getSelectOptions("PriceListFilters.filterLabels.width")).toEqual([
        { label: "PriceListFilters.all", value: "" },
        { label: "100 mm", value: "100" },
        { label: "150 mm", value: "150" },
      ]);
    });

    it("does not disable selects, when options are loaded", () => {
      renderComponent();

      screen.getAllByRole("combobox").forEach((select) => {
        expect(select).toBeEnabled();
      });
    });

    it("disables all selects during options loading", () => {
      mockHooks({ isLoading: true });

      renderComponent();

      const selects = screen.getAllByRole("combobox");

      expect(selects).toHaveLength(3);
      selects.forEach((select) => {
        expect(select).toBeDisabled();
      });
    });
  });

  describe("sorting", () => {
    it("renders SortButtonsGroup with SORT_BUTTONS_OPTIONS", () => {
      renderComponent();

      const group = screen.getByTestId("sort-buttons-group");

      expect(group).toHaveAttribute(
        "data-options",
        JSON.stringify(SORT_BUTTONS_OPTIONS),
      );
    });
  });

  describe("error", () => {
    it("shows error text instead of filters", () => {
      mockHooks({ error: "Failed to load filters" });

      renderComponent();

      expect(screen.getByText("Failed to load filters")).toBeInTheDocument();
      expect(screen.queryAllByRole("combobox")).toHaveLength(0);
      expect(
        screen.queryByTestId("sort-buttons-group"),
      ).not.toBeInTheDocument();
      expect(screen.queryByRole("button")).not.toBeInTheDocument();
    });
  });

  describe("filters reset and sorting", () => {
    it("renders reset button", () => {
      renderComponent();

      expect(
        screen.getByRole("button", { name: "PriceListFilters.reset" }),
      ).toBeInTheDocument();
    });

    it("calls both reset functions with the same instance of URLSearchParams", async () => {
      const user = userEvent.setup();
      renderComponent("/?wood=oak&sortBy=price");

      await user.click(
        screen.getByRole("button", { name: "PriceListFilters.reset" }),
      );

      expect(clearPriceFilterParams).toHaveBeenCalledTimes(1);
      expect(clearSortParams).toHaveBeenCalledTimes(1);

      const filterParams = clearPriceFilterParams.mock.calls[0][0];
      const sortParams = clearSortParams.mock.calls[0][0];

      expect(filterParams).toBeInstanceOf(URLSearchParams);
      expect(filterParams).toBe(sortParams);
    });

    it("clears filters and sorting params from URL", async () => {
      const user = userEvent.setup();
      renderComponent("/?wood=oak&thickness=20&sortBy=price&sortDirection=asc");

      await user.click(
        screen.getByRole("button", { name: "PriceListFilters.reset" }),
      );

      expect(screen.getByTestId("search-params")).toHaveTextContent("");
      expect(screen.getByTestId("search-params").textContent).toBe("");
    });

    it("preserves other search params in URL after reset", async () => {
      const user = userEvent.setup();
      renderComponent(
        "/?page=3&wood=oak&thickness=20&sortBy=price&sortDirection=desc",
      );

      await user.click(
        screen.getByRole("button", { name: "PriceListFilters.reset" }),
      );

      expect(screen.getByTestId("search-params").textContent).toBe("page=3");
    });

    it("does not call reset function before click", () => {
      renderComponent("/?wood=oak");

      expect(clearPriceFilterParams).not.toHaveBeenCalled();
      expect(clearSortParams).not.toHaveBeenCalled();
    });
  });
});
