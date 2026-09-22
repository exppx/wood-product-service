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

  it("renders passed title", () => {
    render(<Section title="test_title"></Section>);

    const heading = screen.getByRole("heading");

    expect(heading).toHaveTextContent("test_title");
  });

  it("does not render heading if title is not provided", () => {
    render(<Section></Section>);

    const heading = screen.queryByRole("heading");

    expect(heading).not.toBeInTheDocument();
  });

  it("receives passed className", () => {
    render(<Section className={"test-class"} data-testid="section"></Section>);

    const section = screen.getByTestId("section");

    expect(section.className).toContain("test-class");
  });

  it("has proper class if titlePosition is set to 'right'", () => {
    render(<Section titlePosition="right" title="test_title"></Section>);

    const title = screen.getByRole("heading");

    expect(title.className).toContain("section__title_right");
  });
});
