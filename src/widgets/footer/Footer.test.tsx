import { render, screen } from "@/test-utils/test-utils";
import { CONTACTS } from "./model";
import Footer from "./Footer";

vi.mock("@/shared/ui", async (importOriginal) => {
  const original = await importOriginal<typeof import("@/shared/ui")>();

  return {
    ...original,
    Logo: () => <div data-testid="logo">Logo</div>,
  };
});

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
