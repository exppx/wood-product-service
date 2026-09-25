import { render, screen } from "@/test-utils/test-utils";
import SubmitButton from "./SubmitButton";

vi.mock("@/components/ui/Spinner/Spinner", () => ({
  default: () => <div data-testid="spinner"></div>,
}));

describe("SubmitButton", () => {
  it("renders without breaking", () => {
    render(
      <SubmitButton isSubmitting={false}>
        <div data-testid="children"></div>
      </SubmitButton>,
    );

    const button = screen.getByRole("button");

    expect(button).toBeInTheDocument();
  });

  it("renders children if isSubmitting is false", () => {
    render(
      <SubmitButton isSubmitting={false}>
        <div data-testid="children"></div>
      </SubmitButton>,
    );

    const children = screen.getByTestId("children");

    expect(children).toBeInTheDocument();
  });

  it("does not render spinner if isSubmitting is false", () => {
    render(
      <SubmitButton isSubmitting={false}>
        <div data-testid="children"></div>
      </SubmitButton>,
    );

    const spinner = screen.queryByTestId("spinner");

    expect(spinner).not.toBeInTheDocument();
  });

  it("renders spinner if isSubmitting is true", () => {
    render(
      <SubmitButton isSubmitting={true}>
        <div data-testid="children"></div>
      </SubmitButton>,
    );

    const spinner = screen.getByTestId("spinner");

    expect(spinner).toBeInTheDocument();
  });

  it("does not render children if isSubmitting is true", () => {
    render(
      <SubmitButton isSubmitting={true}>
        <div data-testid="children"></div>
      </SubmitButton>,
    );

    const children = screen.queryByTestId("children");

    expect(children).not.toBeInTheDocument();
  });

  it("is disabled if isSubmitting is true", () => {
    render(
      <SubmitButton isSubmitting={true}>
        <div data-testid="children"></div>
      </SubmitButton>,
    );

    const button = screen.getByRole("button");

    expect(button).toBeDisabled();
  });

  it("has type of 'submit'", () => {
    render(
      <SubmitButton isSubmitting={false}>
        <div data-testid="children"></div>
      </SubmitButton>,
    );

    const button = screen.getByRole("button");

    expect(button).toHaveAttribute("type", "submit");
  });
});
