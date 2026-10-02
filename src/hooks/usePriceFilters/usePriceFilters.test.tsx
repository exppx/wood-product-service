import type { ReactNode } from "react";
import { act, renderHook } from "@/test-utils/test-utils";
import { MemoryRouter, useLocation, useNavigate } from "react-router";
import { FILTER_NAMES } from "@/components/ui/PriceListSection/PriceListFilters/PriceListFilters.config";
import usePriceFilters from "./usePriceFilters";

function renderUsePriceFilters(initialEntry = "/") {
  const wrapper = ({ children }: { children: ReactNode }) => (
    <MemoryRouter initialEntries={[initialEntry]}>{children}</MemoryRouter>
  );

  return renderHook(
    () => ({
      filters: usePriceFilters(),
      location: useLocation(),
      navigate: useNavigate(),
    }),
    { wrapper },
  );
}

function url(params: Record<string, string>) {
  return `/?${new URLSearchParams(params).toString()}`;
}

describe("usePriceFilters", () => {
  describe("reading filters from the URL", () => {
    it("returns empty values for all filters when there are no params", () => {
      const { result } = renderUsePriceFilters();

      expect(result.current.filters.priceFilters).toEqual({
        wood: "",
        length: "",
        width: "",
        height: "",
      });
    });

    it("reads the wood filter as a string", () => {
      const { result } = renderUsePriceFilters(
        url({ [FILTER_NAMES.wood]: "oak" }),
      );

      expect(result.current.filters.priceFilters.wood).toBe("oak");
    });

    it("reads length, width and height as numbers", () => {
      const { result } = renderUsePriceFilters(
        url({
          [FILTER_NAMES.length]: "2000",
          [FILTER_NAMES.width]: "100",
          [FILTER_NAMES.height]: "25",
        }),
      );

      expect(result.current.filters.priceFilters).toEqual({
        wood: "",
        length: 2000,
        width: 100,
        height: 25,
      });
    });

    it("reads all filters at once", () => {
      const { result } = renderUsePriceFilters(
        url({
          [FILTER_NAMES.wood]: "pine",
          [FILTER_NAMES.length]: "3000",
          [FILTER_NAMES.width]: "150",
          [FILTER_NAMES.height]: "40",
        }),
      );

      expect(result.current.filters.priceFilters).toEqual({
        wood: "pine",
        length: 3000,
        width: 150,
        height: 40,
      });
    });

    it("ignores unrelated params", () => {
      const { result } = renderUsePriceFilters(
        url({ page: "2", sortBy: "price", [FILTER_NAMES.wood]: "oak" }),
      );

      expect(result.current.filters.priceFilters).toEqual({
        wood: "oak",
        length: "",
        width: "",
        height: "",
      });
    });
  });

  describe("numeric parsing", () => {
    it("returns an empty string for a non-numeric value", () => {
      const { result } = renderUsePriceFilters(
        url({
          [FILTER_NAMES.length]: "abc",
          [FILTER_NAMES.width]: "abc",
          [FILTER_NAMES.height]: "abc",
        }),
      );

      const { length, width, height } = result.current.filters.priceFilters;

      expect(length).toBe("");
      expect(width).toBe("");
      expect(height).toBe("");
    });

    it("returns an empty string for an empty value", () => {
      const { result } = renderUsePriceFilters(
        url({ [FILTER_NAMES.length]: "" }),
      );

      expect(result.current.filters.priceFilters.length).toBe("");
    });

    it("keeps zero as a number instead of treating it as empty", () => {
      const { result } = renderUsePriceFilters(
        url({ [FILTER_NAMES.height]: "0" }),
      );

      expect(result.current.filters.priceFilters.height).toBe(0);
    });

    it("truncates decimal values to integers", () => {
      const { result } = renderUsePriceFilters(
        url({ [FILTER_NAMES.width]: "12.7" }),
      );

      expect(result.current.filters.priceFilters.width).toBe(12);
    });

    it("parses the leading number from a value with trailing characters", () => {
      const { result } = renderUsePriceFilters(
        url({ [FILTER_NAMES.length]: "50mm" }),
      );

      expect(result.current.filters.priceFilters.length).toBe(50);
    });

    it("returns an empty string when the value starts with a non-digit", () => {
      const { result } = renderUsePriceFilters(
        url({ [FILTER_NAMES.length]: "mm50" }),
      );

      expect(result.current.filters.priceFilters.length).toBe("");
    });

    it("parses negative numbers as invalid", () => {
      const { result } = renderUsePriceFilters(
        url({ [FILTER_NAMES.width]: "-5" }),
      );

      expect(result.current.filters.priceFilters.width).toBe("");
    });
  });

  describe("reactivity and memoization", () => {
    it("updates priceFilters when the URL changes", () => {
      const { result } = renderUsePriceFilters();

      act(() => {
        void result.current.navigate(url({ [FILTER_NAMES.wood]: "oak" }));
      });

      expect(result.current.filters.priceFilters.wood).toBe("oak");
    });

    it("keeps the same priceFilters reference on re-render with the same URL", () => {
      const { result, rerender } = renderUsePriceFilters(
        url({ [FILTER_NAMES.wood]: "oak" }),
      );
      const before = result.current.filters.priceFilters;

      rerender();

      expect(result.current.filters.priceFilters).toBe(before);
    });

    it("keeps the same priceFilters reference when only unrelated params change", () => {
      const { result } = renderUsePriceFilters(
        url({ [FILTER_NAMES.wood]: "oak" }),
      );
      const before = result.current.filters.priceFilters;

      act(() => {
        void result.current.navigate(
          url({ [FILTER_NAMES.wood]: "oak", page: "2" }),
        );
      });

      expect(result.current.location.search).toContain("page=2");
      expect(result.current.filters.priceFilters).toBe(before);
    });

    it("returns a new priceFilters reference when a filter value changes", () => {
      const { result } = renderUsePriceFilters(
        url({ [FILTER_NAMES.wood]: "oak" }),
      );
      const before = result.current.filters.priceFilters;

      act(() => {
        void result.current.navigate(url({ [FILTER_NAMES.wood]: "pine" }));
      });

      expect(result.current.filters.priceFilters).not.toBe(before);
      expect(result.current.filters.priceFilters.wood).toBe("pine");
    });
  });

  describe("clearPriceFilterParams", () => {
    it("removes every filter param from the given URLSearchParams", () => {
      const { result } = renderUsePriceFilters();
      const params = new URLSearchParams({
        [FILTER_NAMES.wood]: "oak",
        [FILTER_NAMES.length]: "2000",
        [FILTER_NAMES.width]: "100",
        [FILTER_NAMES.height]: "25",
      });

      result.current.filters.clearPriceFilterParams(params);

      Object.values(FILTER_NAMES).forEach((filterName) => {
        expect(params.has(filterName)).toBe(false);
      });
    });

    it("keeps unrelated params untouched", () => {
      const { result } = renderUsePriceFilters();
      const params = new URLSearchParams({
        page: "2",
        sortBy: "price",
        [FILTER_NAMES.wood]: "oak",
        [FILTER_NAMES.length]: "2000",
      });

      result.current.filters.clearPriceFilterParams(params);

      expect(params.toString()).toBe("page=2&sortBy=price");
    });

    it("does not throw when filter params are absent", () => {
      const { result } = renderUsePriceFilters();
      const params = new URLSearchParams({ page: "2" });

      expect(() =>
        result.current.filters.clearPriceFilterParams(params),
      ).not.toThrow();
      expect(params.toString()).toBe("page=2");
    });

    it("does not change the current URL or filters", () => {
      const { result } = renderUsePriceFilters(
        url({ [FILTER_NAMES.wood]: "oak" }),
      );
      const searchBefore = result.current.location.search;

      result.current.filters.clearPriceFilterParams(new URLSearchParams());

      expect(result.current.location.search).toBe(searchBefore);
      expect(result.current.filters.priceFilters.wood).toBe("oak");
    });
  });
});
