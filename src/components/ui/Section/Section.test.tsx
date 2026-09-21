import { render, screen } from "@/test-utils/test-utils";
import Section from "./Section";

describe("Section", () => {
  it("renders without breaking", () => {
    render(<Section></Section>);
  });

  it("renders passed children", () => {
    render(
      <Section>
        <div data-testid="test">Test div</div>
      </Section>,
    );

    const children = screen.getByTestId("test");

    expect(children).toBeInTheDocument();
  });

  it("receives passed className", () => {
    render(<Section className={"test-class"} data-testid="section"></Section>);

    const section = screen.getByTestId("section");

    expect(section.className).toContain("test-class");
  });
});
