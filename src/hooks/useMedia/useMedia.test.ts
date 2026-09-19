import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import useMedia from "./useMedia";
import { BREAKPOINTS } from "./useMedia.config";

describe("useMedia", () => {
  let mobile = false;
  let tablet = false;
  let desktop = false;

  beforeEach(() => {
    mobile = false;
    tablet = false;
    desktop = false;

    vi.stubGlobal(
      "matchMedia",
      vi.fn((query: string) => {
        return {
          matches:
            (query.includes(`max-width: ${BREAKPOINTS.mobileEnd}`) && mobile) ||
            (query.includes(`min-width: ${BREAKPOINTS.tabletStart}`) &&
              query.includes(`max-width: ${BREAKPOINTS.tabletEnd}`) &&
              tablet) ||
            (query.includes(`min-width: ${BREAKPOINTS.desktopStart}`) &&
              desktop),
          media: query,
          onchange: null,
          addListener: vi.fn(),
          removeListener: vi.fn(),
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
          dispatchEvent: vi.fn(),
        };
      }),
    );
  });

  it("returns mobile state", () => {
    mobile = true;

    const { result } = renderHook(() => useMedia());

    expect(result.current).toEqual({
      isMobile: true,
      isTablet: false,
      isDesktop: false,
    });
  });

  it("returns tablet state", () => {
    tablet = true;

    const { result } = renderHook(() => useMedia());

    expect(result.current).toEqual({
      isMobile: false,
      isTablet: true,
      isDesktop: false,
    });
  });

  it("returns desktop state", () => {
    desktop = true;

    const { result } = renderHook(() => useMedia());

    expect(result.current).toEqual({
      isMobile: false,
      isTablet: false,
      isDesktop: true,
    });
  });

  it("updates state on resize if media changed", () => {
    mobile = true;

    const { result } = renderHook(() => useMedia());

    expect(result.current.isMobile).toBe(true);

    mobile = false;
    desktop = true;

    act(() => {
      window.dispatchEvent(new Event("resize"));
    });

    expect(result.current).toEqual({
      isMobile: false,
      isTablet: false,
      isDesktop: true,
    });
  });

  it("doesn't update state on resize if media didn't change", () => {
    mobile = true;

    const { result } = renderHook(() => useMedia());

    expect(result.current.isMobile).toBe(true);

    act(() => {
      window.dispatchEvent(new Event("resize"));
    });

    expect(result.current).toEqual({
      isMobile: true,
      isTablet: false,
      isDesktop: false,
    });
  });
});
