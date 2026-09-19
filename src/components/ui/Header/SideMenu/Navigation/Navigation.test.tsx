import { render, screen } from "@/test-utils/test-utils";
import { NAVIGATION_LINKS } from "./Navigation.config";
import Navigation from "./Navigation";
import userEvent from "@testing-library/user-event";
import LocationDisplay from "@/test-utils/LocationDisplay";

describe("Navigation", () => {
  it("renders without breaking", () => {
    render(<Navigation onClose={() => {}} />);
  });

  it("renders links", () => {
    render(<Navigation onClose={() => {}} />);

    expect(screen.getAllByRole("link")).toHaveLength(NAVIGATION_LINKS.length);
  });

  it("calls onClose on link click", async () => {
    const mockOnClose = vi.fn();
    const user = userEvent.setup();
    render(<Navigation onClose={mockOnClose} />);

    const links = screen.getAllByRole("link");
    await user.click(links[0]);

    expect(mockOnClose).toHaveBeenCalledOnce();
  });

  it("redirects on link click", async () => {
    const user = userEvent.setup();
    render(
      <>
        <Navigation onClose={() => {}} />
        <LocationDisplay />
      </>,
    );

    const location = screen.getByTestId("location");
    const link = screen.getByRole("link", {
      name: NAVIGATION_LINKS[0].name,
    });
    await user.click(link);

    expect(location).toHaveTextContent(NAVIGATION_LINKS[0].url);
  });
});
