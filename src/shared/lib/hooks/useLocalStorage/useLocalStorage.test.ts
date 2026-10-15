import { act, renderHook } from "@testing-library/react";
import useLocalStorage from "./useLocalStorage";

interface TestObject {
  a: string;
}

interface WrongTestObject {
  b: string;
}

describe("useLocalStorage", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  const testKey = "test";
  const defaultValue: TestObject = { a: "a" };
  const testValue: TestObject = { a: "b" };
  const newValue: TestObject = { a: "c" };
  const wrongTestValue: WrongTestObject = { b: "a" };
  const typeChecker = (arg: unknown): arg is TestObject =>
    typeof arg === "object" &&
    arg !== null &&
    "a" in arg &&
    typeof arg.a === "string";

  it("returns saved value", () => {
    localStorage.setItem(testKey, JSON.stringify(testValue));
    const { result } = renderHook(() =>
      useLocalStorage(testKey, defaultValue, typeChecker),
    );

    expect(result.current[0]).toEqual(testValue);
  });

  it("returns default value if there is no saved value", () => {
    const { result } = renderHook(() =>
      useLocalStorage(testKey, defaultValue, typeChecker),
    );

    expect(result.current[0]).toEqual(defaultValue);
  });

  it("returns default value if saved value doesn't pass typeChecker", () => {
    localStorage.setItem(testKey, JSON.stringify(wrongTestValue));
    const { result } = renderHook(() =>
      useLocalStorage(testKey, defaultValue, typeChecker),
    );

    expect(result.current[0]).toEqual(defaultValue);
  });

  it("returns default value if saved value is broken", () => {
    localStorage.setItem(testKey, "invalid JSON");
    const { result } = renderHook(() =>
      useLocalStorage(testKey, defaultValue, typeChecker),
    );

    expect(result.current[0]).toEqual(defaultValue);
  });

  it("saves new value in localStorage on update", () => {
    localStorage.setItem(testKey, JSON.stringify(testValue));
    const { result } = renderHook(() =>
      useLocalStorage(testKey, defaultValue, typeChecker),
    );

    expect(JSON.parse(localStorage.getItem(testKey)!)).toEqual(testValue);

    act(() => {
      result.current[1](newValue);
    });

    expect(JSON.parse(localStorage.getItem(testKey)!)).toEqual(newValue);
  });
});
