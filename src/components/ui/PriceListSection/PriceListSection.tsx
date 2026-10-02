import { useTranslation } from "react-i18next";
import Container from "@/components/ui/Container/Container";
import Section from "@/components/ui/Section/Section";
import PriceListFilters from "./PriceListFilters/PriceListFilters";
import PriceListTable from "./PriceListTable/PriceListTable";

import styles from "./PriceListSection.module.scss";

function PriceListSection() {
  const { t } = useTranslation();

  return (
    <Container width="xl">
      <Section title={t("PriceListSection.title")}>
        <div className={styles["price-list-content"]}>
          <PriceListFilters />
          <PriceListTable />
        </div>
      </Section>
    </Container>
  );
}

export default PriceListSection;
