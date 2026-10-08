import { useTranslation } from "react-i18next";
import type { Locale } from "@/shared/types/locales";
import { useSortParams } from "@/shared/lib/hooks";
import { Container, Section } from "@/shared/ui";
import { useMaterialPriceList } from "@/entities/material";
import {
  PriceListFilters,
  usePriceListFilters,
} from "@/features/price-list-filters";
import PriceListTable from "./PriceListTable/PriceListTable";

import styles from "./PriceListSection.module.scss";

interface PriceListSectionProps {
  isMainSection?: boolean;
}

function PriceListSection({ isMainSection }: PriceListSectionProps) {
  const { t, i18n } = useTranslation();

  const { priceListFilters } = usePriceListFilters();
  const { sortBy, sortDirection } = useSortParams();

  const { data, isLoading, isError } = useMaterialPriceList(priceListFilters, {
    sortBy,
    sort: sortDirection,
  });

  return (
    <Container width="xl">
      <Section
        title={t("PriceListSection.title")}
        isMainSection={isMainSection}
      >
        <div className={styles["price-list-content"]}>
          <PriceListFilters />
          <PriceListTable
            data={data[i18n.language as Locale]}
            isLoading={isLoading}
            error={isError ? t("PriceListSection.errors.table") : null}
          />
        </div>
      </Section>
    </Container>
  );
}

export default PriceListSection;
