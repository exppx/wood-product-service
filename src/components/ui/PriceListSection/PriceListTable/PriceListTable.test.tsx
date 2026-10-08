import { render, screen, within } from "@/test-utils/test-utils";
import type { Material, PriceListTableData } from "@/entities/material";
import {
  COLUMN_GROUPS_END_INDEXES,
  COLUMN_GROUPS_START_INDEXES,
  TABLE_HEADERS,
} from "./PriceListTable.config";
import PriceListTable from "./PriceListTable";

vi.mock("./PriceListTable.module.scss", () => ({
  default: new Proxy({}, { get: (_target, key) => String(key) }),
}));

type TableProps = React.ComponentProps<typeof PriceListTable>;

function createMaterial(overrides: Partial<Material> = {}): Material {
  return {
    id: "1",
    slug: "oak",
    wood: "Oak",
    length: 100,
    width: 20,
    height: 5,
    volume: 0.01,
    price: 50,
    priceM3: 5000,
    ...overrides,
  };
}

const oak1 = createMaterial({ id: "oak-1", slug: "oak", wood: "Oak" });
const oak2 = createMaterial({
  id: "oak-2",
  slug: "oak",
  wood: "Oak",
  length: 200,
  width: 30,
  height: 10,
  volume: 0.06,
  price: 300,
  priceM3: 5001,
});
const pine1 = createMaterial({
  id: "pine-1",
  slug: "pine",
  wood: "Pine",
  length: 300,
  width: 40,
  height: 15,
  volume: 0.18,
  price: 400,
  priceM3: 2222,
});

const DEFAULT_DATA: PriceListTableData = {
  oak: [oak1, oak2],
  pine: [pine1],
};

function renderTable(props: Partial<TableProps> = {}) {
  return render(
    <PriceListTable
      data={DEFAULT_DATA}
      isLoading={false}
      error={null}
      {...props}
    />,
  );
}

function getTableCellWrapper(cell: HTMLElement) {
  return cell.firstElementChild as HTMLElement;
}

describe("PriceListTable", () => {
  describe("error state", () => {
    it("renders error message with role=alert", () => {
      renderTable({ error: "Something went wrong" });

      expect(screen.getByRole("alert")).toHaveTextContent(
        "Something went wrong",
      );
    });

    it("does not render the table when there is an error", () => {
      renderTable({ error: "Something went wrong" });

      expect(screen.queryByRole("table")).not.toBeInTheDocument();
    });

    it("does not render alert when there is no error", () => {
      renderTable();

      expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    });
  });

  describe("headers", () => {
    it("renders all column headers", () => {
      renderTable();

      const [thead] = screen.getAllByRole("rowgroup");
      const headers = within(thead).getAllByRole("columnheader");

      expect(headers).toHaveLength(TABLE_HEADERS.length);
    });

    it.each(TABLE_HEADERS.map((header) => [header]))(
      "renders visible text and aria-label for %o",
      (header) => {
        renderTable();

        const th = screen.getByRole("columnheader", {
          name: new RegExp(header.readable.replace(/\./g, "\\.")),
        });

        expect(th).toHaveTextContent(header.visible);
      },
    );

    it("renders headers inside thead", () => {
      renderTable();

      const [thead] = screen.getAllByRole("rowgroup");

      expect(within(thead).getAllByRole("columnheader")).toHaveLength(
        TABLE_HEADERS.length,
      );
    });

    it("marks the last column of the group (height) with group class", () => {
      renderTable();

      const [thead] = screen.getAllByRole("rowgroup");
      const headers = within(thead).getAllByRole("columnheader");

      headers.forEach((th, index) => {
        if (index === 3) {
          expect(th).toHaveClass("cell_last-col-in-group");
        } else {
          expect(th).not.toHaveClass("cell_last-col-in-group");
        }
      });
    });

    it("applies corner classes to the first header", () => {
      renderTable();

      const [thead] = screen.getAllByRole("rowgroup");
      const headers = within(thead).getAllByRole("columnheader");
      const wrapper = getTableCellWrapper(headers[0]);

      expect(wrapper).toHaveClass(
        "cell-content-wrapper",
        "cell-content-wrapper_first-in-group",
        "cell-content-wrapper_top-left",
      );
      expect(wrapper).not.toHaveClass("cell-content-wrapper_last-col");
    });

    it("applies corner classes to the last header", () => {
      renderTable();

      const [thead] = screen.getAllByRole("rowgroup");
      const headers = within(thead).getAllByRole("columnheader");
      const wrapper = getTableCellWrapper(headers[headers.length - 1]);

      expect(wrapper).toHaveClass(
        "cell-content-wrapper_last-in-group",
        "cell-content-wrapper_top-right",
        "cell-content-wrapper_last-col",
      );
    });

    it("applies group-boundary classes to headers at group edges", () => {
      renderTable();

      const headers = screen.getAllByRole("columnheader");
      const groupEnd = COLUMN_GROUPS_END_INDEXES[0];
      const groupStart = COLUMN_GROUPS_START_INDEXES[0];

      expect(getTableCellWrapper(headers[groupEnd])).toHaveClass(
        "cell-content-wrapper_last-in-group",
        "cell-content-wrapper_top-right",
      );
      expect(getTableCellWrapper(headers[groupStart])).toHaveClass(
        "cell-content-wrapper_first-in-group",
        "cell-content-wrapper_top-left",
      );
    });

    it("does not apply boundary classes to middle headers", () => {
      renderTable();

      const groupEnd = COLUMN_GROUPS_END_INDEXES[0];
      const wrapper = getTableCellWrapper(
        screen.getAllByRole("columnheader")[groupEnd - 1],
      );

      expect(wrapper).not.toHaveClass(
        "cell-content-wrapper_first-in-group",
        "cell-content-wrapper_last-in-group",
        "cell-content-wrapper_top-left",
        "cell-content-wrapper_top-right",
      );
    });
  });

  describe("body", () => {
    it("renders one row per material plus the header row", () => {
      renderTable();

      expect(screen.getAllByRole("row")).toHaveLength(4);
    });

    it("renders the data passed via props", () => {
      renderTable();

      expect(screen.getByText("Oak")).toBeInTheDocument();
      expect(screen.getByText("Pine")).toBeInTheDocument();
    });

    it("renders group name only once per group with correct rowSpan", () => {
      renderTable();

      const oakName = screen.getByText("Oak").closest("th");
      const pineName = screen.getByText("Pine").closest("th");

      expect(screen.getAllByText("Oak")).toHaveLength(1);
      expect(oakName).toHaveAttribute("rowspan", "2");
      expect(pineName).toHaveAttribute("rowspan", "1");
    });

    it("renders all property values of a material in the right order", () => {
      renderTable();

      const row = screen.getByText("5001").closest("tr") as HTMLElement;
      const cells = within(row).getAllByRole("cell");

      expect(cells.map((cell) => cell.textContent)).toEqual([
        "200",
        "30",
        "10",
        "0.06",
        "300",
        "5001",
      ]);
    });

    it("renders the group name cell only in the first row of a group", () => {
      renderTable();

      const rows = screen.getAllByRole("row");
      const [, oakRow1, oakRow2, pineRow] = rows;

      expect(oakRow1.querySelectorAll("th")).toHaveLength(1);
      expect(oakRow1.querySelectorAll("td")).toHaveLength(6);

      expect(oakRow2.querySelectorAll("th")).toHaveLength(0);
      expect(oakRow2.querySelectorAll("td")).toHaveLength(6);

      expect(pineRow.querySelectorAll("th")).toHaveLength(1);
    });

    it("renders an empty tbody when there is no data", () => {
      renderTable({ data: {} });

      expect(screen.getAllByRole("row")).toHaveLength(1);
    });
  });

  describe("cell classes", () => {
    it("marks the last column in group (height) cells", () => {
      renderTable();

      const row = screen.getByText("5001").closest("tr") as HTMLElement;
      const cells = within(row).getAllByRole("cell");

      cells.forEach((cell, index) => {
        if (index === 2) {
          expect(cell).toHaveClass("cell_last-col-in-group");
        } else {
          expect(cell).not.toHaveClass("cell_last-col-in-group");
        }
      });
    });

    it("marks only the cells of the last row in group with last-row class", () => {
      renderTable();

      const [, oakRow1, oakRow2] = screen.getAllByRole("row");

      within(oakRow1)
        .getAllByRole("cell")
        .forEach((cell) =>
          expect(cell).not.toHaveClass("cell_last-row-in-group"),
        );
      within(oakRow2)
        .getAllByRole("cell")
        .forEach((cell) => expect(cell).toHaveClass("cell_last-row-in-group"));
    });

    it("applies last-col and bottom-right classes to the last cell of the last row", () => {
      renderTable();

      const [, , oakRow2] = screen.getAllByRole("row");
      const cells = within(oakRow2).getAllByRole("cell");
      const wrapper = getTableCellWrapper(cells[cells.length - 1]);

      expect(wrapper).toHaveClass(
        "cell-content-wrapper_last-col",
        "cell-content-wrapper_last-row",
        "cell-content-wrapper_last-in-group",
        "cell-content-wrapper_bottom-right",
      );
    });

    it("applies bottom-left class to the first cell of a column group in the last row", () => {
      renderTable();

      const [, , oakRow2] = screen.getAllByRole("row");
      const cells = within(oakRow2).getAllByRole("cell");
      const groupStart = COLUMN_GROUPS_START_INDEXES[0] - 1;

      expect(getTableCellWrapper(cells[groupStart])).toHaveClass(
        "cell-content-wrapper_first-in-group",
        "cell-content-wrapper_bottom-left",
      );
    });

    it("does not apply top corner classes to cells of the first group", () => {
      renderTable();

      const [, oakRow1] = screen.getAllByRole("row");

      within(oakRow1)
        .getAllByRole("cell")
        .forEach((cell) => {
          expect(getTableCellWrapper(cell)).not.toHaveClass(
            "cell-content-wrapper_top-left",
            "cell-content-wrapper_top-right",
          );
        });
    });

    it("applies top corner classes to the first row of non-first groups", () => {
      renderTable();

      const [, , , pineRow] = screen.getAllByRole("row");
      const cells = within(pineRow).getAllByRole("cell");
      const firstGroupStart = 0;
      const firstGroupEnd = COLUMN_GROUPS_END_INDEXES[0] - 1;
      const secondGroupStart = COLUMN_GROUPS_START_INDEXES[0] - 1;
      const lastColumn = cells.length - 1;

      expect(getTableCellWrapper(cells[firstGroupStart])).not.toHaveClass(
        "cell-content-wrapper_top-left",
      );

      expect(getTableCellWrapper(cells[secondGroupStart])).toHaveClass(
        "cell-content-wrapper_top-left",
      );

      expect(getTableCellWrapper(cells[firstGroupEnd])).toHaveClass(
        "cell-content-wrapper_top-right",
      );

      expect(getTableCellWrapper(cells[lastColumn])).toHaveClass(
        "cell-content-wrapper_top-right",
      );
    });
  });

  describe("group name cell classes", () => {
    it("does not apply top-left classes to the first group name", () => {
      renderTable();

      const th = screen.getByText("Oak").closest("th") as HTMLElement;

      expect(th).toHaveClass(
        "cell_group-name",
        "cell_group-name_bottom-left",
        "cell_last-row-in-group",
      );
      expect(th).not.toHaveClass("cell_group-name_top-left");
      expect(getTableCellWrapper(th)).not.toHaveClass(
        "cell-content-wrapper_top-left",
      );
    });

    it("applies top-left classes to non-first group names", () => {
      renderTable();

      const th = screen.getByText("Pine").closest("th") as HTMLElement;

      expect(th).toHaveClass("cell_group-name_top-left");
      expect(getTableCellWrapper(th)).toHaveClass(
        "cell-content-wrapper_first-in-group",
        "cell-content-wrapper_bottom-left",
        "cell-content-wrapper_top-left",
      );
    });
  });

  describe("loading state", () => {
    it("adds stale class to the table while loading", () => {
      renderTable({ isLoading: true });

      expect(screen.getByRole("table")).toHaveClass(
        "price-table",
        "price-table_stale",
      );
    });

    it("does not add stale class when loaded", () => {
      renderTable();

      const table = screen.getByRole("table");

      expect(table).toHaveClass("price-table");
      expect(table).not.toHaveClass("price-table_stale");
    });

    it("keeps rendering data while loading", () => {
      renderTable({ isLoading: true });

      expect(screen.getByText("Pine")).toBeInTheDocument();
    });
  });
});
