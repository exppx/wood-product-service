import { render, screen } from "@/test-utils/test-utils";
import FormInput from "./FormInput";

describe("FormInput", () => {
  it("renders without breaking", () => {
    render(<FormInput label="test_label" name="test_name" />);

    const input = screen.getByRole("textbox");

    expect(input).toBeInTheDocument();
  });

  it("renders label", () => {
    render(<FormInput label="test_label" name="test_name" />);

    const label = screen.getByText("test_label");

    expect(label).toBeInTheDocument();
  });

  it("renders provided error message", () => {
    render(
      <FormInput label="test_label" name="test_name" error="test_error" />,
    );

    const error = screen.getByRole("alert");

    expect(error).toHaveTextContent("test_error");
  });

  it("does not render error message if no error provided", () => {
    const { rerender } = render(
      <FormInput label="test_label" name="test_name" error="test_error" />,
    );

    rerender(<FormInput label="test_label" name="test_name" error={null} />);

    const error = screen.queryByRole("alert");

    expect(error).not.toBeInTheDocument();
  });
});
