import { render, screen } from "@/test-utils/test-utils";
import AboutSection from "./AboutSection";

describe("AboutSection", () => {
  it("renders without breaking", () => {
    render(<AboutSection />);

    const title = screen.getByRole("heading");

    expect(title).toBeInTheDocument();
  });

  it("renders 3 images", () => {
    render(<AboutSection />);

    const images = screen.getAllByRole("img");

    expect(images).toHaveLength(3);
  });

  it("renders title in h1 tag if isMainSection is true", () => {
    render(<AboutSection isMainSection={true} />);

    const title = screen.getByRole("heading", { level: 1 });

    expect(title).toBeInTheDocument();
  });
});
