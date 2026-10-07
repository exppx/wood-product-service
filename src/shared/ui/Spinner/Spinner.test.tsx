import { render, screen } from "@/test-utils/test-utils";
import Spinner from "./Spinner";

describe("Spinner", () => {
  it("renders without breaking", () => {
    render(<Spinner />);

    const spinner = screen.getByTestId("spinner");

    expect(spinner).toBeInTheDocument();
  });
});
