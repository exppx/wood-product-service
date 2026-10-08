import { useTranslation } from "react-i18next";
import { usePageMetadata } from "@/shared/lib/hooks";
import { PriceListSection } from "@/widgets/price-list-section";
import { QuestionsSection } from "@/widgets/questions-section";

import s from "./PricesPage.module.scss";

function PricesPage() {
  const { t } = useTranslation();
  usePageMetadata({
    title: t("PricesPage.metadata.title"),
    description: t("PricesPage.metadata.description"),
  });

  return (
    <main className={s["prices-page"]}>
      <PriceListSection isMainSection={true} />
      <QuestionsSection />
    </main>
  );
}

export default PricesPage;
