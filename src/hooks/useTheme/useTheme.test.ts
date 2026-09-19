import { act, renderHook } from "@testing-library/react";
import useTheme from "./useTheme";
import { THEME_LOCAL_STORAGE_KEY } from "./useTheme.config";

describe("useTheme", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("returns 'dark' by default", () => {
    const { result } = renderHook(() => useTheme());

    expect(result.current[0]).toEqual("dark");
  });

  it("returns 'dark' from the localStorage if it is saved", () => {
    localStorage.setItem(THEME_LOCAL_STORAGE_KEY, JSON.stringify("dark"));
    const { result } = renderHook(() => useTheme());

    expect(result.current[0]).toEqual("dark");
  });

  it("returns 'light' from the localStorage if it is saved", () => {
    localStorage.setItem(THEME_LOCAL_STORAGE_KEY, JSON.stringify("light"));
    const { result } = renderHook(() => useTheme());

    expect(result.current[0]).toEqual("light");
  });

  it("toggles theme", () => {
    const { result } = renderHook(() => useTheme());

    act(() => {
      result.current[1]();
    });

    expect(result.current[0]).toEqual("light");

    act(() => {
      result.current[1]();
    });

    expect(result.current[0]).toEqual("dark");
  });
});
