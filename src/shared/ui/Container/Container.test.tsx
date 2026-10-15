import { render, screen } from "@/test-utils/test-utils";
import Container from "./Container";

describe("Container", () => {
  it("renders without breaking", () => {
    render(<Container width="xs" />);
  });

  it("renders passed content", () => {
    render(
      <Container width="xs">
        <div>Content</div>
      </Container>,
    );

    const content = screen.getByText("Content");

    expect(content).toBeInTheDocument();
  });
});
