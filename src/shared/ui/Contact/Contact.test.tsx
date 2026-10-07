import { render, screen } from "@/test-utils/test-utils";
import Contact from "./Contact";

const MockIcon = () => <svg data-testid="icon"></svg>;
const mockContact = "+420 000 000 000";
const mockLabel = "test_label";

describe("Contact", () => {
  it("renders without breaking", () => {
    render(<Contact Icon={MockIcon} contact={mockContact} label={mockLabel} />);
  });

  it("renders passed icon", () => {
    render(<Contact Icon={MockIcon} contact={mockContact} label={mockLabel} />);

    const icon = screen.getByTestId("icon");

    expect(icon).toBeInTheDocument();
  });

  it("renders passed label", () => {
    render(<Contact Icon={MockIcon} contact={mockContact} label={mockLabel} />);

    const label = screen.getByText(mockLabel);

    expect(label).toBeInTheDocument();
  });

  it("renders passed contact", () => {
    render(<Contact Icon={MockIcon} contact={mockContact} label={mockLabel} />);

    const contact = screen.getByText(mockContact);

    expect(contact).toBeInTheDocument();
  });
});
