import { render, screen } from "@/test-utils/test-utils";
import FromResultMessage from "./FromResultMessage";

describe("FromResultMessage", () => {
  it("renders without breaking", () => {
    render(<FromResultMessage result="success" message="test_message" />);

    const status = screen.getByRole("status");

    expect(status).toBeInTheDocument();
  });

  it("renders empty status element if result is null", () => {
    render(<FromResultMessage result={null} message="test_message" />);

    const status = screen.getByRole("status");

    expect(status).toBeEmptyDOMElement();
  });

  it("renders passed message if result is not null", () => {
    render(<FromResultMessage result="success" message="test_message" />);

    const message = screen.getByText("test_message");

    expect(message).toBeInTheDocument();
  });
});
