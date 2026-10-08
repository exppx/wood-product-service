import { render, screen } from "@/test-utils/test-utils";
import Hero from "./Hero";

describe("Hero", () => {
  it("renders without breaking", () => {
    render(<Hero />);

    const heading = screen.getByRole("heading");

    expect(heading).toBeInTheDocument();
  });

  it("renders main heading", () => {
    render(<Hero />);

    const heading = screen.getByRole("heading");

    expect(heading).toHaveTextContent("Hero.title");
  });

  it("renders background image", () => {
    render(<Hero />);

    const image = screen.getByRole("img", { name: "Hero.imageAlt" });

    expect(image).toBeInTheDocument();
  });

  it("renders call to action link-button", () => {
    render(<Hero />);

    const linkButton = screen.getByRole("link");

    expect(linkButton).toBeInTheDocument();
  });
});
