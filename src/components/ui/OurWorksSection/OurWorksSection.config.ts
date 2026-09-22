import type { CarouselProps } from "@/components/ui/Carousel/Carousel";
import kitchenImage from "@/assets/images/modern-wooden-kitchen.webp";
import stairsImage from "@/assets/images/wooden-stairs.webp";
import tableImage from "@/assets/images/wooden-table.webp";

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
