import { render, screen } from "@/test-utils/test-utils";
import userEvent from "@testing-library/user-event";
import useLocale from "@/hooks/useLocale/useLocale";
import ToggleLocaleButton from "./ToggleLocaleButton";

vi.mock("@/hooks/useLocale/useLocale");

describe("ToggleLocaleButton", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  function customRender() {
    const mockToggleLocale = vi.fn();
    const locale = "en";
    const nextLocale = "ru";

    vi.mocked(useLocale).mockImplementation(() => [
      locale,
      mockToggleLocale,
      nextLocale,
    ]);

    const utils = render(<ToggleLocaleButton />);

    const user = userEvent.setup();

    const button = screen.getByRole("button");

    return {
      ...utils,
      mockToggleLocale,
      user,
      button,
    };
  }

  it("renders without breaking", () => {
    customRender();
  });

  it("calls 'toggleLocale' on click", async () => {
    const { mockToggleLocale, user, button } = customRender();

    await user.click(button);

    expect(mockToggleLocale).toHaveBeenCalledOnce();
  });

  it("has accessible name", () => {
    const { button } = customRender();

    expect(button).toHaveAccessibleName();
  });
});
