import { render, screen } from "@/test-utils/test-utils";
import OurWorksSection from "./OurWorksSection";

vi.mock("@/components/ui/Carousel/Carousel", () => ({
  default: () => <div>Carousel</div>,
}));

describe("OurWorksSection", () => {
  it("renders without breaking", () => {
    render(<OurWorksSection />);

    const heading = screen.getByRole("heading");

    expect(heading).toBeInTheDocument();
  });

  it("renders carousel", () => {
    render(<OurWorksSection />);

    const carousel = screen.getByText("Carousel");

    expect(carousel).toBeInTheDocument();
  });
});
