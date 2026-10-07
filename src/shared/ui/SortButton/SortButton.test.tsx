import { render, screen } from "@/test-utils/test-utils";
import userEvent from "@testing-library/user-event";
import SearchParamsDisplay from "@/test-utils/SearchParamsDisplay";
import type { ComponentProps, MouseEvent } from "react";
import { useSortParams } from "@/shared/lib/hooks";
import { type SortParams } from "@/shared/types/sort";
import SortButton from "./SortButton";

vi.mock("@/shared/lib/hooks", () => ({
  useSortParams: vi.fn(),
}));

vi.mock("@/shared/ui/icons", () => ({
  ArrowToUpThinSvg: () => <svg data-testid="arrow-icon" />,
}));

const TEST_LABEL = "test_label";
const TEST_SORTBY_VALUE = "test_value";
const OTHER_SORTBY_VALUE = "other_value";

const setSort = vi.fn();

type SortState = Partial<SortParams>;

function mockSortParams({ sortBy = "", sort = "" }: SortState = {}) {
  vi.mocked(useSortParams).mockReturnValue({
    sortBy,
    sortDirection: sort,
    setSort,
    clearSortParams: vi.fn(),
  });
}

function customRender(props: Partial<ComponentProps<typeof SortButton>> = {}) {
  const utils = render(
    <>
      <SortButton
        label={TEST_LABEL}
        sortByValue={TEST_SORTBY_VALUE}
        {...props}
      />
      <SearchParamsDisplay />
    </>,
  );

  const user = userEvent.setup();

  const button = screen.getByRole("button");
  // eslint-disable-next-line testing-library/no-node-access
  const iconWrapper = screen.getByTestId("arrow-icon").parentElement!;

  return {
    ...utils,
    user,
    button,
    iconWrapper,
  };
}

describe("SortButton", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockSortParams();
  });

  describe("rendering", () => {
    it("renders a button with the passed label", () => {
      const { button } = customRender();

      expect(button).toBeInTheDocument();
      expect(button).toHaveTextContent(TEST_LABEL);
    });

    it("renders the arrow icon hidden from assistive technologies", () => {
      const { iconWrapper } = customRender();

      expect(screen.getByTestId("arrow-icon")).toBeInTheDocument();
      expect(iconWrapper).toHaveAttribute("aria-hidden", "true");
    });

    it("forwards rest props to the button element", () => {
      const { button } = customRender({
        type: "button",
        title: "Sort by test",
        "data-testid": "custom-sort-button",
      } as Partial<React.ComponentProps<typeof SortButton>>);

      expect(button).toHaveAttribute("type", "button");
      expect(button).toHaveAttribute("title", "Sort by test");
      expect(button).toHaveAttribute("data-testid", "custom-sort-button");
    });

    it("uses aria-label as the accessible name when provided", () => {
      const { button } = customRender({ "aria-label": "Sort by test value" });

      expect(button).toHaveAccessibleName("Sort by test value");
      expect(button).toHaveTextContent(TEST_LABEL);
    });

    it("uses the visible label as the accessible name by default", () => {
      const { button } = customRender();

      expect(button).toHaveAccessibleName(TEST_LABEL);
    });

    it("merges a custom className with the base class", () => {
      const { button } = customRender({ className: "custom-class" });

      expect(button).toHaveClass("custom-class");
      expect(button.className).toContain("sort-button");
    });
  });

  describe("active state", () => {
    it("is active when sortBy matches sortByValue", () => {
      mockSortParams({ sortBy: TEST_SORTBY_VALUE, sort: "asc" });

      const { button } = customRender();

      expect(button.className).toContain("sort-button_active");
    });

    it("is not active when sortBy is empty", () => {
      const { button } = customRender();

      expect(button.className).not.toContain("sort-button_active");
    });

    it("is not active when sortBy differs from sortByValue", () => {
      mockSortParams({ sortBy: OTHER_SORTBY_VALUE, sort: "asc" });

      const { button } = customRender();

      expect(button.className).not.toContain("sort-button_active");
    });
  });

  describe("icon direction", () => {
    it("has the asc modifier when active and direction is asc", () => {
      mockSortParams({ sortBy: TEST_SORTBY_VALUE, sort: "asc" });

      const { iconWrapper } = customRender();

      expect(iconWrapper.className).toContain("sort-button__icon_asc");
      expect(iconWrapper.className).not.toContain("sort-button__icon_desc");
    });

    it("has the desc modifier when active and direction is desc", () => {
      mockSortParams({ sortBy: TEST_SORTBY_VALUE, sort: "desc" });

      const { iconWrapper } = customRender();

      expect(iconWrapper.className).toContain("sort-button__icon_desc");
      expect(iconWrapper.className).not.toContain("sort-button__icon_asc");
    });

    it("has no direction modifier when active but direction is unset", () => {
      mockSortParams({ sortBy: TEST_SORTBY_VALUE, sort: "" });

      const { iconWrapper } = customRender();

      expect(iconWrapper.className).not.toContain("sort-button__icon_asc");
      expect(iconWrapper.className).not.toContain("sort-button__icon_desc");
    });

    it.each(["asc", "desc"] as const)(
      "has no direction modifier when another field is sorted %s",
      (sortDirection) => {
        mockSortParams({ sortBy: OTHER_SORTBY_VALUE, sort: sortDirection });

        const { iconWrapper } = customRender();

        expect(iconWrapper.className).not.toContain("sort-button__icon_asc");
        expect(iconWrapper.className).not.toContain("sort-button__icon_desc");
      },
    );
  });

  describe("click handling", () => {
    it("calls setSort with sortByValue on click", async () => {
      const { button, user } = customRender();

      await user.click(button);

      expect(setSort).toHaveBeenCalledTimes(1);
      expect(setSort).toHaveBeenCalledWith(TEST_SORTBY_VALUE);
    });

    it("calls setSort with its own sortByValue even if another field is active", async () => {
      mockSortParams({ sortBy: OTHER_SORTBY_VALUE, sort: "desc" });

      const { button, user } = customRender();

      await user.click(button);

      expect(setSort).toHaveBeenCalledWith(TEST_SORTBY_VALUE);
    });

    it("calls the passed onClick with the click event", async () => {
      let currentTarget: EventTarget | null = null;
      const onClick = vi.fn((event: MouseEvent<HTMLButtonElement>) => {
        currentTarget = event.currentTarget;
      });
      const { button, user } = customRender({ onClick });

      await user.click(button);

      expect(onClick).toHaveBeenCalledTimes(1);
      expect(onClick.mock.calls[0][0].type).toBe("click");
      expect(currentTarget).toBe(button);
    });

    it("calls setSort before the passed onClick", async () => {
      const onClick = vi.fn();
      const { button, user } = customRender({ onClick });

      await user.click(button);

      expect(setSort.mock.invocationCallOrder[0]).toBeLessThan(
        onClick.mock.invocationCallOrder[0],
      );
    });

    it("does not throw when onClick is not passed", async () => {
      const { button, user } = customRender();

      await expect(user.click(button)).resolves.not.toThrow();
      expect(setSort).toHaveBeenCalledTimes(1);
    });

    it("does not call setSort or onClick when disabled", async () => {
      const onClick = vi.fn();
      const { button, user } = customRender({ disabled: true, onClick });

      await user.click(button);

      expect(setSort).not.toHaveBeenCalled();
      expect(onClick).not.toHaveBeenCalled();
    });
  });
});
