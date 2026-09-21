import { useTranslation } from "react-i18next";
import CheckMarkSvg from "@/components/svg/CheckMarkSvg";
import CrossSvg from "@/components/svg/CrossSvg";

import styles from "./MaterialCard.module.scss";

interface MaterialProperty {
  name: string;
  isPositive: boolean;
}

export interface MaterialCardProps {
  imageUrl: string;
  name: string;
  properties: MaterialProperty[];
}

function MaterialCard({ imageUrl, name, properties }: MaterialCardProps) {
  const { t } = useTranslation();

  return (
    <div className={styles["material"]}>
      <img src={imageUrl} alt={name} className={styles["material__image"]} />

      <p className={styles["material__name"]}>{name}</p>

      <ul className={styles["material__properties"]}>
        {properties.map((property) => (
          <li key={property.name} className={styles["material__property"]}>
            <div
              aria-label={
                property.isPositive
                  ? t("MaterialCard.property.positive")
                  : t("MaterialCard.property.negative")
              }
              className={styles["material__property-icon"]}
              data-testid="list-mark"
            >
              {property.isPositive ? <CheckMarkSvg /> : <CrossSvg />}
            </div>

            <span className={styles["material__property-name"]}>
              {property.name}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MaterialCard;
