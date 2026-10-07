import { useTranslation } from "react-i18next";
import usePageMetadata from "@/shared/lib/hooks/usePageMetadata/usePageMetadata";
import OurWorksSection from "@/components/ui/OurWorksSection/OurWorksSection";
import MaterialsSection from "@/components/ui/MaterialsSection/MaterialsSection";
import QuestionsSection from "@/components/ui/QuestionsSection/QuestionsSection";

import styles from "./GalleryPage.module.scss";

function GalleryPage() {
  const { t } = useTranslation();
  usePageMetadata({
    title: t("GalleryPage.metadata.title"),
    description: t("GalleryPage.metadata.description"),
  });

  return (
    <main className={styles["gallery-page"]}>
      <OurWorksSection isMainSection={true} />
      <MaterialsSection />
      <QuestionsSection />
    </main>
  );
}

export default GalleryPage;
