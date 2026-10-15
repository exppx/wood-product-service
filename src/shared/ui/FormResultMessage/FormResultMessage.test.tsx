import { render, screen } from "@/test-utils/test-utils";
import FormResultMessage from "./FormResultMessage";

describe("FormResultMessage", () => {
  it("renders without breaking", () => {
    render(<FormResultMessage result="success" message="test_message" />);

    const status = screen.getByRole("status");

    expect(status).toBeInTheDocument();
  });

  it("renders empty status element if result is null", () => {
    render(<FormResultMessage result={null} message="test_message" />);

    const status = screen.getByRole("status");

    expect(status).toBeEmptyDOMElement();
  });

  it("renders passed message if result is not null", () => {
    render(<FormResultMessage result="success" message="test_message" />);

    const message = screen.getByText("test_message");

    expect(message).toBeInTheDocument();
  });
});
