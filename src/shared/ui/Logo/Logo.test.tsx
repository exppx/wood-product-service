import { render, screen } from "@/test-utils/test-utils";
import Logo from "./Logo";

describe("Logo", () => {
  it("renders without breaking", () => {
    render(<Logo color="light" />);
  });

  it("renders link to the home page", () => {
    render(<Logo color="light" />);

    const link = screen.getByRole("link");

    expect(link).toHaveAttribute("href", "/");
  });
});
