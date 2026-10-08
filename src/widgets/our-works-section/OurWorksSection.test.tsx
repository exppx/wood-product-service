import { render, screen } from "@/test-utils/test-utils";
import OurWorksSection from "./OurWorksSection";

vi.mock("@/shared/ui", async (importOriginal) => {
  const original = await importOriginal<typeof import("@/shared/ui")>();

  return {
    ...original,
    Carousel: () => <div>Carousel</div>,
  };
});

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
