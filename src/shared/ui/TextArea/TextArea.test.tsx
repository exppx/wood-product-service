import { render, screen } from "@/test-utils/test-utils";
import userEvent from "@testing-library/user-event";
import TextArea from "./TextArea";

describe("TextArea", () => {
  it("renders without breaking", () => {
    render(<TextArea />);

    const textarea = screen.getByRole("textbox");

    expect(textarea).toBeInTheDocument();
  });

  it("shows text on input", async () => {
    const user = userEvent.setup();
    render(<TextArea />);

    const textarea = screen.getByRole("textbox");
    await user.type(textarea, "test");

    expect(textarea).toHaveValue("test");
  });

  it("deletes text on clear", async () => {
    const user = userEvent.setup();
    render(<TextArea />);

    const textarea = screen.getByRole("textbox");
    await user.type(textarea, "test");

    expect(textarea).toHaveValue("test");

    await user.clear(textarea);

    expect(textarea).toHaveValue("");
  });

  it("has error class if isError is true", () => {
    render(<TextArea isError={true} />);

    const textarea = screen.getByRole("textbox");

    expect(textarea.className).toContain("textarea_invalid");
  });

  it("does not have error class if isError is false", () => {
    render(<TextArea isError={false} />);

    const textarea = screen.getByRole("textbox");

    expect(textarea.className).not.toContain("textarea_invalid");
  });
});
