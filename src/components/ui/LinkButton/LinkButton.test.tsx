import { render, screen } from "@/test-utils/test-utils";
import LinkButton from "./LinkButton";

describe("LinkButton", () => {
  it("renders without breaking", () => {
    render(<LinkButton to={"/"} />);

    const link = screen.getByRole("link");

    expect(link).toBeInTheDocument();
  });

  it("navigates to hash if isHash is true", () => {
    render(
      <LinkButton
        to={{ pathname: "/test", search: "?search=test", hash: "#test" }}
        isHash
      />,
    );

    const link = screen.getByRole("link");

    expect(link).toHaveAttribute("href", "#test?search=test");
  });

  it("navigates to full path if isHash is false", () => {
    render(
      <LinkButton
        to={{ pathname: "/test", search: "?search=test", hash: "#test" }}
        isHash={false}
      />,
    );

    const link = screen.getByRole("link");

    expect(link).toHaveAttribute("href", "/test?search=test#test");
  });

  it("navigates to full path if isHash is not provided", () => {
    render(
      <LinkButton
        to={{ pathname: "/test", search: "?search=test", hash: "#test" }}
      />,
    );

    const link = screen.getByRole("link");

    expect(link).toHaveAttribute("href", "/test?search=test#test");
  });

  it("navigates to ... if isHash is true and no hash and search is provided", () => {
    render(<LinkButton to={{ pathname: "/test" }} isHash data-testid="link" />);

    const link = screen.getByTestId("link");

    expect(link).toHaveAttribute("href", "");
  });
});
