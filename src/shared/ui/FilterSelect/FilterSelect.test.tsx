import { render, screen } from "@/test-utils/test-utils";
import userEvent from "@testing-library/user-event";
import SearchParamsDisplay from "@/test-utils/SearchParamsDisplay";
import FilterSelect from "./FilterSelect";
import type { ChangeEvent } from "react";

const options = [
  { label: "All", value: "" },
  { label: "Active", value: "active" },
  { label: "Archived", value: "archived" },
];

function renderFilterSelect(
  props: Partial<React.ComponentProps<typeof FilterSelect>> = {},
  initialEntry?: string,
) {
  return render(
    <>
      <FilterSelect
        label="Status"
        searchKey="status"
        options={options}
        {...props}
      />
      <SearchParamsDisplay />
    </>,
    { route: initialEntry },
  );
}

const getSearch = () => screen.getByTestId("search-params").textContent;

describe("FilterSelect", () => {
  describe("layout", () => {
    it("links label with select", () => {
      renderFilterSelect();

      const select = screen.getByLabelText("Status");

      expect(select).toBeInTheDocument();
      expect(select.tagName).toBe("SELECT");
      expect(screen.getByText("Status")).toHaveAttribute("for", select.id);
    });

    it("renders all passed options", () => {
      renderFilterSelect();

      const renderedOptions = screen.getAllByRole("option");

      expect(renderedOptions).toHaveLength(options.length);
      options.forEach((option, index) => {
        expect(renderedOptions[index]).toHaveTextContent(option.label);
        expect(renderedOptions[index]).toHaveValue(option.value);
      });
    });

    it("passes other props to the Select", () => {
      renderFilterSelect({ disabled: true, name: "status-filter" });

      const select = screen.getByLabelText("Status");

      expect(select).toBeDisabled();
      expect(select).toHaveAttribute("name", "status-filter");
    });

    it("value and id, passed from outside, does not rewrite inner ones", () => {
      renderFilterSelect(
        { id: "custom-id", value: "archived" },
        "/?status=active",
      );

      const select = screen.getByLabelText("Status");

      expect(select).toHaveValue("active");
      expect(select).not.toHaveAttribute("id", "custom-id");
    });
  });

  describe("value from URL", () => {
    it("choses empty value, if there is no parameter in URL", () => {
      renderFilterSelect();

      expect(screen.getByLabelText("Status")).toHaveValue("");
    });

    it("choses option, according to parameter in URL", () => {
      renderFilterSelect({}, "/?status=archived");

      expect(screen.getByLabelText("Status")).toHaveValue("archived");
    });

    it("uses passed searchKey", () => {
      renderFilterSelect(
        { searchKey: "state" },
        "/?state=active&status=archived",
      );

      expect(screen.getByLabelText("Status")).toHaveValue("active");
    });
  });

  describe("value changing", () => {
    it("writes chosen value into search params", async () => {
      const user = userEvent.setup();
      renderFilterSelect();

      await user.selectOptions(screen.getByLabelText("Status"), "active");

      expect(getSearch()).toBe("status=active");
      expect(screen.getByLabelText("Status")).toHaveValue("active");
    });

    it("replaces existing parameter value", async () => {
      const user = userEvent.setup();
      renderFilterSelect({}, "/?status=active");

      await user.selectOptions(screen.getByLabelText("Status"), "archived");

      expect(getSearch()).toBe("status=archived");
    });

    it("deletes parameter from URL if empty value is chosen", async () => {
      const user = userEvent.setup();
      renderFilterSelect({}, "/?status=active");

      await user.selectOptions(screen.getByLabelText("Status"), "");

      expect(getSearch()).toBe("");
      expect(screen.getByLabelText("Status")).toHaveValue("");
    });

    it("preserves other search params on change", async () => {
      const user = userEvent.setup();
      renderFilterSelect({}, "/?page=2&sortBy=name");

      await user.selectOptions(screen.getByLabelText("Status"), "active");

      const params = new URLSearchParams(getSearch());
      expect(params.get("status")).toBe("active");
      expect(params.get("page")).toBe("2");
      expect(params.get("sortBy")).toBe("name");
    });

    it("preserves other search params on deletion", async () => {
      const user = userEvent.setup();
      renderFilterSelect({}, "/?page=2&status=active");

      await user.selectOptions(screen.getByLabelText("Status"), "");

      expect(getSearch()).toBe("page=2");
    });
  });

  describe("onChange", () => {
    it("calls passed onChange after value change", async () => {
      const user = userEvent.setup();
      const onChange = vi.fn<(event: ChangeEvent<HTMLSelectElement>) => void>();
      renderFilterSelect({ onChange });

      await user.selectOptions(screen.getByLabelText("Status"), "archived");

      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange.mock.calls[0][0].target.value).toBe("archived");
    });

    it("does not break if onChange is not passed", async () => {
      const user = userEvent.setup();
      renderFilterSelect();

      await expect(
        user.selectOptions(screen.getByLabelText("Status"), "active"),
      ).resolves.not.toThrow();
    });
  });
});
