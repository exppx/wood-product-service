import userEvent from "@testing-library/user-event";
import { render, screen } from "@/test-utils/test-utils";
import type { CarouselProps } from "./Carousel";
import Carousel from "./Carousel";

const mockImages: CarouselProps["images"] = [
  { imageUrl: "image_url_1", alt: "alt_1" },
  { imageUrl: "image_url_2", alt: "alt_2" },
  { imageUrl: "image_url_3", alt: "alt_3" },
];

describe("Carousel", () => {
  function customRender() {
    const utils = render(<Carousel images={mockImages} />);

    const user = userEvent.setup();

    const image = screen.getByRole("img");
    const buttons = screen.getAllByRole("button");
    const prevContainer = screen.getByTestId("prev-button-container");
    const nextContainer = screen.getByTestId("next-button-container");

    return {
      ...utils,
      user,
      image,
      prevButton: buttons[0],
      nextButton: buttons[1],
      prevContainer,
      nextContainer,
    };
  }

  it("renders without breaking", () => {
    const { image } = customRender();

    expect(image).toBeInTheDocument();
  });

  it("renders nothing if images array is empty", () => {
    const { container } = render(<Carousel images={[]} />);

    expect(container).toBeEmptyDOMElement();
  });

  it("renders first image by default", () => {
    const { image } = customRender();

    expect(image).toHaveAttribute("src", mockImages[0].imageUrl);
  });

  describe("Moving forward", () => {
    it("switches to the next image if the 'Next' button is clicked", async () => {
      const { user, nextButton, image } = customRender();

      await user.click(nextButton);

      expect(image).toHaveAttribute("src", mockImages[1].imageUrl);
    });

    it("switches to the next image if the 'Next' button container is clicked", async () => {
      const { user, nextContainer, image } = customRender();

      await user.click(nextContainer);

      expect(image).toHaveAttribute("src", mockImages[1].imageUrl);
    });

    it("disables the 'Next' button if the last element is reached", async () => {
      const { user, nextButton } = customRender();

      await user.click(nextButton);
      await user.click(nextButton);

      expect(nextButton).toBeDisabled();
    });

    it("does nothing after clicking the 'Next' button if the last element is reached", async () => {
      const { user, nextButton, image } = customRender();

      await user.click(nextButton);
      await user.click(nextButton);

      expect(image).toHaveAttribute("src", mockImages[2].imageUrl);

      await user.click(nextButton);

      expect(image).toHaveAttribute("src", mockImages[2].imageUrl);
    });

    it("does nothing after clicking the 'Next' button container if the last element is reached", async () => {
      const { user, nextContainer, image } = customRender();

      await user.click(nextContainer);
      await user.click(nextContainer);

      expect(image).toHaveAttribute("src", mockImages[2].imageUrl);

      await user.click(nextContainer);

      expect(image).toHaveAttribute("src", mockImages[2].imageUrl);
    });
  });

  describe("Moving back", () => {
    it("switches to the previous image if the 'Prev' button is clicked", async () => {
      const { user, nextButton, prevButton, image } = customRender();

      await user.click(nextButton);

      expect(image).toHaveAttribute("src", mockImages[1].imageUrl);

      await user.click(prevButton);

      expect(image).toHaveAttribute("src", mockImages[0].imageUrl);
    });

    it("switches to the previous image if the 'Prev' button container is clicked", async () => {
      const { user, nextButton, prevContainer, image } = customRender();

      await user.click(nextButton);

      expect(image).toHaveAttribute("src", mockImages[1].imageUrl);

      await user.click(prevContainer);

      expect(image).toHaveAttribute("src", mockImages[0].imageUrl);
    });

    it("disables the 'Prev' button if the first element is reached", async () => {
      const { user, nextButton, prevButton } = customRender();

      await user.click(nextButton);
      await user.click(prevButton);

      expect(prevButton).toBeDisabled();
    });

    it("does nothing after clicking the 'Prev' button if the first element is reached", async () => {
      const { user, nextButton, prevButton, image } = customRender();

      await user.click(nextButton);
      await user.click(prevButton);

      expect(image).toHaveAttribute("src", mockImages[0].imageUrl);

      await user.click(prevButton);

      expect(image).toHaveAttribute("src", mockImages[0].imageUrl);
    });

    it("does nothing after clicking the 'Prev' button container if the first element is reached", async () => {
      const { user, nextContainer, prevContainer, image } = customRender();

      await user.click(nextContainer);
      await user.click(prevContainer);

      expect(image).toHaveAttribute("src", mockImages[0].imageUrl);

      await user.click(prevContainer);

      expect(image).toHaveAttribute("src", mockImages[0].imageUrl);
    });
  });
});
