import { render, screen } from "@/test-utils/test-utils";
import { userEvent } from "@testing-library/user-event";
import BurgerButton from "./BurgerButton";

describe("BurgerButton", () => {
  it("renders without breaking", () => {
    render(<BurgerButton />);
  });

  it("calls onClick handler on click", async () => {
    const fn = vi.fn();
    const user = userEvent.setup();
    render(<BurgerButton onClick={fn} />);

    const burgerButton = screen.getByRole("button");
    await user.click(burgerButton);

    expect(fn).toHaveBeenCalledOnce();
  });
});
