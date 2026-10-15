import { render, screen } from "@/test-utils/test-utils";
import { userEvent } from "@testing-library/user-event";
import CloseSideMenuButton from "./CloseSideMenuButton";

describe("CloseSideMenuButton", () => {
  it("renders without breaking", () => {
    render(<CloseSideMenuButton />);
  });

  it("calls onClick handler on click", async () => {
    const fn = vi.fn();
    const user = userEvent.setup();
    render(<CloseSideMenuButton onClick={fn} />);

    const burgerButton = screen.getByRole("button");
    await user.click(burgerButton);

    expect(fn).toHaveBeenCalledOnce();
  });
});
