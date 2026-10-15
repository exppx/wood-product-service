import { render, screen } from "@/test-utils/test-utils";
import FormErrorMessage from "./FormErrorMessage";

describe("FormErrorMessage", () => {
  it("renders without breaking", () => {
    render(<FormErrorMessage message="test_message" />);
  });

  it("renders provided message", () => {
    render(<FormErrorMessage message="test_message" />);

    const text = screen.getByText("test_message");

    expect(text).toBeInTheDocument();
  });
});
