import { useTranslation } from "react-i18next";
import type { Locale } from "@/types/locales";
import { MATERIALS } from "./MaterialsSection.config";
import Container from "@/components/ui/Container/Container";
import Section from "@/components/ui/Section/Section";
import MaterialCard from "./MaterialCard/MaterialCard";

import styles from "./MaterialsSection.module.scss";

function MaterialsSection() {
  const { t, i18n } = useTranslation();

  return (
    <Container width="xl">
      <Section title={t("MaterialsSection.title")}>
        <div className={styles["materials__list-container"]}>
          <ul className={styles["materials__list"]}>
            {MATERIALS[i18n.language as Locale].map((material) => (
              <li key={material.name} className={styles["materials__item"]}>
                <MaterialCard {...material} />
              </li>
            ))}
          </ul>
        </div>
      </Section>
    </Container>
  );
}

export default MaterialsSection;
