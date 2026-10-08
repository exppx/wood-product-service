import { useTranslation } from "react-i18next";
import type { Locale } from "@/shared/types/locales";
import { Container, Section } from "@/shared/ui";
import { MaterialCard } from "@/entities/material";
import { MATERIALS } from "./model";

import s from "./MaterialsSection.module.scss";

function MaterialsSection() {
  const { t, i18n } = useTranslation();

  return (
    <Container width="xl">
      <Section title={t("MaterialsSection.title")}>
        <div className={s["materials__list-container"]}>
          <ul className={s["materials__list"]}>
            {MATERIALS[i18n.language as Locale].map((material) => (
              <li key={material.name} className={s["materials__item"]}>
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
