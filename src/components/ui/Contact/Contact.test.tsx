import { render, screen } from "@/test-utils/test-utils";
import Contact from "./Contact";

const MockIcon = () => <svg data-testid="icon"></svg>;
const mockContact = "+420 000 000 000";

describe("Contact", () => {
  it("renders without breaking", () => {
    render(<Contact Icon={MockIcon} contact={mockContact} />);
  });

  it("renders passed icon", () => {
    render(<Contact Icon={MockIcon} contact={mockContact} />);

    const icon = screen.getByTestId("icon");

    expect(icon).toBeInTheDocument();
  });

  it("renders passed contact", () => {
    render(<Contact Icon={MockIcon} contact={mockContact} />);

    const contact = screen.getByText(mockContact);

    expect(contact).toBeInTheDocument();
  });
});
