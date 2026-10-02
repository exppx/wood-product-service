import { act, renderHook } from "@/test-utils/test-utils";
import type { ReactNode } from "react";
import { MemoryRouter, useLocation } from "react-router";
import {
  SORT_BY_KEY,
  SORT_DIRECTION,
  SORT_DIRECTION_KEY,
  type SortParams,
} from "@/components/ui/SortButton/SortButton.config";
import useSortParams from "./useSortParams";

const NAME: SortParams["sortBy"] = "name";
const PRICE: SortParams["sortBy"] = "price";

function renderUseSortParams(initialEntry = "/") {
  const wrapper = ({ children }: { children: ReactNode }) => (
    <MemoryRouter initialEntries={[initialEntry]}>{children}</MemoryRouter>
  );

  return renderHook(
    () => ({
      sort: useSortParams(),
      location: useLocation(),
    }),
    { wrapper },
  );
}

type HookResult = ReturnType<typeof renderUseSortParams>["result"];

function getParams(result: HookResult) {
  return new URLSearchParams(result.current.location.search);
}

function url(params: Record<string, string>) {
  return `/?${new URLSearchParams(params).toString()}`;
}

describe("useSortParams", () => {
  describe("reading params from the URL", () => {
    it("returns empty sortBy and unset direction when there are no params", () => {
      const { result } = renderUseSortParams();

      expect(result.current.sort.sortBy).toBe("");
      expect(result.current.sort.sortDirection).toBe(SORT_DIRECTION.unset);
    });

    it("reads sortBy and ascending direction from the URL", () => {
      const { result } = renderUseSortParams(
        url({
          [SORT_BY_KEY]: NAME,
          [SORT_DIRECTION_KEY]: SORT_DIRECTION.ascending,
        }),
      );

      expect(result.current.sort.sortBy).toBe(NAME);
      expect(result.current.sort.sortDirection).toBe(SORT_DIRECTION.ascending);
    });

    it("reads descending direction from the URL", () => {
      const { result } = renderUseSortParams(
        url({
          [SORT_BY_KEY]: NAME,
          [SORT_DIRECTION_KEY]: SORT_DIRECTION.descending,
        }),
      );

      expect(result.current.sort.sortDirection).toBe(SORT_DIRECTION.descending);
    });

    it("falls back to unset direction when the value is invalid", () => {
      const { result } = renderUseSortParams(
        url({ [SORT_BY_KEY]: NAME, [SORT_DIRECTION_KEY]: "sideways" }),
      );

      expect(result.current.sort.sortBy).toBe(NAME);
      expect(result.current.sort.sortDirection).toBe(SORT_DIRECTION.unset);
    });

    it("returns unset direction when only sortBy is present", () => {
      const { result } = renderUseSortParams(url({ [SORT_BY_KEY]: NAME }));

      expect(result.current.sort.sortBy).toBe(NAME);
      expect(result.current.sort.sortDirection).toBe(SORT_DIRECTION.unset);
    });

    it("returns empty sortBy when only direction is present", () => {
      const { result } = renderUseSortParams(
        url({ [SORT_DIRECTION_KEY]: SORT_DIRECTION.ascending }),
      );

      expect(result.current.sort.sortBy).toBe("");
      expect(result.current.sort.sortDirection).toBe(SORT_DIRECTION.ascending);
    });
  });

  describe("setSort", () => {
    it("sets the field with ascending direction when nothing is sorted", () => {
      const { result } = renderUseSortParams();

      act(() => result.current.sort.setSort(NAME));

      const params = getParams(result);
      expect(params.get(SORT_BY_KEY)).toBe(NAME);
      expect(params.get(SORT_DIRECTION_KEY)).toBe(SORT_DIRECTION.ascending);
      expect(result.current.sort.sortBy).toBe(NAME);
      expect(result.current.sort.sortDirection).toBe(SORT_DIRECTION.ascending);
    });

    it("switches to a different field and resets direction to ascending", () => {
      const { result } = renderUseSortParams(
        url({
          [SORT_BY_KEY]: NAME,
          [SORT_DIRECTION_KEY]: SORT_DIRECTION.descending,
        }),
      );

      act(() => result.current.sort.setSort(PRICE));

      const params = getParams(result);
      expect(params.get(SORT_BY_KEY)).toBe(PRICE);
      expect(params.get(SORT_DIRECTION_KEY)).toBe(SORT_DIRECTION.ascending);
    });

    it("sets ascending direction when the same field has no direction", () => {
      const { result } = renderUseSortParams(url({ [SORT_BY_KEY]: NAME }));

      act(() => result.current.sort.setSort(NAME));

      const params = getParams(result);
      expect(params.get(SORT_BY_KEY)).toBe(NAME);
      expect(params.get(SORT_DIRECTION_KEY)).toBe(SORT_DIRECTION.ascending);
    });

    it("switches the same field from ascending to descending", () => {
      const { result } = renderUseSortParams(
        url({
          [SORT_BY_KEY]: NAME,
          [SORT_DIRECTION_KEY]: SORT_DIRECTION.ascending,
        }),
      );

      act(() => result.current.sort.setSort(NAME));

      const params = getParams(result);
      expect(params.get(SORT_BY_KEY)).toBe(NAME);
      expect(params.get(SORT_DIRECTION_KEY)).toBe(SORT_DIRECTION.descending);
    });

    it("removes both params when the same field is sorted descending", () => {
      const { result } = renderUseSortParams(
        url({
          [SORT_BY_KEY]: NAME,
          [SORT_DIRECTION_KEY]: SORT_DIRECTION.descending,
        }),
      );

      act(() => result.current.sort.setSort(NAME));

      const params = getParams(result);
      expect(params.has(SORT_BY_KEY)).toBe(false);
      expect(params.has(SORT_DIRECTION_KEY)).toBe(false);
      expect(result.current.sort.sortBy).toBe("");
      expect(result.current.sort.sortDirection).toBe(SORT_DIRECTION.unset);
    });

    it("cycles asc -> desc -> cleared on repeated calls for the same field", () => {
      const { result } = renderUseSortParams();

      act(() => result.current.sort.setSort(NAME));
      expect(result.current.sort.sortDirection).toBe(SORT_DIRECTION.ascending);

      act(() => result.current.sort.setSort(NAME));
      expect(result.current.sort.sortDirection).toBe(SORT_DIRECTION.descending);

      act(() => result.current.sort.setSort(NAME));
      expect(result.current.sort.sortBy).toBe("");
      expect(result.current.sort.sortDirection).toBe(SORT_DIRECTION.unset);
      expect(result.current.location.search).toBe("");
    });

    it("preserves unrelated search params", () => {
      const { result } = renderUseSortParams(url({ page: "3", wood: "oak" }));

      act(() => result.current.sort.setSort(NAME));

      const params = getParams(result);
      expect(params.get("page")).toBe("3");
      expect(params.get("wood")).toBe("oak");
      expect(params.get(SORT_BY_KEY)).toBe(NAME);
    });

    it("preserves unrelated search params when sorting is cleared", () => {
      const { result } = renderUseSortParams(
        url({
          page: "3",
          [SORT_BY_KEY]: NAME,
          [SORT_DIRECTION_KEY]: SORT_DIRECTION.descending,
        }),
      );

      act(() => result.current.sort.setSort(NAME));

      expect(result.current.location.search).toBe("?page=3");
    });
  });

  describe("clearSortParams", () => {
    it("removes sort params from the given URLSearchParams", () => {
      const { result } = renderUseSortParams();
      const params = new URLSearchParams({
        [SORT_BY_KEY]: NAME,
        [SORT_DIRECTION_KEY]: SORT_DIRECTION.ascending,
      });

      result.current.sort.clearSortParams(params);

      expect(params.has(SORT_BY_KEY)).toBe(false);
      expect(params.has(SORT_DIRECTION_KEY)).toBe(false);
    });

    it("keeps unrelated params untouched", () => {
      const { result } = renderUseSortParams();
      const params = new URLSearchParams({
        page: "2",
        [SORT_BY_KEY]: NAME,
        [SORT_DIRECTION_KEY]: SORT_DIRECTION.descending,
      });

      result.current.sort.clearSortParams(params);

      expect(params.toString()).toBe("page=2");
    });

    it("does not throw when sort params are absent", () => {
      const { result } = renderUseSortParams();
      const params = new URLSearchParams({ page: "2" });

      expect(() => result.current.sort.clearSortParams(params)).not.toThrow();
      expect(params.toString()).toBe("page=2");
    });

    it("does not change the current URL", () => {
      const { result } = renderUseSortParams(
        url({
          [SORT_BY_KEY]: NAME,
          [SORT_DIRECTION_KEY]: SORT_DIRECTION.ascending,
        }),
      );
      const searchBefore = result.current.location.search;

      result.current.sort.clearSortParams(new URLSearchParams());

      expect(result.current.location.search).toBe(searchBefore);
      expect(result.current.sort.sortBy).toBe(NAME);
    });
  });
});
