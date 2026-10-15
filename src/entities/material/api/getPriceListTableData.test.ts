import type { MaterialFilters } from "../model/types";
import type { SortParams } from "@/shared/types/sort";
import getPriceListTableData from "./getPriceListTableData";

const { materialsMock, materialsRuMock } = vi.hoisted(() => {
  const make = (suffix: string) => [
    {
      id: 1,
      slug: "oak",
      name: `Oak ${suffix} 1`,
      length: 2000,
      width: 100,
      height: 50,
      price: 300,
      priceM3: 900,
    },
    {
      id: 2,
      slug: "oak",
      name: `Oak ${suffix} 2`,
      length: 3000,
      width: 150,
      height: 50,
      price: 100,
      priceM3: 1200,
    },
    {
      id: 3,
      slug: "pine",
      name: `Pine ${suffix} 1`,
      length: 2000,
      width: 150,
      height: 25,
      price: 200,
      priceM3: 500,
    },
    {
      id: 4,
      slug: "pine",
      name: `Pine ${suffix} 2`,
      length: 3000,
      width: 100,
      height: 25,
      price: 50,
      priceM3: 700,
    },
  ];

  return { materialsMock: make("en"), materialsRuMock: make("ru") };
});

vi.mock("@/db/materials", () => ({ default: materialsMock }));
vi.mock("@/db/materials_ru", () => ({ default: materialsRuMock }));

const emptyFilters: MaterialFilters = {
  wood: "",
  length: "",
  width: "",
  height: "",
};

const noSorting = {} as SortParams;

function filters(overrides: Partial<MaterialFilters>): MaterialFilters {
  return { ...emptyFilters, ...overrides };
}

function sorting(sortBy: string, sort: "asc" | "desc"): SortParams {
  return { sortBy, sort };
}

async function run(f: MaterialFilters, s: SortParams) {
  const promise = getPriceListTableData(f, s);
  await vi.runAllTimersAsync();
  return promise;
}

const ids = (items: { id?: unknown }[]) => items.map((item) => item.id);

describe("getPriceListTableData", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  describe("delay", () => {
    it("waits for a random delay before resolving", async () => {
      vi.spyOn(Math, "random").mockReturnValue(0.5);
      const resolved = vi.fn();

      void getPriceListTableData(emptyFilters, noSorting).then(resolved);

      await vi.advanceTimersByTimeAsync(499);
      expect(resolved).not.toHaveBeenCalled();

      await vi.advanceTimersByTimeAsync(1);
      expect(resolved).toHaveBeenCalledTimes(1);
    });
  });

  describe("result shape", () => {
    it("returns data for both locales grouped by slug", async () => {
      const result = await run(emptyFilters, noSorting);

      expect(Object.keys(result)).toEqual(["en", "ru"]);
      expect(Object.keys(result.en)).toEqual(["oak", "pine"]);
      expect(Object.keys(result.ru)).toEqual(["oak", "pine"]);
      expect(ids(result.en.oak)).toEqual([1, 2]);
      expect(ids(result.en.pine)).toEqual([3, 4]);
    });

    it("uses the corresponding data source for each locale", async () => {
      const result = await run(emptyFilters, noSorting);

      expect(result.en.oak[0]).toMatchObject({ name: "Oak en 1" });
      expect(result.ru.oak[0]).toMatchObject({ name: "Oak ru 1" });
    });
  });

  describe("filtering", () => {
    it("filters by wood", async () => {
      const result = await run(filters({ wood: "oak" }), noSorting);

      expect(Object.keys(result.en)).toEqual(["oak"]);
      expect(Object.keys(result.ru)).toEqual(["oak"]);
    });

    it("filters by length", async () => {
      const result = await run(filters({ length: 2000 }), noSorting);

      expect(ids(result.en.oak)).toEqual([1]);
      expect(ids(result.en.pine)).toEqual([3]);
    });

    it("filters by width", async () => {
      const result = await run(filters({ width: 150 }), noSorting);

      expect(ids(result.en.oak)).toEqual([2]);
      expect(ids(result.en.pine)).toEqual([3]);
    });

    it("filters by height", async () => {
      const result = await run(filters({ height: 25 }), noSorting);

      expect(result.en.oak).toBeUndefined();
      expect(ids(result.en.pine)).toEqual([3, 4]);
    });

    it("combines several filters", async () => {
      const result = await run(
        filters({ wood: "pine", length: 3000 }),
        noSorting,
      );

      expect(Object.keys(result.en)).toEqual(["pine"]);
      expect(ids(result.en.pine)).toEqual([4]);
    });

    it("returns empty objects if nothing matches", async () => {
      const result = await run(filters({ wood: "birch" }), noSorting);

      expect(result).toEqual({ en: {}, ru: {} });
    });
  });

  describe("sorting", () => {
    it("keeps original order if sorting is not specified", async () => {
      const result = await run(emptyFilters, noSorting);

      expect(ids(result.en.oak)).toEqual([1, 2]);
      expect(ids(result.en.pine)).toEqual([3, 4]);
    });

    it("does not sort if sortBy is missing", async () => {
      const result = await run(emptyFilters, { sort: "desc" } as SortParams);

      expect(ids(result.en.oak)).toEqual([1, 2]);
    });

    it("does not sort if sort direction is missing", async () => {
      const result = await run(emptyFilters, {
        sortBy: "price",
      } as SortParams);

      expect(ids(result.en.oak)).toEqual([1, 2]);
    });

    it("sorts by price ascending", async () => {
      const result = await run(emptyFilters, sorting("price", "asc"));

      expect(ids(result.en.oak)).toEqual([2, 1]);
      expect(ids(result.en.pine)).toEqual([4, 3]);
    });

    it("sorts by price descending", async () => {
      const result = await run(emptyFilters, sorting("price", "desc"));

      expect(ids(result.en.oak)).toEqual([1, 2]);
      expect(ids(result.en.pine)).toEqual([3, 4]);
    });

    it("sorts by priceM3 ascending", async () => {
      const result = await run(emptyFilters, sorting("priceM3", "asc"));

      expect(ids(result.en.oak)).toEqual([1, 2]);
      expect(ids(result.en.pine)).toEqual([3, 4]);
    });

    it("sorts by priceM3 descending", async () => {
      const result = await run(emptyFilters, sorting("priceM3", "desc"));

      expect(ids(result.en.oak)).toEqual([2, 1]);
      expect(ids(result.en.pine)).toEqual([4, 3]);
    });

    it("ignores unknown sortBy value", async () => {
      const result = await run(emptyFilters, sorting("unknown", "asc"));

      expect(ids(result.en.oak)).toEqual([1, 2]);
    });

    it("sorts both locales", async () => {
      const result = await run(emptyFilters, sorting("price", "asc"));

      expect(ids(result.ru.oak)).toEqual([2, 1]);
    });

    it("does not mutate source data", async () => {
      await run(emptyFilters, sorting("price", "asc"));

      expect(ids(materialsMock.filter((m) => m.slug === "oak"))).toEqual([
        1, 2,
      ]);
    });
  });
});
