import { render, screen } from "@/test-utils/test-utils";
import userEvent from "@testing-library/user-event";
import type { ComponentProps } from "react";
import type { MediaState } from "@/shared/types/media";
import { useMedia } from "@/shared/lib/hooks";
import { SIDE_MENU_ID } from "./SideMenu.config";
import SideMenu from "./SideMenu";

vi.mock("@/shared/lib/hooks", () => ({
  useMedia: vi.fn(),
}));

vi.mock("../BurgerButton", () => ({
  BurgerButton: (props: ComponentProps<"button">) => (
    <button type="button" {...props} />
  ),
}));

vi.mock("../CloseSideMenuButton", () => ({
  CloseSideMenuButton: (props: ComponentProps<"button">) => (
    <button type="button" {...props} />
  ),
}));

vi.mock("../Navigation", () => ({
  Navigation: ({ onClose }: { onClose: () => void }) => (
    <nav>
      <a
        href="/mock-link"
        onClick={(event) => {
          event.preventDefault();
          onClose();
        }}
      >
        mock link
      </a>
    </nav>
  ),
}));

vi.mock("@/features/toggle-theme", () => ({
  ToggleThemeButton: () => <div data-testid="toggle-theme-button" />,
}));

vi.mock("@/features/toggle-locale", () => ({
  ToggleLocaleButton: () => <div data-testid="toggle-locale-button" />,
}));

const DESKTOP: MediaState = {
  isDesktop: true,
  isMobile: false,
  isTablet: false,
};

const MOBILE: MediaState = {
  isDesktop: false,
  isMobile: true,
  isTablet: false,
};

const TABLET: MediaState = {
  isDesktop: false,
  isMobile: false,
  isTablet: true,
};

describe("SideMenu", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  function customRender(mediaState: MediaState = DESKTOP) {
    vi.mocked(useMedia).mockReturnValue(mediaState);

    const utils = render(<SideMenu />);

    const user = userEvent.setup();

    const sidePanel = screen.getByTestId(SIDE_MENU_ID);
    const burgerButton = screen.getByRole("button", {
      name: "SideMenu.burgerButtonLabel",
    });
    const closeButton = screen.getByRole("button", {
      name: "SideMenu.closeButtonLabel",
    });
    const links = screen.getAllByRole("link");

    return {
      ...utils,
      user,
      sidePanel,
      burgerButton,
      closeButton,
      links,
    };
  }

  it("renders without breaking", () => {
    customRender();
  });

  it("renders child components", () => {
    const { burgerButton, closeButton, links } = customRender();

    expect(burgerButton).toBeInTheDocument();
    expect(closeButton).toBeInTheDocument();
    expect(links).toHaveLength(1);
    expect(screen.getByTestId("toggle-theme-button")).toBeInTheDocument();
    expect(screen.getByTestId("toggle-locale-button")).toBeInTheDocument();
  });

  it("opens side menu on burger button click", async () => {
    const { user, sidePanel, burgerButton } = customRender(MOBILE);

    await user.click(burgerButton);

    expect(sidePanel.className).toContain("side-menu__panel_active");
  });

  it("closes side menu on close button click", async () => {
    const { user, sidePanel, burgerButton, closeButton } = customRender(MOBILE);

    await user.click(burgerButton);
    await user.click(closeButton);

    expect(sidePanel.className).not.toContain("side-menu__panel_active");
  });

  it("closes side menu when navigation calls onClose", async () => {
    const { user, sidePanel, burgerButton, links } = customRender(MOBILE);

    await user.click(burgerButton);
    await user.click(links[0]);

    expect(sidePanel.className).not.toContain("side-menu__panel_active");
  });

  it("connects buttons to the side panel via aria-controls", () => {
    const { burgerButton, closeButton } = customRender(MOBILE);

    expect(burgerButton).toHaveAttribute("aria-controls", SIDE_MENU_ID);
    expect(closeButton).toHaveAttribute("aria-controls", SIDE_MENU_ID);
  });

  describe("inert", () => {
    it("makes side panel inert on mobile if closed", () => {
      const { sidePanel } = customRender(MOBILE);

      expect(sidePanel).toHaveAttribute("inert");
    });

    it("makes side panel not inert on mobile if opened", async () => {
      const { user, sidePanel, burgerButton } = customRender(MOBILE);

      await user.click(burgerButton);

      expect(sidePanel).not.toHaveAttribute("inert");
    });

    it("makes side panel inert on tablet if closed", () => {
      const { sidePanel } = customRender(TABLET);

      expect(sidePanel).toHaveAttribute("inert");
    });

    it("makes side panel not inert on tablet if opened", async () => {
      const { user, sidePanel, burgerButton } = customRender(TABLET);

      await user.click(burgerButton);

      expect(sidePanel).not.toHaveAttribute("inert");
    });

    it("makes side panel not inert on desktop", () => {
      const { sidePanel } = customRender(DESKTOP);

      expect(sidePanel).not.toHaveAttribute("inert");
    });
  });

  describe("aria", () => {
    it("gives burger and close buttons accessible names", () => {
      const { burgerButton, closeButton } = customRender(MOBILE);

      expect(burgerButton).toHaveAccessibleName();
      expect(closeButton).toHaveAccessibleName();
    });

    it("sets burger button aria-expanded attribute to 'false' if panel is closed", () => {
      const { burgerButton } = customRender(MOBILE);

      expect(burgerButton).toHaveAttribute("aria-expanded", "false");
    });

    it("sets burger button aria-expanded attribute to 'true' if panel is opened", async () => {
      const { user, burgerButton } = customRender(TABLET);

      await user.click(burgerButton);

      expect(burgerButton).toHaveAttribute("aria-expanded", "true");
    });

    it("sets close button aria-expanded attribute to 'false' if panel is closed", () => {
      const { closeButton } = customRender(MOBILE);

      expect(closeButton).toHaveAttribute("aria-expanded", "false");
    });

    it("sets close button aria-expanded attribute to 'true' if panel is opened", async () => {
      const { user, burgerButton, closeButton } = customRender(TABLET);

      await user.click(burgerButton);

      expect(closeButton).toHaveAttribute("aria-expanded", "true");
    });
  });
});
