import { useTranslation } from "react-i18next";
import { CheckMarkSvg, CrossSvg } from "@/shared/ui/icons";

import s from "./MaterialCard.module.scss";

interface MaterialProperty {
  name: string;
  isPositive: boolean;
}

interface MaterialCardProps {
  imageUrl: string;
  name: string;
  properties: MaterialProperty[];
}

function MaterialCard({ imageUrl, name, properties }: MaterialCardProps) {
  const { t } = useTranslation();

  return (
    <div className={s["material"]}>
      <img src={imageUrl} alt={name} className={s["material__image"]} />

      <p className={s["material__name"]}>{name}</p>

      <ul className={s["material__properties"]}>
        {properties.map((property) => (
          <li key={property.name} className={s["material__property"]}>
            <div
              aria-label={
                property.isPositive
                  ? t("MaterialCard.property.positive")
                  : t("MaterialCard.property.negative")
              }
              className={s["material__property-icon"]}
              data-testid="list-mark"
            >
              {property.isPositive ? <CheckMarkSvg /> : <CrossSvg />}
            </div>

            <span className={s["material__property-name"]}>
              {property.name}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MaterialCard;
