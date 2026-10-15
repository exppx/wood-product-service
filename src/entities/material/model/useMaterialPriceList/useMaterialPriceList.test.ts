import { act, renderHook, waitFor } from "@/test-utils/test-utils";
import createDeferred from "@/test-utils/createDeferred";
import type { SortParams } from "@/shared/types/sort";
import type { Material, MaterialFilters } from "../types";
import getPriceListTableData from "../../api/getPriceListTableData";
import useMaterialPriceList from "./useMaterialPriceList";

vi.mock("../../api/getPriceListTableData");

type ApiResult = Awaited<ReturnType<typeof getPriceListTableData>>;
type HookProps = { filters: MaterialFilters; sort: SortParams };

const EMPTY_DATA = { en: {}, ru: {} };

const filters = { wood: "oak" } as MaterialFilters;
const sort = { sortBy: "price", sort: "asc" } as SortParams;

const apiData: ApiResult = {
  en: {
    oak: [{ id: "1", slug: "oak", wood: "Oak" } as Material],
  },
  ru: {
    oak: [{ id: "1", slug: "oak", wood: "Дуб" } as Material],
  },
};

function renderMaterialPriceList(initialProps: HookProps = { filters, sort }) {
  return renderHook(
    ({ filters, sort }: HookProps) => useMaterialPriceList(filters, sort),
    { initialProps },
  );
}

describe("useMaterialPriceList", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    vi.mocked(getPriceListTableData).mockResolvedValue(apiData);
  });

  describe("initial state", () => {
    it("starts loading right after mount and has empty data and no error", () => {
      const deferred = createDeferred<ApiResult>();
      vi.mocked(getPriceListTableData).mockReturnValue(deferred.promise);

      const { result } = renderMaterialPriceList();

      expect(result.current.isLoading).toBe(true);
      expect(result.current.isError).toBe(false);
      expect(result.current.data).toEqual(EMPTY_DATA);
    });
  });

  describe("successful request", () => {
    it("returns data from the api and stops loading", async () => {
      const { result } = renderMaterialPriceList();

      await waitFor(() => expect(result.current.isLoading).toBe(false));

      expect(result.current.data).toEqual(apiData);
      expect(result.current.isError).toBe(false);
    });

    it("calls the api with filters and sort params", async () => {
      const { result } = renderMaterialPriceList();

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

    it("sets the error flag and stops loading", async () => {
      const { result } = renderMaterialPriceList();

      await waitFor(() => expect(result.current.isLoading).toBe(false));

      expect(result.current.isError).toBe(true);
    });

    it("keeps the initial data", async () => {
      const { result } = renderMaterialPriceList();

      await waitFor(() => expect(result.current.isLoading).toBe(false));

      expect(result.current.data).toEqual(EMPTY_DATA);
    });
  });

  describe("refetching", () => {
    it("refetches when filters change", async () => {
      const { result, rerender } = renderMaterialPriceList();

      await waitFor(() => expect(result.current.isLoading).toBe(false));

      const newFilters = { wood: "pine" } as MaterialFilters;
      rerender({ filters: newFilters, sort });

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
      const { result, rerender } = renderMaterialPriceList();

      await waitFor(() => expect(result.current.isLoading).toBe(false));

      rerender({ filters, sort: { ...sort, sortBy: "volume" } });

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
      const { result, rerender } = renderMaterialPriceList();

      await waitFor(() => expect(result.current.isLoading).toBe(false));

      rerender({ filters, sort: { ...sort, sort: "desc" } });

      await waitFor(() =>
        expect(getPriceListTableData).toHaveBeenCalledTimes(2),
      );
      await waitFor(() => expect(result.current.isLoading).toBe(false));

      expect(getPriceListTableData).toHaveBeenLastCalledWith(filters, {
        sortBy: "price",
        sort: "desc",
      });
    });

    it("does not refetch when the sort object is recreated with the same values", async () => {
      const { result, rerender } = renderMaterialPriceList();

      await waitFor(() => expect(result.current.isLoading).toBe(false));

      rerender({ filters, sort: { ...sort } });

      expect(getPriceListTableData).toHaveBeenCalledTimes(1);
    });

    it("does not refetch when dependencies stay the same", async () => {
      const { result, rerender } = renderMaterialPriceList();

      await waitFor(() => expect(result.current.isLoading).toBe(false));

      rerender({ filters, sort });
      rerender({ filters, sort });

      expect(getPriceListTableData).toHaveBeenCalledTimes(1);
    });

    it("sets isLoading again while the next request is pending", async () => {
      const { result, rerender } = renderMaterialPriceList();

      await waitFor(() => expect(result.current.isLoading).toBe(false));

      const deferred = createDeferred<ApiResult>();
      vi.mocked(getPriceListTableData).mockReturnValue(deferred.promise);
      rerender({ filters: { wood: "pine" } as MaterialFilters, sort });

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

      const { result, rerender } = renderMaterialPriceList();

      await waitFor(() => expect(result.current.isError).toBe(true));

      rerender({ filters: { wood: "pine" } as MaterialFilters, sort });

      await waitFor(() => expect(result.current.isError).toBe(false));
      await waitFor(() => expect(result.current.isLoading).toBe(false));

      expect(result.current.data).toEqual(apiData);
    });

    it("keeps the previous data when a subsequent request fails", async () => {
      const { result, rerender } = renderMaterialPriceList();

      await waitFor(() => expect(result.current.isLoading).toBe(false));

      vi.mocked(getPriceListTableData).mockRejectedValue(new Error("fail"));
      rerender({ filters: { wood: "pine" } as MaterialFilters, sort });

      await waitFor(() => expect(result.current.isError).toBe(true));

      expect(result.current.data).toEqual(apiData);
    });
  });
});
