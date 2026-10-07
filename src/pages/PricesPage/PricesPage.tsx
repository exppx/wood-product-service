import { useTranslation } from "react-i18next";
import usePageMetadata from "@/shared/lib/hooks/usePageMetadata/usePageMetadata";
import PriceListSection from "@/components/ui/PriceListSection/PriceListSection";
import QuestionsSection from "@/components/ui/QuestionsSection/QuestionsSection";

import styles from "./PricesPage.module.scss";

function PricesPage() {
  const { t } = useTranslation();
  usePageMetadata({
    title: t("PricesPage.metadata.title"),
    description: t("PricesPage.metadata.description"),
  });

  return (
    <main className={styles["prices-page"]}>
      <PriceListSection isMainSection={true} />
      <QuestionsSection />
    </main>
  );
}

export default PricesPage;
