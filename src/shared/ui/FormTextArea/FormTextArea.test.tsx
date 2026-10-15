import { render, screen } from "@/test-utils/test-utils";
import FormTextArea from "./FormTextArea";

describe("FormTextArea", () => {
  it("renders without breaking", () => {
    render(<FormTextArea label="test_label" name="test_name" />);

    const textarea = screen.getByRole("textbox");

    expect(textarea).toBeInTheDocument();
  });

  it("renders label", () => {
    render(<FormTextArea label="test_label" name="test_name" />);

    const label = screen.getByText("test_label");

    expect(label).toBeInTheDocument();
  });

  it("renders provided error message", () => {
    render(
      <FormTextArea label="test_label" name="test_name" error="test_error" />,
    );

    const error = screen.getByRole("alert");

    expect(error).toHaveTextContent("test_error");
  });

  it("does not render error message if no error provided", () => {
    const { rerender } = render(
      <FormTextArea label="test_label" name="test_name" error="test_error" />,
    );

    rerender(<FormTextArea label="test_label" name="test_name" error={null} />);

    const error = screen.queryByRole("alert");

    expect(error).not.toBeInTheDocument();
  });
});
