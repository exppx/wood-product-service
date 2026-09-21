import { render, screen } from "@/test-utils/test-utils";
import SectionFilled from "./SectionFilled";

describe("SectionFilled", () => {
  it("renders without breaking", () => {
    render(<SectionFilled position="right"></SectionFilled>);
  });

  it("renders passed children", () => {
    render(
      <SectionFilled position="right">
        <div data-testid="test">Test div</div>
      </SectionFilled>,
    );

    const children = screen.getByTestId("test");

    expect(children).toBeInTheDocument();
  });

  it("receives passed className", () => {
    render(
      <SectionFilled
        position="right"
        className={"test-class"}
        data-testid="section"
      ></SectionFilled>,
    );

    const section = screen.getByTestId("section");

    expect(section.className).toContain("test-class");
  });

  it("has a proper class if position is set to 'right'", () => {
    render(
      <SectionFilled
        position="right"
        className={"test-class"}
        data-testid="section"
      ></SectionFilled>,
    );

    const section = screen.getByTestId("section");

    expect(section.className).toContain("section-filled_right");
  });

  it("has a proper class if position is set to 'left'", () => {
    render(
      <SectionFilled
        position="left"
        className={"test-class"}
        data-testid="section"
      ></SectionFilled>,
    );

    const section = screen.getByTestId("section");

    expect(section.className).toContain("section-filled_left");
  });
});
