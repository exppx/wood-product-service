import { useTranslation } from "react-i18next";
import Container from "@/shared/ui/Container/Container";
import Section from "@/shared/ui/Section/Section";
import PriceListFilters from "./PriceListFilters/PriceListFilters";
import PriceListTable from "./PriceListTable/PriceListTable";

import styles from "./PriceListSection.module.scss";

interface PriceListSectionProps {
  isMainSection?: boolean;
}

function PriceListSection({ isMainSection }: PriceListSectionProps) {
  const { t } = useTranslation();

  return (
    <Container width="xl">
      <Section
        title={t("PriceListSection.title")}
        isMainSection={isMainSection}
      >
        <div className={styles["price-list-content"]}>
          <PriceListFilters />
          <PriceListTable />
        </div>
      </Section>
    </Container>
  );
}

export default PriceListSection;
