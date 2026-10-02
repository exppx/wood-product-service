import { render, screen } from "@/test-utils/test-utils";
import userEvent from "@testing-library/user-event";
import useSortParams from "@/hooks/useSortParams/useSortParams";
import type { TranslationKey } from "@/types/locales";
import SortButtonsGroup, { type SortButtonOptions } from "./SortButtonsGroup";

vi.mock("@/hooks/useSortParams/useSortParams", () => ({
  default: vi.fn(),
}));

vi.mock("@/components/ui/SortButton/SortButton", () => ({
  default: ({
    label,
    sortByValue,
    onClick,
    "aria-label": ariaLabel,
  }: {
    label: string;
    sortByValue: string;
    onClick?: () => void;
    "aria-label"?: string;
  }) => (
    <button
      type="button"
      aria-label={ariaLabel}
      data-sort-by={sortByValue}
      onClick={onClick}
    >
      {label}
    </button>
  ),
}));

const options: SortButtonOptions[] = [
  {
    visibleLabel: "Sort.nameVisible" as TranslationKey,
    readableLabel: "Sort.nameReadable" as TranslationKey,
    sortByValue: "name",
  },
  {
    visibleLabel: "Sort.dateVisible" as TranslationKey,
    readableLabel: "Sort.dateReadable" as TranslationKey,
    sortByValue: "date",
  },
];

type SortParamsMock = ReturnType<typeof useSortParams>;

function mockSortParams(sortBy: string, sortDirection: string) {
  vi.mocked(useSortParams).mockReturnValue({
    sortBy,
    sortDirection,
  } as SortParamsMock);
}

describe("SortButtonsGroup", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockSortParams("", "");
  });

  describe("layout", () => {
    it("displays title and links it with group using aria-labelledby", () => {
      render(<SortButtonsGroup options={options} />);

      const title = screen.getByText("SortButtonsGroup.sortBy");
      const group = screen.getByRole("group", {
        name: "SortButtonsGroup.sortBy",
      });

      expect(title).toBeInTheDocument();
      expect(group).toHaveAttribute("aria-labelledby", title.id);
    });

    it("renders button for every option with translated label и aria-label", () => {
      render(<SortButtonsGroup options={options} />);

      const buttons = screen.getAllByRole("button");

      expect(buttons).toHaveLength(options.length);

      options.forEach((option, index) => {
        expect(buttons[index]).toHaveTextContent(option.visibleLabel);
        expect(buttons[index]).toHaveAttribute(
          "aria-label",
          expect.stringContaining(option.readableLabel),
        );
        expect(buttons[index]).toHaveAttribute(
          "data-sort-by",
          option.sortByValue,
        );
      });
    });

    it("does not render buttons, if options is empty", () => {
      render(<SortButtonsGroup options={[]} />);

      expect(screen.queryAllByRole("button")).toHaveLength(0);
      expect(screen.getByRole("group")).toBeInTheDocument();
    });
  });

  describe("sort status", () => {
    it("shows 'Not sorted', if sortBy and sortDirection are empty", () => {
      render(<SortButtonsGroup options={options} />);

      expect(screen.getByRole("status")).toHaveTextContent(
        "SortButtonsGroup.notSorted",
      );
    });

    it("shows 'Not sorted', if sortBy is empty, but sort is not empty", () => {
      mockSortParams("", "asc");

      render(<SortButtonsGroup options={options} />);

      expect(screen.getByRole("status")).toHaveTextContent(
        "SortButtonsGroup.notSorted",
      );
    });

    it("shows 'Not sorted', if sort is empty, but sortBy is not empty", () => {
      mockSortParams("name", "");

      render(<SortButtonsGroup options={options} />);

      expect(screen.getByRole("status")).toHaveTextContent(
        "SortButtonsGroup.notSorted",
      );
    });

    it("on first render takes readableLabel of an option, matching with sortBy (asc)", () => {
      mockSortParams("date", "asc");

      render(<SortButtonsGroup options={options} />);

      expect(screen.getByRole("status")).toHaveTextContent(
        "SortButtonsGroup.sortStatus Sort.dateReadable SortButtonsGroup.asc",
      );
    });

    it("shows desc sort direction in status", () => {
      mockSortParams("name", "desc");

      render(<SortButtonsGroup options={options} />);

      expect(screen.getByRole("status")).toHaveTextContent(
        "SortButtonsGroup.sortStatus Sort.nameReadable SortButtonsGroup.desc",
      );
    });

    it("uses notSorted as status, if sortBy was not found in options", () => {
      mockSortParams("unknown", "asc");

      render(<SortButtonsGroup options={options} />);

      expect(screen.getByRole("status")).toHaveTextContent(
        "SortButtonsGroup.sortStatus SortButtonsGroup.notSorted SortButtonsGroup.asc",
      );
    });
  });

  describe("interaction", () => {
    it("updates sorting name in status after sort button click", async () => {
      const user = userEvent.setup();
      mockSortParams("name", "asc");

      render(<SortButtonsGroup options={options} />);

      expect(screen.getByRole("status")).toHaveTextContent("Sort.nameReadable");

      await user.click(screen.getAllByRole("button")[1]);

      const status = screen.getByRole("status");
      expect(status).toHaveTextContent("Sort.dateReadable");
      expect(status).not.toHaveTextContent("Sort.nameReadable");
    });

    it("click does not change status, while sortBy/sortDirection are empty", async () => {
      const user = userEvent.setup();

      render(<SortButtonsGroup options={options} />);

      await user.click(screen.getAllByRole("button")[0]);

      expect(screen.getByRole("status")).toHaveTextContent(
        "SortButtonsGroup.notSorted",
      );
    });
  });
});
