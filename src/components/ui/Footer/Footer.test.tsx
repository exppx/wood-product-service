import { render, screen } from "@/test-utils/test-utils";
import { CONTACTS } from "./Footer.config";
import Footer from "./Footer";

vi.mock("@/components/ui/Logo/Logo", () => ({
  default: () => <div data-testid="logo">Logo</div>,
}));

describe("Footer", () => {
  it("renders without breaking", () => {
    render(<Footer />);

    const footer = screen.getByRole("contentinfo");

    expect(footer).toBeInTheDocument();
  });

  it("renders logo", () => {
    render(<Footer />);

    const logo = screen.getByTestId("logo");

    expect(logo).toBeInTheDocument();
  });

  it("renders contacts", () => {
    render(<Footer />);

    CONTACTS.forEach(({ contact }) => {
      const contactEl = screen.getByText(contact);

      expect(contactEl).toBeInTheDocument();
    });
  });
});
