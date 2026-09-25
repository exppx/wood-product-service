import { render, screen } from "@/test-utils/test-utils";
import useMedia from "@/hooks/useMedia/useMedia";
import QuestionsSection from "./QuestionsSection";

vi.mock("@/hooks/useMedia/useMedia", () => ({
  default: vi.fn(),
}));

vi.mock("./QuestionsForm/QuestionsForm", () => ({
  default: () => (
    <form data-testid="form">
      <button>Submit</button>
    </form>
  ),
}));

describe("QuestionsSection", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("renders without breaking", () => {
    vi.mocked(useMedia).mockReturnValue({
      isDesktop: true,
      isTablet: false,
      isMobile: false,
    });
    render(<QuestionsSection />);

    const title = screen.getByRole("heading");

    expect(title).toBeInTheDocument();
  });

  it("renders questions form", () => {
    vi.mocked(useMedia).mockReturnValue({
      isDesktop: true,
      isTablet: false,
      isMobile: false,
    });
    render(<QuestionsSection />);

    const form = screen.getByTestId("form");

    expect(form).toBeInTheDocument();
  });

  it("renders image on desktop", () => {
    vi.mocked(useMedia).mockReturnValue({
      isDesktop: true,
      isTablet: false,
      isMobile: false,
    });
    render(<QuestionsSection />);

    const image = screen.getByRole("img");

    expect(image).toBeInTheDocument();
  });

  it("does not render image on tablet", () => {
    vi.mocked(useMedia).mockReturnValue({
      isDesktop: false,
      isTablet: true,
      isMobile: false,
    });
    render(<QuestionsSection />);

    const image = screen.queryByRole("img");

    expect(image).not.toBeInTheDocument();
  });

  it("does not render image on mobile", () => {
    vi.mocked(useMedia).mockReturnValue({
      isDesktop: false,
      isTablet: false,
      isMobile: true,
    });
    render(<QuestionsSection />);

    const image = screen.queryByRole("img");

    expect(image).not.toBeInTheDocument();
  });
});
