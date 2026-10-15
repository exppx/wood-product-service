import { render, screen } from "@/test-utils/test-utils";
import Button from "./Button";
import userEvent from "@testing-library/user-event";

describe("Button", () => {
  it("renders without breaking", () => {
    render(<Button />);

    const button = screen.getByRole("button");

    expect(button).toBeInTheDocument();
  });

  it("renders passed children", () => {
    render(
      <Button>
        <span data-testid="children">Test</span>
      </Button>,
    );

    const children = screen.getByTestId("children");

    expect(children).toBeInTheDocument();
  });

  it("receives passed className", () => {
    render(<Button className="test-class" />);

    const button = screen.getByRole("button");

    expect(button.className).toContain("test-class");
  });

  it("calls passed onClick handler on click", async () => {
    const user = userEvent.setup();
    const mockOnClick = vi.fn();
    render(<Button onClick={mockOnClick} />);

    const button = screen.getByRole("button");
    await user.click(button);

    expect(mockOnClick).toHaveBeenCalledOnce();
  });
});
