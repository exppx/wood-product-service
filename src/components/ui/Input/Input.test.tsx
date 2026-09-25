import { render, screen } from "@/test-utils/test-utils";
import userEvent from "@testing-library/user-event";
import Input from "./Input";

describe("Input", () => {
  it("renders without breaking", () => {
    render(<Input />);

    const input = screen.getByRole("textbox");

    expect(input).toBeInTheDocument();
  });

  it("shows text on input", async () => {
    const user = userEvent.setup();
    render(<Input />);

    const input = screen.getByRole("textbox");
    await user.type(input, "test");

    expect(input).toHaveValue("test");
  });

  it("deletes text on clear", async () => {
    const user = userEvent.setup();
    render(<Input />);

    const input = screen.getByRole("textbox");
    await user.type(input, "test");

    expect(input).toHaveValue("test");

    await user.clear(input);

    expect(input).toHaveValue("");
  });

  it("has error class if isError is true", () => {
    render(<Input isError={true} />);

    const input = screen.getByRole("textbox");

    expect(input.className).toContain("input_invalid");
  });

  it("does not have error class if isError is false", () => {
    render(<Input isError={false} />);

    const input = screen.getByRole("textbox");

    expect(input.className).not.toContain("input_invalid");
  });
});
