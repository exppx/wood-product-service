import { act, renderHook } from "@testing-library/react";
import useLocale from "./useLocale";

describe("useLocale", () => {
  it("returns initial locale", () => {
    const { result } = renderHook(() => useLocale());

    expect(result.current[0]).toEqual("en");
  });

  it("returns next locale", () => {
    const { result } = renderHook(() => useLocale());

    expect(result.current[2]).toEqual("ru");
  });

  it("toggles locale", () => {
    const { result } = renderHook(() => useLocale());

    act(() => {
      result.current[1]();
    });

    expect(result.current[0]).toEqual("ru");

    act(() => {
      result.current[1]();
    });

    expect(result.current[0]).toEqual("en");
  });

  it("toggles next locale", () => {
    const { result } = renderHook(() => useLocale());

    act(() => {
      result.current[1]();
    });

    expect(result.current[2]).toEqual("en");

    act(() => {
      result.current[1]();
    });

    expect(result.current[2]).toEqual("ru");
  });
});
