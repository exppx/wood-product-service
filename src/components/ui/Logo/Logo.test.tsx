import { render, screen } from "@/test-utils/test-utils";
import Logo from "./Logo";

describe("Logo", () => {
  it("renders without breaking", () => {
    render(<Logo />);
  });

  it("renders link to the home page", () => {
    render(<Logo />);

    const link = screen.getByRole("link");

    expect(link).toHaveAttribute("href", "/");
  });
});
