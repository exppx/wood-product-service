import { act, render, screen } from "@/test-utils/test-utils";
import Header from "./Header";

vi.mock("./ui", () => ({
  SideMenu: () => <div data-testid="side-menu">Side menu</div>,
}));

vi.mock("@/shared/ui", async (importOriginal) => {
  const original = await importOriginal<typeof import("@/shared/ui")>();

  return {
    ...original,
    Logo: ({ color }: { color: string }) => (
      <div data-testid="logo" data-color={color} />
    ),
  };
});

function setScrollY(value: number) {
  Object.defineProperty(window, "scrollY", {
    value,
    writable: true,
    configurable: true,
  });

  act(() => {
    window.dispatchEvent(new Event("scroll"));
  });
}

describe("Header", () => {
  afterEach(() => {
    Object.defineProperty(window, "scrollY", {
      value: 0,
      writable: true,
      configurable: true,
    });
    vi.restoreAllMocks();
  });

  it("renders header with side menu", () => {
    render(<Header />);

    expect(screen.getByTestId("header")).toBeInTheDocument();
    expect(screen.getByTestId("side-menu")).toBeInTheDocument();
  });

  describe("background", () => {
    it("is not filled if page is not scrolled", () => {
      render(<Header />);

      expect(screen.getByTestId("header").className).not.toContain(
        "header_filled",
      );
    });

    it("is filled if isFilled is true", () => {
      render(<Header isFilled />);

      expect(screen.getByTestId("header").className).toContain("header_filled");
    });

    it("becomes filled once page is scrolled", () => {
      render(<Header />);

      setScrollY(100);

      expect(screen.getByTestId("header").className).toContain("header_filled");
    });

    it("becomes filled on the smallest scroll offset", () => {
      render(<Header />);

      setScrollY(1);

      expect(screen.getByTestId("header").className).toContain("header_filled");
    });

    it("becomes not filled when page is scrolled back to the top", () => {
      render(<Header />);

      setScrollY(100);
      setScrollY(0);

      expect(screen.getByTestId("header").className).not.toContain(
        "header_filled",
      );
    });

    it("stays filled when isFilled is true and page is at the top", () => {
      render(<Header isFilled />);

      setScrollY(100);
      setScrollY(0);

      expect(screen.getByTestId("header").className).toContain("header_filled");
    });
  });

  describe("logo", () => {
    it("has light color by default", () => {
      render(<Header />);

      expect(screen.getByTestId("logo")).toHaveAttribute("data-color", "light");
    });

    it("has adaptive color if isFilled is true", () => {
      render(<Header isFilled />);

      expect(screen.getByTestId("logo")).toHaveAttribute(
        "data-color",
        "adaptive",
      );
    });

    it("switches to adaptive color when page is scrolled", () => {
      render(<Header />);

      setScrollY(100);

      expect(screen.getByTestId("logo")).toHaveAttribute(
        "data-color",
        "adaptive",
      );
    });
  });

  describe("scroll listener", () => {
    it("subscribes to scroll on mount", () => {
      const addSpy = vi.spyOn(window, "addEventListener");

      render(<Header />);

      expect(addSpy).toHaveBeenCalledWith("scroll", expect.any(Function));
    });

    it("unsubscribes from scroll on unmount", () => {
      const removeSpy = vi.spyOn(window, "removeEventListener");

      const { unmount } = render(<Header />);
      unmount();

      expect(removeSpy).toHaveBeenCalledWith("scroll", expect.any(Function));
    });
  });
});
