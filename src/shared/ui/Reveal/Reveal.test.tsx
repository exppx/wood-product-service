import { act, render, screen } from "@/test-utils/test-utils";
import {
  DEFAULT_REVEAL_BOTTOM_ROOT_MARGIN,
  DEFAULT_REVEAL_DELAY,
  REVEAL_THRESHOLD,
} from "./Reveal.config";
import Reveal from "./Reveal";

class MockIntersectionObserver {
  static instances: MockIntersectionObserver[] = [];

  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
  takeRecords = vi.fn(() => []);

  private callback: IntersectionObserverCallback;
  public options?: IntersectionObserverInit;

  constructor(
    callback: IntersectionObserverCallback,
    options?: IntersectionObserverInit,
  ) {
    this.callback = callback;
    this.options = options;
    MockIntersectionObserver.instances.push(this);
  }

  trigger(isIntersecting: boolean) {
    this.callback(
      [{ isIntersecting } as IntersectionObserverEntry],
      this as unknown as IntersectionObserver,
    );
  }
}

const getLastObserver = () => MockIntersectionObserver.instances.at(-1)!;

const getWrapper = () =>
  screen.getByText("Content").parentElement as HTMLElement;

const renderReveal = (props: React.ComponentProps<typeof Reveal> = {}) =>
  render(
    <Reveal {...props}>
      <p>Content</p>
    </Reveal>,
  );

describe("Reveal", () => {
  beforeEach(() => {
    MockIntersectionObserver.instances = [];
    vi.stubGlobal("IntersectionObserver", MockIntersectionObserver);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("renders children", () => {
    renderReveal();

    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  it("initially hidden: has no reveal_revealed class", () => {
    renderReveal();

    expect(getWrapper().className).toContain("reveal");
    expect(getWrapper().className).not.toContain("reveal_revealed");
  });

  it("observes wrapper using IntersectionObserver", () => {
    renderReveal();

    expect(MockIntersectionObserver.instances).toHaveLength(1);
    expect(getLastObserver().observe).toHaveBeenCalledExactlyOnceWith(
      getWrapper(),
    );
  });

  describe("observer options", () => {
    it("uses default values", () => {
      renderReveal();

      expect(getLastObserver().options).toEqual({
        threshold: REVEAL_THRESHOLD,
        rootMargin: `0px 0px ${DEFAULT_REVEAL_BOTTOM_ROOT_MARGIN} 0px`,
      });
    });

    it("uses custom bottomRootMargin", () => {
      renderReveal({ bottomRootMargin: "-25%" });

      expect(getLastObserver().options?.rootMargin).toBe("0px 0px -25% 0px");
    });
  });

  describe("appearance in the viewport", () => {
    it("adds class reveal_revealed, when element intersects", () => {
      renderReveal();

      act(() => getLastObserver().trigger(true));

      expect(getWrapper().className).toContain("reveal_revealed");
    });

    it("does not add class reveal_revealed, if element does not intersect", () => {
      renderReveal();

      act(() => getLastObserver().trigger(false));

      expect(getWrapper().className).not.toContain("reveal_revealed");
      expect(getLastObserver().disconnect).not.toHaveBeenCalled();
    });

    it("disconnects observer after first trigger", () => {
      renderReveal();
      const observer = getLastObserver();

      act(() => observer.trigger(true));

      expect(observer.disconnect).toHaveBeenCalled();
    });
  });

  describe("transition-delay", () => {
    it("uses default transition delay", () => {
      renderReveal();

      expect(getWrapper()).toHaveStyle(
        `transition-delay: ${DEFAULT_REVEAL_DELAY}ms`,
      );
    });

    it("uses custom transition delay", () => {
      renderReveal({ delay: 300 });

      expect(getWrapper()).toHaveStyle("transition-delay: 300ms");
    });
  });

  describe("lifecycle", () => {
    it("disconnects observer on unmount", () => {
      const { unmount } = renderReveal();
      const observer = getLastObserver();

      unmount();

      expect(observer.disconnect).toHaveBeenCalled();
    });

    it("recreates observer on bottomRootMargin change", () => {
      const { rerender } = renderReveal({ bottomRootMargin: "-10%" });
      const first = getLastObserver();

      rerender(
        <Reveal bottomRootMargin="-30%">
          <p>Content</p>
        </Reveal>,
      );

      expect(first.disconnect).toHaveBeenCalled();
      expect(MockIntersectionObserver.instances).toHaveLength(2);
      expect(getLastObserver().options?.rootMargin).toBe("0px 0px -30% 0px");
    });

    it("does not recreate observer on delay change", () => {
      const { rerender } = renderReveal({ delay: 100 });

      rerender(
        <Reveal delay={500}>
          <p>Content</p>
        </Reveal>,
      );

      expect(MockIntersectionObserver.instances).toHaveLength(1);
      expect(getWrapper()).toHaveStyle("transition-delay: 500ms");
    });
  });
});
