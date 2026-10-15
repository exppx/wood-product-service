import { render, screen } from "@/test-utils/test-utils";
import AdvantagesSection from "./AdvantagesSection";

describe("AdvantagesSection", () => {
  it("renders without breaking", () => {
    render(<AdvantagesSection />);

    const image = screen.getByRole("img");

    expect(image).toBeInTheDocument();
  });

  it("renders advantages list", () => {
    render(<AdvantagesSection />);

    const advantages = screen.getAllByRole("listitem");

    expect(advantages.length).toBeGreaterThan(0);
  });

  it("renders call to action button", () => {
    render(<AdvantagesSection />);

    const linkButton = screen.getByRole("link");

    expect(linkButton).toBeInTheDocument();
  });
});
