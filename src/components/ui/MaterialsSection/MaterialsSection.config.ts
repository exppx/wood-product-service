import type { MaterialCardProps } from "./MaterialCard/MaterialCard";

import oakUrl from "@/assets/images/oak.webp";
import bukUrl from "@/assets/images/buk.webp";
import ashUrl from "@/assets/images/ash.webp";

const MATERIALS: {
  en: MaterialCardProps[];
  ru: MaterialCardProps[];
} = {
  en: [
    {
      imageUrl: oakUrl,
      name: "Oak",
      properties: [
        {
          name: "Durability",
          isPositive: true,
        },
        {
          name: "Beautiful texture",
          isPositive: true,
        },
        {
          name: "Water resistance",
          isPositive: true,
        },
        {
          name: "Expensive",
          isPositive: false,
        },
      ],
    },
    {
      imageUrl: bukUrl,
      name: "Buk",
      properties: [
        {
          name: "Durability",
          isPositive: true,
        },
        {
          name: "Hard to handle",
          isPositive: false,
        },
      ],
    },
    {
      imageUrl: ashUrl,
      name: "Ash",
      properties: [
        {
          name: "Durability",
          isPositive: true,
        },
        {
          name: "Hard to handle",
          isPositive: false,
        },
      ],
    },
  ],
  ru: [
    {
      imageUrl: oakUrl,
      name: "Дуб",
      properties: [
        {
          name: "Прочность",
          isPositive: true,
        },
        {
          name: "Красивая текстура",
          isPositive: true,
        },
        {
          name: "Устойчивость к влаге",
          isPositive: true,
        },
        {
          name: "Дорогой",
          isPositive: false,
        },
      ],
    },
    {
      imageUrl: bukUrl,
      name: "Бук",
      properties: [
        {
          name: "Прочность",
          isPositive: true,
        },
        {
          name: "Сложен в обработке",
          isPositive: false,
        },
      ],
    },
    {
      imageUrl: ashUrl,
      name: "Ясень",
      properties: [
        {
          name: "Прочность",
          isPositive: true,
        },
        {
          name: "Сложен в обработке",
          isPositive: false,
        },
      ],
    },
  ],
};

export { MATERIALS };
