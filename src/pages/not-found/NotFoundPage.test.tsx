import { render, screen } from "@/test-utils/test-utils";
import NotFoundPage from "./NotFoundPage";

describe("NotFoundPage", () => {
  it("renders without breaking", () => {
    render(<NotFoundPage />);
  });

  it("renders h1 title", () => {
    render(<NotFoundPage />);

    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
  });

  it("renders link to the home page", () => {
    render(<NotFoundPage />);

    expect(screen.getByRole("link")).toHaveAttribute("href", "/");
  });
});
