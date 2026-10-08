import { renderHook, waitFor } from "@/test-utils/test-utils";
import createDeferred from "@/test-utils/createDeferred";
import type { MaterialFilters } from "@/entities/material";
import getFilterOptions from "../../api/getFilterOptions";
import type { MaterialFilterSelectOptions } from "../types";
import usePriceFilterOptions from "./usePriceListFilterOptions";

const { t, i18n } = vi.hoisted(() => ({
  t: vi.fn((key: string) => key),
  i18n: { language: "en" },
}));

vi.mock("react-i18next", () => ({
  useTranslation: () => ({ t, i18n }),
}));

vi.mock("../../api/getFilterOptions", () => ({ default: vi.fn() }));

type ApiResponse = Awaited<ReturnType<typeof getFilterOptions>>;

const EMPTY_OPTIONS: MaterialFilterSelectOptions = {
  wood: [],
  length: [],
  width: [],
  height: [],
};

const EN_OPTIONS: MaterialFilterSelectOptions = {
  wood: [{ label: "Oak", value: "oak" }],
  length: [{ label: "2000 mm", value: 2000 }],
  width: [],
  height: [],
};

const RU_OPTIONS: MaterialFilterSelectOptions = {
  wood: [{ label: "Дуб", value: "oak" }],
  length: [{ label: "2000 мм", value: 2000 }],
  width: [],
  height: [],
};

const API_RESPONSE: ApiResponse = { en: EN_OPTIONS, ru: RU_OPTIONS };

const EMPTY_FILTERS: MaterialFilters = {
  wood: "",
  length: "",
  width: "",
  height: "",
};

const OAK_FILTERS: MaterialFilters = {
  wood: "oak",
  length: 2000,
  width: "",
  height: "",
};

function renderUseMaterialFilterOptions(
  filters: MaterialFilters = EMPTY_FILTERS,
) {
  return renderHook(({ filters }) => usePriceFilterOptions(filters), {
    initialProps: { filters },
  });
}

describe("usePriceFilterOptions", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(getFilterOptions).mockReset();
    i18n.language = "en";
  });

  describe("initial request", () => {
    it("requests options with the passed filters on mount", async () => {
      vi.mocked(getFilterOptions).mockResolvedValue(API_RESPONSE);

      const { result } = renderUseMaterialFilterOptions(OAK_FILTERS);

      await waitFor(() => expect(result.current.isLoading).toBe(false));

      expect(getFilterOptions).toHaveBeenCalledTimes(1);
      expect(getFilterOptions).toHaveBeenCalledWith(OAK_FILTERS);
    });

    it("is loading with empty options and no error while the request is pending", () => {
      const deferred = createDeferred<ApiResponse>();
      vi.mocked(getFilterOptions).mockReturnValue(deferred.promise);

      const { result } = renderUseMaterialFilterOptions();

      expect(result.current.isLoading).toBe(true);
      expect(result.current.error).toBeNull();
      expect(result.current.filterOptions).toEqual(EMPTY_OPTIONS);
    });

    it("stores options for the current language and stops loading on success", async () => {
      vi.mocked(getFilterOptions).mockResolvedValue(API_RESPONSE);

      const { result } = renderUseMaterialFilterOptions();

      await waitFor(() => expect(result.current.isLoading).toBe(false));

      expect(result.current.filterOptions).toEqual(EN_OPTIONS);
      expect(result.current.error).toBeNull();
    });
  });

  describe("language changes", () => {
    it("picks options for another language from the response", async () => {
      i18n.language = "ru";
      vi.mocked(getFilterOptions).mockResolvedValue(API_RESPONSE);

      const { result } = renderUseMaterialFilterOptions();

      await waitFor(() => expect(result.current.isLoading).toBe(false));

      expect(result.current.filterOptions).toEqual(RU_OPTIONS);
    });

    it("refetches and switches options when the language changes", async () => {
      vi.mocked(getFilterOptions).mockResolvedValue(API_RESPONSE);

      const { result, rerender } = renderUseMaterialFilterOptions();
      await waitFor(() => expect(result.current.isLoading).toBe(false));
      expect(result.current.filterOptions).toEqual(EN_OPTIONS);

      i18n.language = "ru";
      rerender({ filters: EMPTY_FILTERS });

      await waitFor(() =>
        expect(result.current.filterOptions).toEqual(RU_OPTIONS),
      );
      expect(getFilterOptions).toHaveBeenCalledTimes(2);
      expect(result.current.isLoading).toBe(false);
    });
  });

  describe("filters changes", () => {
    it("refetches with the new filters when they change", async () => {
      vi.mocked(getFilterOptions).mockResolvedValue(API_RESPONSE);

      const { result, rerender } =
        renderUseMaterialFilterOptions(EMPTY_FILTERS);
      await waitFor(() => expect(result.current.isLoading).toBe(false));

      rerender({ filters: OAK_FILTERS });
      await waitFor(() => expect(getFilterOptions).toHaveBeenCalledTimes(2));

      expect(getFilterOptions).toHaveBeenLastCalledWith(OAK_FILTERS);
      await waitFor(() => expect(result.current.isLoading).toBe(false));
    });

    it("does not refetch on re-render with the same filters reference", async () => {
      vi.mocked(getFilterOptions).mockResolvedValue(API_RESPONSE);

      const { result, rerender } =
        renderUseMaterialFilterOptions(EMPTY_FILTERS);
      await waitFor(() => expect(result.current.isLoading).toBe(false));

      rerender({ filters: EMPTY_FILTERS });
      rerender({ filters: EMPTY_FILTERS });

      expect(getFilterOptions).toHaveBeenCalledTimes(1);
    });

    it("keeps the previous options while new ones are loading", async () => {
      vi.mocked(getFilterOptions).mockResolvedValueOnce(API_RESPONSE);

      const { result, rerender } =
        renderUseMaterialFilterOptions(EMPTY_FILTERS);
      await waitFor(() => expect(result.current.isLoading).toBe(false));

      const deferred = createDeferred<ApiResponse>();
      vi.mocked(getFilterOptions).mockReturnValueOnce(deferred.promise);

      rerender({ filters: OAK_FILTERS });

      await waitFor(() => expect(result.current.isLoading).toBe(true));
      expect(result.current.filterOptions).toEqual(EN_OPTIONS);

      deferred.resolve(API_RESPONSE);

      await waitFor(() => expect(result.current.isLoading).toBe(false));
    });
  });

  describe("loading state", () => {
    it("turns isLoading off after the pending request resolves", async () => {
      const deferred = createDeferred<ApiResponse>();
      vi.mocked(getFilterOptions).mockReturnValue(deferred.promise);

      const { result } = renderUseMaterialFilterOptions();
      expect(result.current.isLoading).toBe(true);

      deferred.resolve(API_RESPONSE);

      await waitFor(() => expect(result.current.isLoading).toBe(false));
      expect(result.current.isLoading).toBe(false);
      expect(result.current.filterOptions).toEqual(EN_OPTIONS);
    });
  });

  describe("error handling", () => {
    it("sets a translated error and stops loading when the request fails", async () => {
      vi.mocked(getFilterOptions).mockRejectedValue(new Error("Network error"));

      const { result } = renderUseMaterialFilterOptions();

      await waitFor(() => expect(result.current.isLoading).toBe(false));

      expect(t).toHaveBeenCalledWith("PriceListFilters.error");
      expect(result.current.error).toBe("PriceListFilters.error");
    });

    it("keeps options empty when the initial request fails", async () => {
      vi.mocked(getFilterOptions).mockRejectedValue(new Error("Network error"));

      const { result } = renderUseMaterialFilterOptions();

      await waitFor(() => expect(result.current.isLoading).toBe(false));

      expect(result.current.filterOptions).toEqual(EMPTY_OPTIONS);
    });

    it("keeps previously loaded options when a later request fails", async () => {
      vi.mocked(getFilterOptions).mockResolvedValueOnce(API_RESPONSE);

      const { result, rerender } =
        renderUseMaterialFilterOptions(EMPTY_FILTERS);
      await waitFor(() => expect(result.current.isLoading).toBe(false));

      vi.mocked(getFilterOptions).mockRejectedValueOnce(new Error("Boom"));
      rerender({ filters: OAK_FILTERS });

      await waitFor(() =>
        expect(result.current.error).toBe("PriceListFilters.error"),
      );
      expect(result.current.filterOptions).toEqual(EN_OPTIONS);
      expect(result.current.isLoading).toBe(false);
    });

    it("clears the error as soon as a new request starts", async () => {
      vi.mocked(getFilterOptions).mockRejectedValueOnce(new Error("Boom"));

      const { result, rerender } =
        renderUseMaterialFilterOptions(EMPTY_FILTERS);
      await waitFor(() =>
        expect(result.current.error).toBe("PriceListFilters.error"),
      );

      const deferred = createDeferred<ApiResponse>();
      vi.mocked(getFilterOptions).mockReturnValueOnce(deferred.promise);

      rerender({ filters: OAK_FILTERS });

      await waitFor(() => expect(result.current.isLoading).toBe(true));
      expect(result.current.error).toBeNull();

      deferred.resolve(API_RESPONSE);

      await waitFor(() => expect(result.current.isLoading).toBe(false));
      expect(result.current.error).toBeNull();
      expect(result.current.filterOptions).toEqual(EN_OPTIONS);
    });
  });
});
