import { render, screen } from "@/test-utils/test-utils";
import userEvent from "@testing-library/user-event";
import type { Theme } from "@/types/theme";
import useTheme from "@/hooks/useTheme/useTheme";
import ToggleThemeButton from "./ToggleThemeButton";

vi.mock("@/hooks/useTheme/useTheme");

describe("ToggleThemeButton", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  function customRender(currentTheme: Theme = "dark") {
    const mockToggleTheme = vi.fn();

    vi.mocked(useTheme).mockImplementation(() => [
      currentTheme,
      mockToggleTheme,
    ]);

    const utils = render(<ToggleThemeButton />);

    const user = userEvent.setup();

    const button = screen.getByRole("button");

    return {
      ...utils,
      mockToggleTheme,
      user,
      button,
    };
  }

  it("renders without breaking", () => {
    customRender();
  });

  it("calls 'toggleLocale' on click", async () => {
    const { mockToggleTheme, user, button } = customRender();

    await user.click(button);

    expect(mockToggleTheme).toHaveBeenCalledOnce();
  });

  it("has accessible name", () => {
    const { button } = customRender();

    expect(button).toHaveAccessibleName();
  });

  it("has 'light' in aria-label if theme is 'dark'", () => {
    const { button } = customRender("dark");

    expect(button.ariaLabel).toContain("ToggleThemeButton.light");
  });

  it("has 'dark' in aria-label if theme is 'light'", () => {
    const { button } = customRender("light");

    expect(button.ariaLabel).toContain("ToggleThemeButton.dark");
  });
});
