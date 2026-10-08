import { useTranslation } from "react-i18next";
import { usePageMetadata } from "@/shared/lib/hooks";
import { OurWorksSection } from "@/widgets/our-works-section";
import { MaterialsSection } from "@/widgets/materials-section";
import { QuestionsSection } from "@/widgets/questions-section";

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
