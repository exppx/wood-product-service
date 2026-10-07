import { render, screen } from "@/test-utils/test-utils";
import { useMedia } from "@/shared/lib/hooks";
import { MAP_HEIGHTS } from "./ContactsSection.config";
import ContactsSection from "./ContactsSection";

vi.mock("@/shared/lib/hooks", () => ({
  useMedia: vi.fn(),
}));

describe("ContactsSection", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useMedia).mockReturnValue({
      isMobile: false,
      isTablet: false,
      isDesktop: true,
    });
  });

  it("renders without breaking", () => {
    render(<ContactsSection />);

    const heading = screen.getByRole("heading");

    expect(heading).toBeInTheDocument();
  });

  it("renders contacts", () => {
    render(<ContactsSection />);

    const phone = screen.getByText("ContactsSection.contacts.phone.value");
    const address = screen.getByText("ContactsSection.contacts.address.value");

    expect(phone).toBeInTheDocument();
    expect(address).toBeInTheDocument();
  });

  it("renders map", () => {
    render(<ContactsSection />);

    const map = screen.getByTestId("map");

    expect(map).toBeInTheDocument();
  });

  it("renders map with proper size on mobile", () => {
    vi.mocked(useMedia).mockReturnValue({
      isMobile: true,
      isTablet: false,
      isDesktop: false,
    });
    render(<ContactsSection />);

    const map = screen.getByTestId("map");

    expect(map).toHaveAttribute("height", MAP_HEIGHTS.mobile);
  });

  it("renders map with proper size on tablet", () => {
    vi.mocked(useMedia).mockReturnValue({
      isMobile: false,
      isTablet: true,
      isDesktop: false,
    });
    render(<ContactsSection />);

    const map = screen.getByTestId("map");

    expect(map).toHaveAttribute("height", MAP_HEIGHTS.tablet);
  });

  it("renders map with proper size on desktop", () => {
    vi.mocked(useMedia).mockReturnValue({
      isMobile: false,
      isTablet: false,
      isDesktop: true,
    });
    render(<ContactsSection />);

    const map = screen.getByTestId("map");

    expect(map).toHaveAttribute("height", MAP_HEIGHTS.desktop);
  });
});
