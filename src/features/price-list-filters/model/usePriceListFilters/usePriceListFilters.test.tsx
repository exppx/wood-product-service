import type { ReactNode } from "react";
import { act, renderHook } from "@/test-utils/test-utils";
import { MemoryRouter, useLocation, useNavigate } from "react-router";
import { FILTER_NAMES } from "@/entities/material";
import usePriceListFilters from "./usePriceListFilters";

function renderUseMaterialFilters(initialEntry = "/") {
  const wrapper = ({ children }: { children: ReactNode }) => (
    <MemoryRouter initialEntries={[initialEntry]}>{children}</MemoryRouter>
  );

  return renderHook(
    () => ({
      filters: usePriceListFilters(),
      location: useLocation(),
      navigate: useNavigate(),
    }),
    { wrapper },
  );
}

function url(params: Record<string, string>) {
  return `/?${new URLSearchParams(params).toString()}`;
}

describe("usePriceListFilters", () => {
  describe("reading filters from the URL", () => {
    it("returns empty values for all filters when there are no params", () => {
      const { result } = renderUseMaterialFilters();

      expect(result.current.filters.priceListFilters).toEqual({
        wood: "",
        length: "",
        width: "",
        height: "",
      });
    });

    it("reads the wood filter as a string", () => {
      const { result } = renderUseMaterialFilters(
        url({ [FILTER_NAMES.wood]: "oak" }),
      );

      expect(result.current.filters.priceListFilters.wood).toBe("oak");
    });

    it("reads length, width and height as numbers", () => {
      const { result } = renderUseMaterialFilters(
        url({
          [FILTER_NAMES.length]: "2000",
          [FILTER_NAMES.width]: "100",
          [FILTER_NAMES.height]: "25",
        }),
      );

      expect(result.current.filters.priceListFilters).toEqual({
        wood: "",
        length: 2000,
        width: 100,
        height: 25,
      });
    });

    it("reads all filters at once", () => {
      const { result } = renderUseMaterialFilters(
        url({
          [FILTER_NAMES.wood]: "pine",
          [FILTER_NAMES.length]: "3000",
          [FILTER_NAMES.width]: "150",
          [FILTER_NAMES.height]: "40",
        }),
      );

      expect(result.current.filters.priceListFilters).toEqual({
        wood: "pine",
        length: 3000,
        width: 150,
        height: 40,
      });
    });

    it("ignores unrelated params", () => {
      const { result } = renderUseMaterialFilters(
        url({ page: "2", sortBy: "price", [FILTER_NAMES.wood]: "oak" }),
      );

      expect(result.current.filters.priceListFilters).toEqual({
        wood: "oak",
        length: "",
        width: "",
        height: "",
      });
    });
  });

  describe("numeric parsing", () => {
    it("returns an empty string for a non-numeric value", () => {
      const { result } = renderUseMaterialFilters(
        url({
          [FILTER_NAMES.length]: "abc",
          [FILTER_NAMES.width]: "abc",
          [FILTER_NAMES.height]: "abc",
        }),
      );

      const { length, width, height } = result.current.filters.priceListFilters;

      expect(length).toBe("");
      expect(width).toBe("");
      expect(height).toBe("");
    });

    it("returns an empty string for an empty value", () => {
      const { result } = renderUseMaterialFilters(
        url({ [FILTER_NAMES.length]: "" }),
      );

      expect(result.current.filters.priceListFilters.length).toBe("");
    });

    it("keeps zero as a number instead of treating it as empty", () => {
      const { result } = renderUseMaterialFilters(
        url({ [FILTER_NAMES.height]: "0" }),
      );

      expect(result.current.filters.priceListFilters.height).toBe(0);
    });

    it("truncates decimal values to integers", () => {
      const { result } = renderUseMaterialFilters(
        url({ [FILTER_NAMES.width]: "12.7" }),
      );

      expect(result.current.filters.priceListFilters.width).toBe(12);
    });

    it("parses the leading number from a value with trailing characters", () => {
      const { result } = renderUseMaterialFilters(
        url({ [FILTER_NAMES.length]: "50mm" }),
      );

      expect(result.current.filters.priceListFilters.length).toBe(50);
    });

    it("returns an empty string when the value starts with a non-digit", () => {
      const { result } = renderUseMaterialFilters(
        url({ [FILTER_NAMES.length]: "mm50" }),
      );

      expect(result.current.filters.priceListFilters.length).toBe("");
    });

    it("parses negative numbers as invalid", () => {
      const { result } = renderUseMaterialFilters(
        url({ [FILTER_NAMES.width]: "-5" }),
      );

      expect(result.current.filters.priceListFilters.width).toBe("");
    });
  });

  describe("reactivity and memoization", () => {
    it("updates MaterialFilters when the URL changes", () => {
      const { result } = renderUseMaterialFilters();

      act(() => {
        void result.current.navigate(url({ [FILTER_NAMES.wood]: "oak" }));
      });

      expect(result.current.filters.priceListFilters.wood).toBe("oak");
    });

    it("keeps the same MaterialFilters reference on re-render with the same URL", () => {
      const { result, rerender } = renderUseMaterialFilters(
        url({ [FILTER_NAMES.wood]: "oak" }),
      );
      const before = result.current.filters.priceListFilters;

      rerender();

      expect(result.current.filters.priceListFilters).toBe(before);
    });

    it("keeps the same MaterialFilters reference when only unrelated params change", () => {
      const { result } = renderUseMaterialFilters(
        url({ [FILTER_NAMES.wood]: "oak" }),
      );
      const before = result.current.filters.priceListFilters;

      act(() => {
        void result.current.navigate(
          url({ [FILTER_NAMES.wood]: "oak", page: "2" }),
        );
      });

      expect(result.current.location.search).toContain("page=2");
      expect(result.current.filters.priceListFilters).toBe(before);
    });

    it("returns a new MaterialFilters reference when a filter value changes", () => {
      const { result } = renderUseMaterialFilters(
        url({ [FILTER_NAMES.wood]: "oak" }),
      );
      const before = result.current.filters.priceListFilters;

      act(() => {
        void result.current.navigate(url({ [FILTER_NAMES.wood]: "pine" }));
      });

      expect(result.current.filters.priceListFilters).not.toBe(before);
      expect(result.current.filters.priceListFilters.wood).toBe("pine");
    });
  });

  describe("clearMaterialFilterParams", () => {
    it("removes every filter param from the given URLSearchParams", () => {
      const { result } = renderUseMaterialFilters();
      const params = new URLSearchParams({
        [FILTER_NAMES.wood]: "oak",
        [FILTER_NAMES.length]: "2000",
        [FILTER_NAMES.width]: "100",
        [FILTER_NAMES.height]: "25",
      });

      result.current.filters.clearMaterialFilterParams(params);

      Object.values(FILTER_NAMES).forEach((filterName) => {
        expect(params.has(filterName)).toBe(false);
      });
    });

    it("keeps unrelated params untouched", () => {
      const { result } = renderUseMaterialFilters();
      const params = new URLSearchParams({
        page: "2",
        sortBy: "price",
        [FILTER_NAMES.wood]: "oak",
        [FILTER_NAMES.length]: "2000",
      });

      result.current.filters.clearMaterialFilterParams(params);

      expect(params.toString()).toBe("page=2&sortBy=price");
    });

    it("does not throw when filter params are absent", () => {
      const { result } = renderUseMaterialFilters();
      const params = new URLSearchParams({ page: "2" });

      expect(() =>
        result.current.filters.clearMaterialFilterParams(params),
      ).not.toThrow();
      expect(params.toString()).toBe("page=2");
    });

    it("does not change the current URL or filters", () => {
      const { result } = renderUseMaterialFilters(
        url({ [FILTER_NAMES.wood]: "oak" }),
      );
      const searchBefore = result.current.location.search;

      result.current.filters.clearMaterialFilterParams(new URLSearchParams());

      expect(result.current.location.search).toBe(searchBefore);
      expect(result.current.filters.priceListFilters.wood).toBe("oak");
    });
  });
});
