import { render } from "@testing-library/react";
import AppLayout from "./AppLayout";

describe("AppLayout", () => {
  it("renders without breaking", () => {
    render(<AppLayout />);
  });
});
