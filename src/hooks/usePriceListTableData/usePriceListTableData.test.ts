import { act, renderHook, waitFor } from "@/test-utils/test-utils";
import createDeferred from "@/test-utils/createDeferred";
import type { Material } from "@/types/db";
import usePriceFilters from "@/hooks/usePriceFilters/usePriceFilters";
import useSortParams from "@/shared/lib/hooks/useSortParams/useSortParams";
import getPriceListTableData from "@/api/getPriceListTableData";
import usePriceListTableData from "./usePriceListTableData";

vi.mock("@/hooks/usePriceFilters/usePriceFilters");
vi.mock("@/hooks/useSortParams/useSortParams");
vi.mock("@/api/getPriceListTableData");

const { stableT } = vi.hoisted(() => ({
  stableT: (key: string) => key,
}));

vi.mock("react-i18next", () => ({
  useTranslation: () => ({ t: stableT }),
}));

type PriceFilters = ReturnType<typeof usePriceFilters>["priceFilters"];
type SortParams = ReturnType<typeof useSortParams>;
type ApiResult = Awaited<ReturnType<typeof getPriceListTableData>>;

const EMPTY_DATA = { en: {}, ru: {} };

const filters = { wood: "oak" } as PriceFilters;
const sortParams = {
  sortBy: "price",
  sortDirection: "asc",
} as SortParams;

const apiData: ApiResult = {
  en: {
    oak: [{ id: "1", slug: "oak", wood: "Oak" } as Material],
  },
  ru: {
    oak: [{ id: "1", slug: "oak", wood: "Дуб" } as Material],
  },
};

function mockDependencies({
  priceFilters = filters,
  params = sortParams,
}: { priceFilters?: PriceFilters; params?: SortParams } = {}) {
  vi.mocked(usePriceFilters).mockReturnValue({
    priceFilters,
  } as ReturnType<typeof usePriceFilters>);
  vi.mocked(useSortParams).mockReturnValue(params);
}

describe("usePriceListTableData", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    mockDependencies();
    vi.mocked(getPriceListTableData).mockResolvedValue(apiData);
  });

  describe("initial state", () => {
    it("starts loading right after mount and has empty data and no error", () => {
      const deferred = createDeferred<ApiResult>();
      vi.mocked(getPriceListTableData).mockReturnValue(deferred.promise);

      const { result } = renderHook(() => usePriceListTableData());

      expect(result.current.isLoading).toBe(true);
      expect(result.current.error).toBeNull();
      expect(result.current.data).toEqual(EMPTY_DATA);
    });
  });

  describe("successful request", () => {
    it("returns data from the api and stops loading", async () => {
      const { result } = renderHook(() => usePriceListTableData());

      await waitFor(() => expect(result.current.isLoading).toBe(false));

      expect(result.current.data).toEqual(apiData);
      expect(result.current.error).toBeNull();
    });

    it("calls the api with filters and sort params", async () => {
      const { result } = renderHook(() => usePriceListTableData());

      await waitFor(() => expect(result.current.isLoading).toBe(false));

      expect(getPriceListTableData).toHaveBeenCalledTimes(1);
      expect(getPriceListTableData).toHaveBeenCalledWith(filters, {
        sortBy: "price",
        sort: "asc",
      });
    });
  });

  describe("failed request", () => {
    beforeEach(() => {
      vi.mocked(getPriceListTableData).mockRejectedValue(new Error("fail"));
    });

    it("sets translated error message", async () => {
      const { result } = renderHook(() => usePriceListTableData());

      await waitFor(() => expect(result.current.isLoading).toBe(false));

      expect(result.current.error).toBe("PriceListTable.error");
    });

    it("keeps the initial data and stops loading", async () => {
      const { result } = renderHook(() => usePriceListTableData());

      await waitFor(() => expect(result.current.isLoading).toBe(false));

      expect(result.current.data).toEqual(EMPTY_DATA);
    });

    it("does not expose the original error message", async () => {
      const { result } = renderHook(() => usePriceListTableData());

      await waitFor(() => expect(result.current.isLoading).toBe(false));

      expect(result.current.error).not.toContain("fail");
    });
  });

  describe("refetching", () => {
    it("refetches when filters change", async () => {
      const { result, rerender } = renderHook(() => usePriceListTableData());

      await waitFor(() => expect(result.current.isLoading).toBe(false));

      const newFilters = { wood: "pine" } as PriceFilters;
      mockDependencies({ priceFilters: newFilters });
      rerender();

      await waitFor(() =>
        expect(getPriceListTableData).toHaveBeenCalledTimes(2),
      );
      await waitFor(() => expect(result.current.isLoading).toBe(false));

      expect(getPriceListTableData).toHaveBeenLastCalledWith(newFilters, {
        sortBy: "price",
        sort: "asc",
      });
    });

    it("refetches when sortBy changes", async () => {
      const { result, rerender } = renderHook(() => usePriceListTableData());

      await waitFor(() => expect(result.current.isLoading).toBe(false));

      mockDependencies({
        params: { ...sortParams, sortBy: "volume" },
      });
      rerender();

      await waitFor(() =>
        expect(getPriceListTableData).toHaveBeenCalledTimes(2),
      );
      await waitFor(() => expect(result.current.isLoading).toBe(false));

      expect(getPriceListTableData).toHaveBeenLastCalledWith(filters, {
        sortBy: "volume",
        sort: "asc",
      });
    });

    it("refetches when sort direction changes", async () => {
      const { result, rerender } = renderHook(() => usePriceListTableData());

      await waitFor(() => expect(result.current.isLoading).toBe(false));

      mockDependencies({
        params: { ...sortParams, sortDirection: "desc" },
      });
      rerender();

      await waitFor(() =>
        expect(getPriceListTableData).toHaveBeenCalledTimes(2),
      );
      await waitFor(() => expect(result.current.isLoading).toBe(false));

      expect(getPriceListTableData).toHaveBeenLastCalledWith(filters, {
        sortBy: "price",
        sort: "desc",
      });
    });

    it("does not refetch when dependencies stay the same", async () => {
      const { result, rerender } = renderHook(() => usePriceListTableData());

      await waitFor(() => expect(result.current.isLoading).toBe(false));

      rerender();
      rerender();

      expect(getPriceListTableData).toHaveBeenCalledTimes(1);
    });

    it("sets isLoading again while the next request is pending", async () => {
      const { result, rerender } = renderHook(() => usePriceListTableData());

      await waitFor(() => expect(result.current.isLoading).toBe(false));

      const deferred = createDeferred<ApiResult>();
      vi.mocked(getPriceListTableData).mockReturnValue(deferred.promise);
      mockDependencies({
        priceFilters: { wood: "pine" } as PriceFilters,
      });
      rerender();

      await waitFor(() => expect(result.current.isLoading).toBe(true));

      expect(result.current.data).toEqual(apiData);

      await act(async () => {
        deferred.resolve(EMPTY_DATA);
        await deferred.promise;
      });

      expect(result.current.isLoading).toBe(false);
      expect(result.current.data).toEqual(EMPTY_DATA);
    });

    it("resets the error when a new request starts and succeeds", async () => {
      vi.mocked(getPriceListTableData).mockRejectedValueOnce(new Error("fail"));

      const { result, rerender } = renderHook(() => usePriceListTableData());

      await waitFor(() =>
        expect(result.current.error).toBe("PriceListTable.error"),
      );

      mockDependencies({
        priceFilters: { wood: "pine" } as PriceFilters,
      });
      rerender();

      await waitFor(() => expect(result.current.error).toBeNull());
      await waitFor(() => expect(result.current.isLoading).toBe(false));

      expect(result.current.data).toEqual(apiData);
    });

    it("keeps the previous data when a subsequent request fails", async () => {
      const { result, rerender } = renderHook(() => usePriceListTableData());

      await waitFor(() => expect(result.current.isLoading).toBe(false));

      vi.mocked(getPriceListTableData).mockRejectedValue(new Error("fail"));
      mockDependencies({
        priceFilters: { wood: "pine" } as PriceFilters,
      });
      rerender();

      await waitFor(() =>
        expect(result.current.error).toBe("PriceListTable.error"),
      );

      expect(result.current.data).toEqual(apiData);
    });
  });
});
