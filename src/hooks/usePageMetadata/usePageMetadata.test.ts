import { renderHook } from "@testing-library/react";
import usePageMetadata from "./usePageMetadata";

describe("usePageMetadata", () => {
  afterEach(() => {
    document.head.innerHTML = "";
  });

  it("sets document title to passed title", () => {
    renderHook(() =>
      usePageMetadata({
        title: "Test title",
      }),
    );

    expect(document.title).toEqual("Test title");
  });

  it("sets document description to passed description", () => {
    renderHook(() =>
      usePageMetadata({
        description: "Test description",
      }),
    );

    // eslint-disable-next-line testing-library/no-node-access
    const metaDescription = document.head.querySelector(
      'meta[name="description"]',
    );

    expect(metaDescription).toHaveAttribute("content", "Test description");
  });

  it("sets description for existing meta tag", () => {
    const metaDescription = document.createElement("meta");
    metaDescription.setAttribute("name", "description");
    document.head.appendChild(metaDescription);

    renderHook(() =>
      usePageMetadata({
        description: "Test description",
      }),
    );

    expect(metaDescription).toHaveAttribute("content", "Test description");
  });
});
