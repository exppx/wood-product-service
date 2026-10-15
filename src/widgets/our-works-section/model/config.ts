import type { ComponentProps } from "react";
import type { Carousel } from "@/shared/ui";

import kitchenImage from "@/shared/assets/images/modern-wooden-kitchen.webp";
import stairsImage from "@/shared/assets/images/wooden-stairs.webp";
import tableImage from "@/shared/assets/images/wooden-table.webp";

type CarouselProps = ComponentProps<typeof Carousel>;

const CAROUSEL_IMAGES: {
  en: CarouselProps["images"];
  ru: CarouselProps["images"];
} = {
  en: [
    {
      imageUrl: kitchenImage,
      alt: "Modern wooden kitchen",
    },
    {
      imageUrl: stairsImage,
      alt: "White wooden stairs to the second floor",
    },
    {
      imageUrl: tableImage,
      alt: "Square wooden table with benches attached to it",
    },
  ],
  ru: [
    {
      imageUrl: kitchenImage,
      alt: "Современная деревянная кухня",
    },
    {
      imageUrl: stairsImage,
      alt: "Белая деревянная лестница на второй этаж",
    },
    {
      imageUrl: tableImage,
      alt: "Квадратный деревянный стол с прикрепленными лавочками",
    },
  ],
};

export { CAROUSEL_IMAGES };
