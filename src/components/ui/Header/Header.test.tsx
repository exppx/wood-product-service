import { act, render, screen } from "@/test-utils/test-utils";
import Header from "./Header";

vi.mock("./SideMenu/SideMenu", () => ({
  default: () => <div>Side menu</div>,
}));

describe("Header", () => {
  it("renders without breaking", () => {
    render(<Header />);
  });

  it("has no background color if page is not scrolled", () => {
    render(<Header />);

    const headerEl = screen.getByTestId("header");

    expect(headerEl.className).not.toContain("header_filled");
  });

  it("becomes filled if page is scrolled", () => {
    const { rerender } = render(<Header />);
    const headerEl = screen.getByTestId("header");

    window.scrollY = 100;
    act(() => {
      window.dispatchEvent(new Event("scroll"));
    });
    rerender(<Header />);

    expect(headerEl.className).toContain("header_filled");
  });

  it("becomes not filled if page is scrolled back to the top", () => {
    const { rerender } = render(<Header />);
    const headerEl = screen.getByTestId("header");

    window.scrollY = 100;
    act(() => {
      window.dispatchEvent(new Event("scroll"));
    });
    rerender(<Header />);

    window.scrollY = 0;
    act(() => {
      window.dispatchEvent(new Event("scroll"));
    });
    rerender(<Header />);

    expect(headerEl.className).not.toContain("header_filled");
  });
});
