import { render, screen } from "@/test-utils/test-utils";
import type { MediaState } from "@/hooks/useMedia/useMedia";
import useMedia from "@/hooks/useMedia/useMedia";
import SideMenu from "./SideMenu";
import { SIDE_MENU_ID } from "./SideMenu.config";
import userEvent from "@testing-library/user-event";

vi.mock("@/hooks/useMedia/useMedia", () => ({
  default: vi.fn(),
}));

describe("SideMenu", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  function customRender(
    mediaState: MediaState = {
      isDesktop: true,
      isMobile: false,
      isTablet: false,
    },
  ) {
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

  it("opens side menu on burger button click", async () => {
    const { user, sidePanel, burgerButton } = customRender({
      isDesktop: false,
      isMobile: true,
      isTablet: false,
    });

    await user.click(burgerButton);

    expect(sidePanel.className).toContain("side-menu__panel_active");
  });

  it("closes side menu on close button click", async () => {
    const { user, sidePanel, burgerButton, closeButton } = customRender({
      isDesktop: false,
      isMobile: true,
      isTablet: false,
    });

    await user.click(burgerButton);
    await user.click(closeButton);

    expect(sidePanel.className).not.toContain("side-menu__panel_active");
  });

  it("closes side menu on navigation link click", async () => {
    const { user, sidePanel, burgerButton, links } = customRender({
      isDesktop: false,
      isMobile: true,
      isTablet: false,
    });

    await user.click(burgerButton);
    await user.click(links[0]);

    expect(sidePanel.className).not.toContain("side-menu__panel_active");
  });

  describe("inert", () => {
    it("makes side panel inert on mobile if closed", () => {
      const { sidePanel } = customRender({
        isDesktop: false,
        isMobile: true,
        isTablet: false,
      });

      expect(sidePanel).toHaveAttribute("inert");
    });

    it("makes side panel not inert on mobile if opened", async () => {
      const { user, sidePanel, burgerButton } = customRender({
        isDesktop: false,
        isMobile: true,
        isTablet: false,
      });

      await user.click(burgerButton);

      expect(sidePanel).not.toHaveAttribute("inert");
    });

    it("makes side panel inert on tablet if closed", () => {
      const { sidePanel } = customRender({
        isDesktop: false,
        isMobile: false,
        isTablet: true,
      });

      expect(sidePanel).toHaveAttribute("inert");
    });

    it("makes side panel not inert on tablet if opened", async () => {
      const { user, sidePanel, burgerButton } = customRender({
        isDesktop: false,
        isMobile: false,
        isTablet: true,
      });

      await user.click(burgerButton);

      expect(sidePanel).not.toHaveAttribute("inert");
    });

    it("makes side panel not inert on desktop", () => {
      const { sidePanel } = customRender({
        isDesktop: true,
        isMobile: false,
        isTablet: false,
      });

      expect(sidePanel).not.toHaveAttribute("inert");
    });
  });

  describe("aria", () => {
    it("gives burger and close buttons accessible names", () => {
      const { burgerButton, closeButton } = customRender({
        isDesktop: false,
        isMobile: true,
        isTablet: false,
      });

      expect(burgerButton).toHaveAccessibleName();
      expect(closeButton).toHaveAccessibleName();
    });

    it("sets burger button aria-expanded attribute to 'false' if panel is closed", () => {
      const { burgerButton } = customRender({
        isDesktop: false,
        isMobile: true,
        isTablet: false,
      });

      expect(burgerButton).toHaveAttribute("aria-expanded", "false");
    });

    it("sets burger button aria-expanded attribute to 'true' if panel is opened", async () => {
      const { user, burgerButton } = customRender({
        isDesktop: false,
        isMobile: false,
        isTablet: true,
      });

      await user.click(burgerButton);

      expect(burgerButton).toHaveAttribute("aria-expanded", "true");
    });

    it("sets close button aria-expanded attribute to 'false' if panel is closed", () => {
      const { closeButton } = customRender({
        isDesktop: false,
        isMobile: true,
        isTablet: false,
      });

      expect(closeButton).toHaveAttribute("aria-expanded", "false");
    });

    it("sets close button aria-expanded attribute to 'true' if panel is opened", async () => {
      const { user, burgerButton, closeButton } = customRender({
        isDesktop: false,
        isMobile: false,
        isTablet: true,
      });

      await user.click(burgerButton);

      expect(closeButton).toHaveAttribute("aria-expanded", "true");
    });
  });
});
