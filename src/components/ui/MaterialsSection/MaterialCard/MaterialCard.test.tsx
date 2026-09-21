import { render, screen } from "@/test-utils/test-utils";
import MaterialCard, { type MaterialCardProps } from "./MaterialCard";

describe("MaterialCard", () => {
  const testCardData: MaterialCardProps = {
    imageUrl: "test_url",
    name: "test_name",
    properties: [
      {
        name: "test_property_name",
        isPositive: true,
      },
      {
        name: "test_property_name_negative",
        isPositive: false,
      },
    ],
  };

  it("renders without breaking", () => {
    render(<MaterialCard {...testCardData} />);
  });

  it("renders material image", () => {
    render(<MaterialCard {...testCardData} />);

    const image = screen.getByRole("img");

    expect(image).toBeInTheDocument();
  });

  it("renders material name", () => {
    render(<MaterialCard {...testCardData} />);

    const name = screen.getByText(testCardData.name);

    expect(name).toBeInTheDocument();
  });

  it("renders material properties", () => {
    render(<MaterialCard {...testCardData} />);

    const properties = screen.getAllByRole("listitem");

    expect(properties).toHaveLength(testCardData.properties.length);
  });

  it("gives each list item mark an accessible name", () => {
    render(<MaterialCard {...testCardData} />);

    const marks = screen.getAllByTestId("list-mark");

    marks.forEach((mark) => {
      expect(mark).toHaveAccessibleName();
    });
  });
});
