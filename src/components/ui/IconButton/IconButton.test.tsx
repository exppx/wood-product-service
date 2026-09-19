import { render, screen } from "@/test-utils/test-utils";
import userEvent from "@testing-library/user-event";
import IconButton from "./IconButton";

describe("IconButton", () => {
  it("renders without breaking", () => {
    render(<IconButton Icon={<span>test</span>} />);
  });

  it("renders passed icon", () => {
    render(<IconButton Icon={<span>test</span>} />);

    expect(screen.getByText("test")).toBeInTheDocument();
  });

  it("calls onClick handler on click", async () => {
    const fn = vi.fn();
    const user = userEvent.setup();
    render(<IconButton onClick={fn} Icon={<span>test</span>} />);

    const iconButton = screen.getByRole("button");
    await user.click(iconButton);

    expect(fn).toHaveBeenCalledOnce();
  });
});
